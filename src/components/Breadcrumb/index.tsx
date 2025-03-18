'use client'
import React from 'react'
import { Breadcrumb, Typography } from 'antd'
import HomeLine from '@/resources/svg/HomeLine'
import { useRouter } from '@/i18n/routing'
import NextIcon from '@/resources/svg/next-icon.svg'
import Image from 'next/image'
import { APP_URL, ORDERS } from '@/constants'

type BreadcrumbType = {
  items: {
    path: string
    name: string
  }[]
}

export default function BreadCrumb({ items }: BreadcrumbType) {
  const router = useRouter()
  const { Text } = Typography
  const preFilter = sessionStorage.getItem('preFilter')
  const values = ['files', 'categoryIds', 'series', 'fromPrice', 'toPrice']
  const fromVoice = values.some((value) => {
    if (preFilter) {
      return preFilter.includes(value)
    }
  })
  const handleRedirect = () => {
    const queryParams = { sortField: 'createdAt', sortType: ORDERS.DESC }
    router.push({
      pathname: APP_URL.VOICE,
      query: queryParams,
    })
  }
  const breadcrumbItems = items.map((item, index) => {
    if (index === 0) {
      return {
        title: (
          <a onClick={() => router.push('/')}>
            <HomeLine />
          </a>
        ),
      }
    } else if (index !== items.length - 1) {
      return {
        title: (
          <a onClick={!fromVoice ? () => handleRedirect() : () => router.back()}>
            {item.name}
          </a>
        ),
      }
    } else {
      return {
        title: (
          <Text className="name" ellipsis={{ tooltip: item.name }}>
            {item.name}
          </Text>
        ),
      }
    }
  })
  return (
    <Breadcrumb
      className="py-[14px] px-10 mx-auto border-y-[1px] border-solid border-[#dcdcdc] flex items-center breadcrumb-custom"
      separator={<Image src={NextIcon} alt="next-icon" className="w-[15px] h-[10px]" />}
      items={breadcrumbItems}
    />
  )
}
