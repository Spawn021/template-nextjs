import React from 'react'
import { Pagination } from 'antd'
import type { PaginationProps } from 'antd'
import ArrowLeft from '@/resources/svg/ArrowLeft'
import ArrowRight from '@/resources/svg/ArrowRight'
import { on } from 'events'
interface Props {
  currentPage?: number
  totalContents?: number
  totalItems?: number
  totalPages?: number
  itemsPerPage?: number
  itemCount?: number
}

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return (
      <a className="mt-[2px] flex items-center gap-2 text-[#6b7280] py-2 px-4 text-sm font-normal cursor-pointer rounded-[6px] border-[1px] border-[#d9d9d9] border-solid min-h-[40px] h-10 ">
        <ArrowLeft />
        <div>Previous</div>
      </a>
    )
  }
  if (type === 'next') {
    return (
      <a className="mt-[2px] flex items-center gap-2 text-[#6b7280] py-2 px-4 text-sm font-normal cursor-pointer rounded-[6px] border-[1px] border-[#d9d9d9] border-solid min-h-[40px] h-10 ">
        <ArrowRight />
        <div>Next</div>
      </a>
    )
  }
  return originalElement
}
export default function PaginationVoice({
  data,
  onChangePage,
}: {
  data: Props
  onChangePage?: (page: number) => void
}) {
  return (
    <Pagination
      current={data?.currentPage}
      pageSize={data?.itemsPerPage}
      total={data?.totalItems}
      onChange={onChangePage}
      showLessItems
      showSizeChanger={false}
      itemRender={itemRender}
    />
  )
}
