import { useMemo, useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")

  const safeCourses = Array.isArray(courses) ? courses : []

  const studentColors = useMemo(() => {
    const palette = ["#FFD60A", "#06D6A0", "#118AB2", "#EF476F", "#9B5DE5"]
    return safeCourses.map(
      (_, i) =>
        palette[i % palette.length] ||
        `hsl(${(i * 67) % 360}, 75%, 55%)`
    )
  }, [safeCourses.length])

  const incomeColors = useMemo(() => {
    const palette = ["#06D6A0", "#3B82F6", "#F97316", "#EC4899", "#EAB308"]
    return safeCourses.map(
      (_, i) =>
        palette[i % palette.length] ||
        `hsl(${(i * 83 + 120) % 360}, 75%, 55%)`
    )
  }, [safeCourses.length])

  const chartDataStudents = {
    labels: safeCourses.map((course) => course?.courseName || "Unnamed Course"),
    datasets: [
      {
        label: "Students Enrolled",
        data: safeCourses.map(
          (course) => course?.studentsEnrolled?.length || 0
        ),
        backgroundColor: studentColors,
        borderColor: "#161D29",
        borderWidth: 2,
      },
    ],
  }

  const chartIncomeData = {
    labels: safeCourses.map((course) => course?.courseName || "Unnamed Course"),
    datasets: [
      {
        label: "Income (Rs.)",
        data: safeCourses.map(
          (course) =>
            (course?.studentsEnrolled?.length || 0) *
            (Number(course?.price) || 0)
        ),
        backgroundColor: incomeColors,
        borderColor: "#161D29",
        borderWidth: 2,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#F1F2FF",
        },
      },
    },
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto my-auto h-[270px] w-full max-w-[340px]">
        <Pie
          key={currChart}
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}