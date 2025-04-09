'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/routing'
import { Col, Row, Input, Spin } from 'antd'

import MyLibraryDetail from '@/app/[locale]/(account)/profile/my-library/_detail/page'
import getLibraryColumn from '@/components/TableContent/column'
import FilterAdvance from '@/components/FilterAdvance'
import TableContent from '@/components/TableContent'
import ModalDownload from '@/components/ModalDownload'

import useMyLibrabry from '@/hooks/useMyLibrary'
import useFilter from '@/hooks/useFilter'

import { APP_URL, initFilterMyLibrary } from '@/constants'
import SearchIcon from '@/resources/svg/SearchIcon'
import { usePlayingTrackStore } from '@/store/zustand/usePlayingTrackStore'

function MyLibrary() {
  const {
    localKeyword,
    filter,
    setFilter,
    onClear,
    onSearch,
    onSelect,
    onChangeDate,
    onChangePage,
    onShowSizeChange,
    onBlur,
    onKeyDown,
  } = useFilter(initFilterMyLibrary) || {}
  const [isClickPlaying, setIsClickPlaying] = useState(false)
  const { setCurrentTrack, setListPlayingTrack, setPlayerControl } =
    usePlayingTrackStore()
  const { createdAtTo, createdAtFrom, limit, page, keyword, fileType } = filter || {}
  const newFilter = {
    keyword: keyword?.trim(),
    purchasedAtFrom: createdAtFrom,
    purchasedAtTo: createdAtTo,
    fileType: fileType?.toString(),
    limit,
    page,
  }
  const searchParams = useSearchParams()
  const router = useRouter()

  const [visibleModalDownload, setVisibleModalDownload] = useState(false)
  const [pageDetail, setPageDetail] = useState<string | null>(null)
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    setPageDetail(searchParams.get('page'))
    setId(searchParams.get('id'))
  }, [searchParams])

  const {
    transactionPurchased,
    loading,
    contentDetail,
    handleDownload,
    handleDownloadMulti,
  } = useMyLibrabry(id as string, newFilter)

  const onViewDetailPuchased = (id: string) => {
    router.push({
      pathname: APP_URL.MY_LIBRARY,
      query: { page: 'detail', id },
    })
  }
  const openModalDownload = (type: string, id: string) => {
    router.push({
      pathname: APP_URL.MY_LIBRARY,
      query: pageDetail ? { page: pageDetail, id, type } : { id, type },
    })
    setVisibleModalDownload(true)
  }

  const handleCancelModalDownload = () => {
    setVisibleModalDownload(!visibleModalDownload)
  }
  useEffect(() => {
    if (contentDetail?.medias && isClickPlaying) {
      setIsClickPlaying(false)
      setCurrentTrack(contentDetail, contentDetail?.medias[0])
      setListPlayingTrack(contentDetail?.medias)
    }
  }, [contentDetail])

  const handlePlayAudio = async (content: any) => {
    setIsClickPlaying(true)
    router.push({
      pathname: APP_URL.MY_LIBRARY,
      query: { page: 'detail', id: content.id },
    })
    setPlayerControl({
      playing: true,
    })
  }
  if (pageDetail === 'detail' && id) {
    return (
      <>
        <MyLibraryDetail
          id={id}
          handleOpenModalDownload={openModalDownload}
          handleDownload={handleDownload}
        />
        {visibleModalDownload && (
          <ModalDownload
            visible={visibleModalDownload}
            onCancel={handleCancelModalDownload}
            contentDetail={contentDetail}
            onDownloadSingleFile={handleDownload}
            onDownloadMulti={handleDownloadMulti}
          />
        )}
      </>
    )
  }
  const { currentPage, totalItems, itemsPerPage, totalPages } =
    transactionPurchased?.meta || {}
  return (
    <div className="px-[160px] py-[60px] bg-[#f3f4f6]">
      <div className="bg-white rounded-[10px] border p-4">
        <h2 className="text-xl font-semibold mb-2">My library</h2>
        <Row gutter={[16, 8]} align={'middle'}>
          <Col xl={5} lg={5} md={24} xs={24}>
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

          <Col xl={15} lg={15} md={24} xs={24}>
            <FilterAdvance
              filter={filter}
              isSelectionFile={true}
              onChangeDate={onChangeDate}
              onSelect={onSelect}
            />
          </Col>
          <Col xl={4} lg={4} md={6} xs={24} className="col-reset">
            <span
              className="text-[#00AAF2] cursor-pointer font-semibold"
              onClick={onClear}
            >
              reset
            </span>
          </Col>
        </Row>
        <div className="text-sm mt-4 mb-3">Total items: {totalItems} items</div>
        <Spin spinning={loading} className="w-full h-full">
          <TableContent
            data={transactionPurchased?.items}
            columns={getLibraryColumn({
              onViewDetailPuchased,
              openModalDownload,
              handlePlayAudio,
            })}
            onChangePage={onChangePage}
            onShowSizeChange={onShowSizeChange}
            totalItems={totalItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            showSizeChanger={true}
            loading={loading}
            totalPages={totalPages}
          />
        </Spin>
      </div>
      {visibleModalDownload && (
        <ModalDownload
          visible={visibleModalDownload}
          onCancel={handleCancelModalDownload}
          contentDetail={contentDetail}
          onDownloadSingleFile={handleDownload}
          onDownloadMulti={handleDownloadMulti}
        />
      )}
    </div>
  )
}

export default MyLibrary
