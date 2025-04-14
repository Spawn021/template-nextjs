import EmptyWrapper from '@/components/Empty/EmptyWrapper'
import FilterAdvance from '@/components/FilterAdvance'
import Item from '@/components/Profile/TransactionHistory/Item'
import { initFilterTransaction, PAGE_SIZE_OPTIONS } from '@/constants'
import useFilter from '@/hooks/useFilter'
import useTransactionHistory from '@/hooks/useTransactionHistory'
import ArrowLeft from '@/resources/svg/ArrowLeft'
import ArrowRight from '@/resources/svg/ArrowRight'
import FilterTransIcon from '@/resources/svg/FilterTransIcon'
import ReloadIcon from '@/resources/svg/ReloadIcon'
import SearchIcon from '@/resources/svg/SearchIcon'
import { Col, Input, Pagination, Row, Spin } from 'antd'
import type { PaginationProps } from 'antd'
import React from 'react'

function TransactionHistory() {
  const {
    filter,
    localKeyword,
    toggle,
    show,
    onShow,
    setFilter,
    onClear,
    onSearch,
    onSelect,
    onShowSizeChange,
    onChangeDate,
    onKeyDown,
    onToggle,
    onChangePage,
    onBlur,
  } = useFilter(initFilterTransaction) || {}
  const { createdAtTo, createdAtFrom, limit, page, keyword, paymentMethod, status } =
    filter || {}
  const newFilter = {
    keyword: keyword?.trim(),
    createdAtFrom: createdAtFrom,
    createdAtTo: createdAtTo,
    paymentMethod: paymentMethod,
    status: status,
    limit,
    page,
  }
  const { transactions, loading } = useTransactionHistory(newFilter)

  const { totalItems, itemsPerPage, currentPage, totalPages } = transactions?.meta || {}
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
  return (
    <div className="transaction-history">
      <h2 className="font-semibold text-xl mb-2">Transaction history</h2>
      <Row
        gutter={[16, 16]}
        align={'middle'}
        className="flex items-center justify-between"
      >
        <Col xl={12} lg={18} md={18} xs={18} className="search-box-wrapper">
          <Input
            maxLength={256}
            className="search-box placeholder:text-[#9ca3af]"
            placeholder="Search by Voice title, Voice actor"
            prefix={<SearchIcon />}
            onChange={(e) => onSearch(e.target.value)}
            onKeyDown={onKeyDown}
            value={localKeyword}
          />
        </Col>
        <div className="flex items-center gap-4 ">
          <Col className="border p-2 rounded-md">
            <span className="cursor-pointer" onClick={onClear}>
              <ReloadIcon />
            </span>
          </Col>

          <Col className={`border p-2 rounded-md ${toggle ? 'bg-[#00aaf2]' : ''}`}>
            <span
              className={`cursor-pointer ${toggle ? 'toggle-active' : ''}`}
              onClick={onToggle}
            >
              <FilterTransIcon />
            </span>
          </Col>
        </div>
      </Row>
      {toggle && (
        <div className="mt-4">
          <FilterAdvance
            filter={filter}
            isSelectionFile={false}
            onChangeDate={onChangeDate}
            onSelect={onSelect}
          />
        </div>
      )}
      <div className="mt-4 mb-3">{`Total transactions: ${totalItems || 0}`}</div>
      <Spin spinning={loading} className="w-full h-full">
        {transactions?.items?.length > 0 ? (
          transactions?.items?.map((item: any, index: any) => {
            return (
              <div className="flex flex-col mb-3" key={index}>
                <Item data={item} show={show} onShow={onShow} />
              </div>
            )
          })
        ) : (
          <EmptyWrapper message="There are no transactions" hasButton={false} />
        )}
      </Spin>
      {!loading && totalPages > 1 && (
        <div className="pagination-custom pagination-library flex justify-end mt-2 pt-[19px] pb-[23px]">
          <Pagination
            locale={{ items_per_page: `/ page` }}
            current={currentPage || 1}
            onChange={onChangePage}
            onShowSizeChange={onShowSizeChange}
            total={totalItems || 0}
            pageSize={itemsPerPage || 10}
            showSizeChanger={true}
            itemRender={itemRender}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
          />
        </div>
      )}
    </div>
  )
}

export default TransactionHistory
