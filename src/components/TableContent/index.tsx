import { Pagination, Table } from 'antd'
import type { PaginationProps } from 'antd'
import ArrowLeft from '@/resources/svg/ArrowLeft'
import ArrowRight from '@/resources/svg/ArrowRight'
import { PAGE_SIZE_OPTIONS } from '@/constants'
type Props = {
  data: { [key: string]: string | number }[]
  columns: { title: string; dataIndex: string; key: string }[]
  currentPage?: number
  totalItems?: number
  totalPages?: number
  itemsPerPage?: number
  showSizeChanger?: boolean
  pageSizeOptions?: number[]
  loading?: boolean
  onChangePage?: (pageNum: number, pageSize: number) => void
  onShowSizeChange?: (current: number, pageSize: number) => void
}
const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return (
      <a className="mt-[2px] flex items-center gap-2 text-[#6b7280] py-2 px-4 text-sm font-normal cursor-pointer border-[1px] border-[#d9d9d9] border-solid min-h-[40px] h-10 ">
        <ArrowLeft />
        <div>Previous</div>
      </a>
    )
  }
  if (type === 'next') {
    return (
      <a className="mt-[2px] flex items-center gap-2 text-[#6b7280] py-2 px-4 text-sm font-normal cursor-pointer border-[1px] border-[#d9d9d9] border-solid min-h-[40px] h-10 ">
        <ArrowRight />
        <div>Next</div>
      </a>
    )
  }
  return originalElement
}
function TableContent({
  data,
  columns,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  showSizeChanger = false,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  onChangePage,
  onShowSizeChange,
  loading,
}: Props) {
  return (
    <>
      <Table
        dataSource={data?.map((item, index) => ({ ...item, key: index }))}
        columns={columns}
        pagination={false}
        className="table-purchased w-full"
      />
      {!loading && totalPages && totalPages > 2 && (
        <div className="pagination-custom pagination-library flex justify-end mt-2 pt-[19px] pb-[23px]">
          <Pagination
            locale={{ items_per_page: `/ page` }}
            current={currentPage || 1}
            onChange={onChangePage}
            onShowSizeChange={onShowSizeChange}
            total={totalItems || 0}
            pageSize={itemsPerPage || 10}
            showSizeChanger={showSizeChanger}
            itemRender={itemRender}
            pageSizeOptions={pageSizeOptions}
          />
        </div>
      )}
    </>
  )
}

export default TableContent
