import React, { use, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import clsx from 'clsx'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { current } from '@reduxjs/toolkit'
function ContentImage({ images }: any) {
  const [imageCurrent, setImageCurrent] = useState() as any

  useEffect(() => {
    if (images) setImageCurrent(images[0])
  }, [images])
  console.log(imageCurrent)
  return (
    <div className="bg-[#f3f4f6] rounded-[10px] w-full">
      <div className="max-w-[400px] pt-4 mb-4 mx-auto">
        <img
          src={imageCurrent?.url}
          alt="preview"
          className="rounded-[5px] aspect-square object-cover w-full h-full"
        />
      </div>
      <div className="mx-auto p-2 w-[68%]">
        <Swiper
          className="swiper-content-image"
          breakpoints={{
            375: {
              slidesPerView: 3.3,
            },
            428: {
              slidesPerView: 3.9,
            },
            768: {
              slidesPerView: 6,
            },
            1024: {
              slidesPerView: 6,
            },
            1440: {
              slidesPerView: 6,
            },
          }}
          slidesPerView={'auto'}
          modules={[Pagination, Navigation]}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
        >
          {images?.map((image: any, index: number) => (
            <SwiperSlide key={index}>
              <div
                className="cursor-pointer w-[90px] h-[90px] rounded-[10px] relative overflow-hidden "
                onClick={() => setImageCurrent(image)}
              >
                <img
                  src={image?.url}
                  alt="image"
                  className="w-full h-full object-cover"
                />
                <div
                  className={clsx(
                    'absolute inset-0 w-[90px] h-[90px] bg-[#615f55] rounded-[10px] transition-all hover:bg-opacity-0',
                    imageCurrent === image ? 'bg-opacity-0' : 'bg-opacity-50',
                  )}
                ></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ContentImage
