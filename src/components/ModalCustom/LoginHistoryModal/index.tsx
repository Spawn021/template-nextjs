'use client'
import TableContent from '@/components/TableContent'
import { FORMAT_DATE, FORMAT_TIME } from '@/constants'
import useLoginHistory from '@/hooks/useLoginHistory'

import moment from 'moment'
import React, { useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

function LoginHistoryModal() {
  const columns = () => [
    {
      title: 'Login date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '30%',
      render: (value: string) => (
        <div>
          <div>{moment(value).format(FORMAT_DATE)}</div>
          <div>{moment(value).format(FORMAT_TIME)}</div>
        </div>
      ),
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
      width: '30%',
    },
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: '25%',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: '10%',
    },
  ]
  const onFetchMore = () => {
    fetchNextPage()
  }

  const { useFetchInfiniteHistoryLogin, total } = useLoginHistory()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchInfiniteHistoryLogin

  const dataSource = useMemo(() => {
    if (data && data?.pages) {
      return data?.pages.reduce((result, el) => {
        return result?.concat(el.items)
      }, [])
    }
  }, [data])

  return (
    <InfiniteScroll
      dataLength={total || 0}
      next={onFetchMore}
      hasMore={Boolean(hasNextPage)}
      loader={isFetchingNextPage ? <div className="text-center">Loading...</div> : null}
      height={400}
      className="border rounded-lg infinite-scroll w-full"
    >
      <TableContent columns={columns()} data={dataSource} />
    </InfiniteScroll>
  )
}

export default LoginHistoryModal
