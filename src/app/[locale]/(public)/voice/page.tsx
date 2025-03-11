'use client'
import { Button } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'

import { useRouter } from '@/i18n/routing'
import useVoice from '@/hooks/useVoice'
import { RootState } from '@/store/redux/store'
import { filterVoice } from '@/lib/constant'
import { parseSortBy } from '@/lib/utils'

import BreadCrumb from '@/components/Breadcrumb'
import FilterIcon from '@/resources/svg/FilterIcon'
import FilterBox from '@/components/FilterBox'
import Sort from '@/components/Sort'
import PaginationVoice from '@/components/PaginationVoice'
import SkeletonItem from '@/components/Product/SkeletonItem'
import Product from '@/components/Product'
import ArrowLeft from '@/resources/svg/ArrowLeft'

export default function Voice() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useSelector((state: RootState) => state.auth)
  const baseURL = 'voice'
  const params: filterVoice = useMemo(() => {
    return Object.fromEntries(searchParams.entries())
  }, [searchParams])
  const [sort, setSort] = useState('1')
  const [showFilter, setShowFilter] = useState(false)

  const { data, isLoading } = useVoice(user.id, { ...params, limit: 15 })
  const onChangePage = (page: number) => {
    router.push({
      pathname: baseURL,
      query: { ...params, page },
    })
  }
  const handleSortChange = (sortValue: string) => {
    setSort(sortValue)
  }
  const sortQuery = parseSortBy(sort)
  useEffect(() => {
    router.push({
      pathname: baseURL,
      query: { ...params, page: 1, ...sortQuery },
    })
  }, [sortQuery])

  const handleFilter = () => {
    setShowFilter(!showFilter)
  }
  return (
    <div>
      <BreadCrumb
        items={[
          {
            path: '/',
            name: 'Home',
          },
          {
            path: '/voice',
            name: 'Voice List',
          },
        ]}
      />
      <div className="flex justify-between px-10 border-b-[1px] border-[#dcdcdc] h-11">
        <div className="flex items-center justify-between gap-9">
          <div
            onClick={handleFilter}
            className="flex items-center gap-[87px] cursor-pointer"
          >
            <Button type="text" icon={<FilterIcon />} className="filter-button">
              Filter
            </Button>
            {showFilter && (
              <Button type="text" icon={<ArrowLeft />} className="filter-button" />
            )}
          </div>
          <Sort onSortChange={handleSortChange} />
        </div>
        <div className="pagination-custom">
          {!isLoading ? (
            <PaginationVoice data={data?.meta} onChangePage={onChangePage} />
          ) : null}
        </div>
      </div>
      <div className="px-10">
        {showFilter ? (
          <div className="flex justify-between gap-5">
            {showFilter && <FilterBox />}
            <div className="flex-grow">
              {!isLoading ? <Product data={data} /> : <SkeletonItem />}
            </div>
          </div>
        ) : (
          <>{!isLoading ? <Product data={data} /> : <SkeletonItem />}</>
        )}
      </div>
    </div>
  )
}
