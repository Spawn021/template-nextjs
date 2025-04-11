import React from 'react'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Image from 'next/image'

import RightArrow from '@/resources/svg/icon-next.svg'
import LeftArrow from '@/resources/svg/icon-prev.svg'
import useContentRelevant from '@/hooks/useContentRelevant'
import { convertArrayToString, parseItem } from '@/lib/utils'
import { RootState } from '@/store/redux/store'
import Item from '@/components/Product/Item'

export default function ContentRecommend({
  id = ' ',
  series = '',
}: {
  id: string
  series: string
}) {
  const { id: userId } = useSelector((state: RootState) => state.auth.user)
  const { series: seriesLocal, withoutContentIds } = useSelector(
    (state: RootState) => state.content.contentRelevant,
  )
  const { useFetchContentRelevant } = useContentRelevant(
    String(convertArrayToString([...seriesLocal])),
    String(convertArrayToString([...withoutContentIds])),
    id,
    series,
    String(userId),
  )
  const { data } = useFetchContentRelevant
  const CustomArrow = ({ className, style, onClick, icon }: any) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={onClick}
      >
        <Image src={icon} alt="arrow" width={20} height={20} className="text-red-600" />
      </div>
    )
  }
  const settings = {
    dots: false,
    draggable: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    swipeToSlide: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <CustomArrow icon={RightArrow} />,
    prevArrow: <CustomArrow icon={LeftArrow} />,
    className: 'equal-height-slides',
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

  return (
    <div className="mt-6 recommend-slide">
      <div className="mb-8 text-xl font-semibold">You may also like</div>
      {data && data.length > 5 ? (
        <Slider {...settings}>
          {data.map((item: any, i: number) => (
            <div key={i} className="item-wrapper">
              <Item data={parseItem(item)} />
            </div>
          ))}
        </Slider>
      ) : (
        data?.map((item: any, i: number) => (
          <div key={i} className="item-wrapper">
            <Item data={parseItem(item)} key={i} />
          </div>
        ))
      )}
    </div>
  )
}
