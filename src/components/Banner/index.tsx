/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@tanstack/react-query'
import { getBanner } from '@/lib/api/home'
import { IHomeBanner } from '@/types/Home'
import { Swiper, SwiperSlide } from 'swiper/react'
import IconNext from '@/resources/svg/icon-next.svg'
import IconPrev from '@/resources/svg/icon-prev.svg'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import Image from 'next/image'

export default function Banner() {
  const { data } = useQuery<IHomeBanner[]>({
    queryKey: ['banner'],
    queryFn: getBanner,
  })
  return (
    <div className="bg-[#dfe5ff] px-10 py-3 relative">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        pagination={true}
        autoplay={{ delay: 1000 }}
        loop={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {data?.map((banner, index) => (
          <SwiperSlide key={index}>
            <img src={banner?.bannerRectangle} alt="image" className="w-full h-full" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-prev absolute top-1/2 left-5 transform -translate-y-1/2 z-10 cursor-pointer">
        <Image src={IconPrev} alt="icon" />
      </div>
      <div className="custom-next absolute top-1/2 right-5 transform -translate-y-1/2 z-10 cursor-pointer">
        <Image src={IconNext} alt="icon" />
      </div>
    </div>
  )
}
