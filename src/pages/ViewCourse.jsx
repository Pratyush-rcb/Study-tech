import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      setLoading(true)
      dispatch(setCourseSectionData([]))
      dispatch(setEntireCourseData({}))
      dispatch(setCompletedLectures([]))

      const courseData = await getFullDetailsOfCourse(courseId, token)
      if (!isMounted) return

      if (courseData?.courseDetails) {
        const content = courseData.courseDetails.courseContent || []
        dispatch(setCourseSectionData(content))
        dispatch(setEntireCourseData(courseData.courseDetails))
        dispatch(setCompletedLectures(courseData.completedVideos || []))

        let lectures = 0
        content.forEach((sec) => {
          lectures += sec?.subSection?.length || 0
        })
        dispatch(setTotalNoOfLectures(lectures))
      }
      setLoading(false)
    })()

    return () => {
      isMounted = false
    }
  }, [courseId, token, dispatch])

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-3 text-richblack-50">
        <div className="spinner"></div>
        <p className="text-base font-medium">Loading...</p>
      </div>
    )
  }

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}