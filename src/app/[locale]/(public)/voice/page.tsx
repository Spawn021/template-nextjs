'use client'
import { Button } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'

import { useRouter } from '@/i18n/routing'
import useVoice from '@/hooks/useVoice'
import { RootState } from '@/store/redux/store'
import { filterVoice } from '@/lib/constant'
import { convertArrayToString, convertStringToArray, parseSortBy } from '@/lib/utils'

import BreadCrumb from '@/components/Breadcrumb'
import FilterIcon from '@/resources/svg/FilterIcon'
import FilterBox from '@/components/FilterBox'
import Sort from '@/components/Sort'
import PaginationVoice from '@/components/PaginationVoice'
import SkeletonItem from '@/components/Product/SkeletonItem'
import Product from '@/components/Product'
import ArrowLeft from '@/resources/svg/ArrowLeft'
import { FilterPriceForm } from '@/components/FilterBox/FilterPrice'
import EmptyVoice from '@/components/Empty/EmptyVoice'
import { APP_URL } from '@/constants'
import { set } from 'react-hook-form'

export default function Voice() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const { user } = useSelector((state: RootState) => state.auth)
  const baseURL = 'voice'
  const params: filterVoice = useMemo(() => {
    return Object.fromEntries(searchParams.entries())
  }, [searchParams])

  const [showFilter, setShowFilter] = useState(false)

  const { data, isLoading } = useVoice(user.id, { ...params, limit: 15 })

  useEffect(() => {
    const values = ['files', 'categoryIds', 'series', 'fromPrice', 'toPrice']
    const fromVoice = values.some((value) => {
      if (searchParams.toString()) {
        return searchParams.toString().includes(value)
      }
    })
    if (fromVoice) {
      setShowFilter(true)
    }
  }, [searchParams.toString()])

  const onChangePage = (page: number) => {
    router.push({
      pathname: baseURL,
      query: { ...params, page },
    })
  }
  const handleSortChange = (sortValue: string) => {
    const sortQuery = parseSortBy(sortValue)
    router.push({
      pathname: baseURL,
      query: { ...params, page: 1, ...sortQuery },
    })
  }

  const handleFilter = () => {
    setShowFilter(!showFilter)
  }
  const handleFilterChange = (field: keyof filterVoice, value: number[]) => {
    const filter = { ...params, page: 1, [field]: convertArrayToString(value) }
    if (!filter[field]) {
      delete filter[field]
    }
    router.push({
      pathname: baseURL,
      query: { ...filter },
    })
  }
  const handleApplyPrice = (data: FilterPriceForm) => {
    const filterPrice = { ...params, page: 1, ...data }
    if (!filterPrice.fromPrice) {
      delete filterPrice.fromPrice
    }
    if (!filterPrice.toPrice) {
      delete filterPrice.toPrice
    }
    router.push({
      pathname: baseURL,
      query: { ...filterPrice },
    })
  }
  const onClear = () => {
    const filter = { sortField: params.sortField, sortType: params.sortType, page: 1 }
    router.push({
      pathname: APP_URL.VOICE,
      query: { ...filter },
    })
  }
  const onClose = (field: string, id: string | number) => {
    const filter = { ...params, page: 1 }
    if (field === 'categoryIds') {
      if (filter.categoryIds && filter.categoryIds?.length > 0) {
        filter.categoryIds = convertArrayToString(
          convertStringToArray(filter.categoryIds).filter((item: any) => item !== id),
        )
      }
    }
    if (field === 'tagIds') {
      if (filter.tagIds && filter.tagIds?.length > 0) {
        filter.tagIds = convertArrayToString(
          convertStringToArray(filter.tagIds).filter((item: any) => item !== id),
        )
      }
    }
    if (field === 'files') {
      if (filter.files && filter.files?.length > 0) {
        filter.files = convertArrayToString(
          convertStringToArray(filter.files).filter((item: any) => item !== id),
        )
      }
    }
    if (field === 'priceFromTo') {
      delete filter.fromPrice
      delete filter.toPrice
    } else if (field === 'fromPrice') {
      delete filter.fromPrice
    } else if (field === 'toPrice') {
      delete filter.toPrice
    }
    const cleanQuery = Object.fromEntries(
      Object.entries(filter).filter(
        ([_, v]) => v !== undefined && v !== null && v !== '',
      ),
    )
    router.push({
      pathname: baseURL,
      query: cleanQuery,
    })
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
            className="flex items-center gap-[122px] cursor-pointer"
          >
            <Button type="text" icon={<FilterIcon />} className="filter-button">
              Filter
            </Button>
            {showFilter && (
              <Button type="text" icon={<ArrowLeft />} className="filter-button" />
            )}
          </div>
          <Sort onSortChange={handleSortChange} total={data?.meta?.totalItems} />
        </div>
        <div className="pagination-custom">
          {!isLoading
            ? data?.meta?.totalItems > 15 && (
                <PaginationVoice data={data?.meta} onChangePage={onChangePage} />
              )
            : null}
        </div>
      </div>
      <div className="px-10">
        {showFilter ? (
          <div className="flex justify-between gap-5">
            {showFilter && (
              <FilterBox
                onFilterChange={handleFilterChange}
                onApplyPrice={handleApplyPrice}
                params={params}
                clearAll={onClear}
                onClose={onClose}
              />
            )}
            <div className="flex-grow mt-9">
              {!isLoading ? (
                data.items.length > 0 ? (
                  <Product data={data} fromVoice={true} />
                ) : (
                  <EmptyVoice message="Your search did not match any products.<br/>Please try again." />
                )
              ) : (
                <SkeletonItem />
              )}
            </div>
          </div>
        ) : (
          <div className="mt-9 ">
            {!isLoading ? (
              data.items.length > 0 ? (
                <Product data={data} fromVoice={true} />
              ) : (
                <EmptyVoice message="Your search did not match any products.<br/>Please try again." />
              )
            ) : (
              <SkeletonItem />
            )}
          </div>
        )}
      </div>
      <div className="flex justify-end mt-10 px-10 py-[14px] pagination-custom">
        {!isLoading
          ? data?.meta?.totalItems > 15 && (
              <PaginationVoice data={data?.meta} onChangePage={onChangePage} />
            )
          : null}
      </div>
    </div>
  )
}
