import React from "react"
import { FreeMode, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/pagination"

import Course_Card from "./Course_Card"

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={25}
            loop={true}
            navigation={true}
            modules={[FreeMode, Navigation, Pagination]}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
            }}
            className="course-slider max-h-[30rem]"
          >
            {Courses?.map((course, i) => (
              <SwiperSlide key={i}>
                <Course_Card course={course} Height={"h-[250px]"} />
              </SwiperSlide>
            ))}
          </Swiper>
          <style>{`
            .course-slider .swiper-button-prev,
            .course-slider .swiper-button-next {
              width: 36px;
              height: 36px;
              border-radius: 9999px;
              background-color: rgba(22, 29, 41, 0.88);
              border: 1px solid rgba(255, 255, 255, 0.14);
              color: #f1f5f9;
              transition: background-color 150ms ease, transform 150ms ease;
            }
            .course-slider .swiper-button-prev:hover,
            .course-slider .swiper-button-next:hover {
              background-color: #2c333f;
              transform: scale(1.05);
            }
            .course-slider .swiper-button-prev::after,
            .course-slider .swiper-button-next::after {
              font-size: 14px;
              font-weight: 700;
            }
            .course-slider .swiper-button-prev {
              left: 8px;
            }
            .course-slider .swiper-button-next {
              right: 8px;
            }
          `}</style>
        </div>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider