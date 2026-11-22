const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")

const DEMO_USER_EMAILS = new Set([
  "pk201929@gmail.com",
  "demo.student@studytech.app",
  "demo.instructor@studytech.app",
])

const isDemoAccount = (user) =>
  Boolean(
    user?.isDemo === true ||
      (user?.email && DEMO_USER_EMAILS.has(user.email.trim().toLowerCase()))
  )

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body
  const userId = req.user.id
  if (!courses || courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0

  for (const course_id of courses) {
    try {
      const course = await Course.findById(course_id)

      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      const alreadyEnrolled = (course.studentsEnrolled || []).some(
        (id) => id.toString() === String(userId)
      )
      if (alreadyEnrolled) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      total_amount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: `${Date.now()}_${Math.floor(Math.random() * 10000)}`,
  }

  try {
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    return res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// Verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature !== razorpay_signature) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  const enrollResult = await enrollStudents(courses, userId)
  if (!enrollResult.success) {
    return res.status(enrollResult.statusCode || 400).json({
      success: false,
      message: enrollResult.message,
    })
  }

  return res.status(200).json({ success: true, message: "Payment Verified" })
}

// Send Payment Success Email (fast skip for demo accounts; safe fallback on SMTP timeout)
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body
  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)
    if (!enrolledStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" })
    }

    if (!isDemoAccount(enrolledStudent)) {
      try {
        await mailSender(
          enrolledStudent.email,
          `Payment Received`,
          paymentSuccessEmail(
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
            amount / 100,
            orderId,
            paymentId
          )
        )
      } catch (mailError) {
        console.log("Payment success email skipped/failed:", mailError?.message || mailError)
      }
    }

    return res.status(200).json({
      success: true,
      message: "Payment receipt processed",
    })
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(500)
      .json({ success: false, message: "Could not process payment email" })
  }
}

// Enroll the student in the courses (fast-path email skip for demo accounts)
const enrollStudents = async (courses, userId) => {
  if (!courses || !userId) {
    return {
      success: false,
      statusCode: 400,
      message: "Please provide Course ID and User ID",
    }
  }

  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $addToSet: { studentsEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return {
          success: false,
          statusCode: 404,
          message: "Course not found",
        }
      }

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      })

      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      if (!enrolledStudent) {
        return {
          success: false,
          statusCode: 404,
          message: "Student not found",
        }
      }

      if (!isDemoAccount(enrolledStudent)) {
        try {
          const emailResponse = await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(
              enrolledCourse.courseName,
              `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
            )
          )
          console.log("Email response: ", emailResponse?.response || "Sent/Skipped")
        } catch (mailError) {
          console.log("Enrollment email skipped/failed:", mailError?.message || mailError)
        }
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        statusCode: 400,
        message: error.message,
      }
    }
  }

  return { success: true }
}