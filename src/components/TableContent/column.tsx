import ButtonDownLoad from '@/components/ListTrack/ButtonDownLoad'
import ButtonPlay from '@/components/ListTrack/ButtonPlay'
import { FORMAT_DATE, FORMAT_TIME } from '@/constants'
import { convertSizeToUnit, getFileFormat, getTotalSize } from '@/lib/utils'
import { Typography } from 'antd'
import moment from 'moment'
import React from 'react'
type Props = {
  openModalDownload?: any
  onViewDetailPuchased: (id: string) => void
  handlePlayAudio: (content: any) => void
}
const { Text } = Typography
function getLibraryColumn({
  onViewDetailPuchased,
  openModalDownload,
  handlePlayAudio,
}: Props) {
  return [
    {
      title: 'Purchase date',
      key: 'purchasedAt',
      dataIndex: 'purchasedAt',
      width: '12%',
      render: function renderDate(value: any, record: any) {
        return (
          <>
            <div>{moment(value).format(FORMAT_DATE)}</div>
            <div>{moment(value).format(FORMAT_TIME)}</div>
          </>
        )
      },
    },
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
      width: '32%',
      render: function renderItemName(value: any, record?: any) {
        const { imageUrl, title, actor, id } = record
        return (
          <div
            className="flex items-center gap-2 w-full cursor-pointer"
            onClick={() => onViewDetailPuchased(id)}
          >
            <img className="w-10 h-10 object-cover rounded-md " src={imageUrl} />
            <div className="w-full overflow-hidden">
              <Text ellipsis={{ tooltip: title }}>{title}</Text>
              <Text ellipsis={{ tooltip: actor }}>{actor}</Text>
            </div>
          </div>
        )
      },
    },
    {
      title: 'Total size',
      dataIndex: 'totalSizeMp3',
      key: 'totalSize',
      width: '10%',
      render: function renderTotalSize(item: string, _record: any) {
        const { totalSizeFlac, totalSizeMp3, totalSizeWav } = _record
        const totalSize = getTotalSize(totalSizeFlac, totalSizeMp3, totalSizeWav)
        return <>{convertSizeToUnit(+totalSize.toString())}</>
      },
    },
    {
      title: 'File format',
      dataIndex: 'fileFormat',
      key: 'fileFormat',
      width: '12%',
      ellipsis: {
        showTitle: true,
      },
      render: function renderName(fileFormat: any, _record: any) {
        return <>{getFileFormat(fileFormat)}</>
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '15%',
      render: function renderTotalAirdrop(id: any, _record: any) {
        return (
          <div className="flex items-center gap-2 button-action">
            <div className="h-8 w-8">
              {!!_record?.canStream && (
                <ButtonPlay handlePlayAudio={() => handlePlayAudio(_record)} />
              )}
            </div>
            <div className="h-8 w-[130px]">
              {!!_record?.canDownload && (
                <ButtonDownLoad
                  handleDownload={openModalDownload}
                  id={_record?.id}
                  fileFormat={_record?.fileFormat}
                  isShowIconContent={true}
                />
              )}
            </div>
          </div>
        )
      },
    },
  ]
}

export default getLibraryColumn
