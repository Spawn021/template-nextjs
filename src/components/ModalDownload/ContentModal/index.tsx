import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Typography, Tabs, Checkbox, Button } from 'antd'
import type { TabsProps } from 'antd'
import IconNotice from '@/resources/svg/icon-notice.svg'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { DownloadType, FileMediaType } from '@/constants'
import wavType from '@/resources/svg/wav-type.svg'
import mp3Type from '@/resources/svg/mp3-type.svg'
import { convertSizeToUnit, getTimeRunning } from '@/lib/utils'
import DownloadIcon from '@/resources/svg/DownloadIcon'
import { useSearchParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
type Props = {
  contentDetail?: any
  checkedList: string[]
  setCheckedList: (list: string[]) => void
  checkAll: boolean
  setCheckAll: (check: boolean) => void
  onDownloadSingleFile: (id: string, params: any) => void
  onDownloadMulti: (id: string, params: any) => void
}
const { Text, Paragraph } = Typography
function ContentModal({
  contentDetail,
  checkedList,
  checkAll,
  setCheckedList,
  setCheckAll,
  onDownloadSingleFile,
  onDownloadMulti,
}: Props) {
  const queryClient = useQueryClient()
  const { medias, title, imageUrl, id, fileFormat, category, unitPrice } =
    contentDetail || {}
  const [typeFile, setTypeFile] = useState<any>(FileMediaType.MP3)
  const newFileFormat = fileFormat?.split(',') || []
  const searchParams = useSearchParams()

  const plainOptions = () => {
    const result = []
    if (medias) {
      for (let i = 0; i < medias.length; i++) {
        const files = medias[i]?.files
        for (let k = 0; k < files?.length; k++) {
          if (files[k]?.type === typeFile) {
            result.push(files[k]?.id)
          }
        }
      }
    }

    return result
  }
  useEffect(() => {
    setTypeFile(searchParams.get('type'))
  }, [searchParams])

  const onChangeSelected = (list: any) => {
    setCheckedList(list)
    setCheckAll(list.length === plainOptions().length)
  }

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions() : [])
    setCheckAll(e.target.checked)
  }
  const handleDownloadMultiFileSelected = () => {
    const data = {
      fileMediaType: typeFile,
      type: DownloadType.NORMAL,
      fileIds: checkedList,
    }
    onDownloadMulti(id, data)
    queryClient.invalidateQueries({
      queryKey: ['contentDetailLibrary'],
    })
  }

  const renderListTrack = () => {
    return (
      <>
        <Checkbox
          onChange={onCheckAllChange}
          checked={checkAll}
          className="text-sm mb-3 pb-3 border-b-[1px] border-solid border-[#e1e3e7] w-full"
          indeterminate={!!checkedList?.length && !checkAll}
        >
          Select All
        </Checkbox>
        <div className="w-full">
          <Checkbox.Group
            value={checkedList}
            className="w-full flex flex-col gap-3"
            onChange={onChangeSelected}
          >
            {(medias || [])?.map((item: any, i: number) => (
              <div className="w-full" key={i}>
                {item?.files
                  ?.filter((e: any) => e?.type === typeFile)
                  ?.map((file: any, k: number) => (
                    <div key={k} className="flex items-center justify-between">
                      <div className="flex gap-2 items-center w-[69%]  ">
                        <Checkbox value={file?.id} />
                        <div className="flex gap-2 items-center flex-grow-0 w-full ">
                          <div className="flex-shrink-0 ">
                            <Image
                              src={file.type === FileMediaType.WAV ? wavType : mp3Type}
                              alt="file"
                              className="w-10 h-10"
                            />
                          </div>
                          <div className="overflow-hidden w-full">
                            <Text
                              className="text-[#030712] text-sm font-semibold"
                              ellipsis={{
                                tooltip: file?.nameWithTrack,
                              }}
                            >
                              {file?.nameWithTrack}
                            </Text>
                            <div className="text-[#6B7280] text-sm font-normal">
                              {convertSizeToUnit(file?.size)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center font-semibold ">
                        {getTimeRunning(file?.timeRunning)}

                        <Button
                          className="font-semibold"
                          onClick={() => {
                            onDownloadSingleFile(id, {
                              type: DownloadType.NORMAL,
                              mediaId: item?.id,
                              fileId: file?.id,
                            })
                            queryClient.invalidateQueries({
                              queryKey: ['contentDetailLibrary'],
                            })
                          }}
                        >
                          <DownloadIcon color="#6B7280" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </Checkbox.Group>
        </div>
      </>
    )
  }
  const items: TabsProps['items'] = [
    {
      key: FileMediaType.MP3,
      label: 'MP3',
      children: renderListTrack(),
      disabled: !newFileFormat.includes(FileMediaType.MP3),
    },
    {
      key: FileMediaType.WAV,
      label: 'WAV',
      children: renderListTrack(),
      disabled: !newFileFormat.includes(FileMediaType.WAV),
    },
  ]
  const onChangeTab = (key: string) => {
    setTypeFile(key)
    setCheckAll(false)
    setCheckedList([])
  }
  return (
    <div className="content-download">
      <div className="text-xl font-semibold mb-6 ">Download Voice</div>
      <div className="flex items-center gap-3 mb-3 px-4 py-2 text-xs text-[#f79009] bg-[#fff0db] border-[1px] border-solid border-[#ffb970] font-normal rounded-lg">
        <Image src={IconNotice} alt="icon-notice" className="mb-2" />
        <div
          dangerouslySetInnerHTML={{
            __html:
              'Make sure you allow \"Echo Canvas\" to download multiple files at your browser settings </br>If you are still being asked where to save each file for every download, you may need to disable this feature from your downloads settings.',
          }}
        />
      </div>
      <div className="border-[1px] border-solid border-[#e1e3e7] rounded-lg mb-6">
        <div className="flex p-3 gap-2 border-b-[1px] border-solid border-[#e1e3e7] flex-shrink-0">
          <img
            src={imageUrl}
            alt="image"
            className="w-[52px] h-[52px] rounded-md object-cover aspect-square min-w-[52px]"
          />
          <div className="flex-grow w-auto overflow-hidden">
            {category?.name && (
              <Text
                className="border-[1px] border-solid border-[#e1e3e7] rounded-[4px] px-2 py-[2px] text-xs font-semibold mb-1"
                ellipsis={{
                  tooltip: category?.name,
                }}
                style={{
                  color: category?.color?.colorCodeText,
                  background: category?.color?.colorCode,
                  borderColor: category?.color?.colorCodeBorder,
                }}
              >
                {category?.name}
              </Text>
            )}
            <Paragraph
              className="w-full"
              ellipsis={{
                tooltip: title,
                rows: 1,
              }}
            >
              {title}
            </Paragraph>
          </div>
        </div>
        <div className="p-3">
          <Tabs activeKey={typeFile} items={items} onChange={onChangeTab} />
        </div>
      </div>
      <div className="flex justify-center items-center btn-download ">
        <Button
          disabled={checkedList.length === 0}
          className="bg-white text-[#00AAF2] border-[#00aaf2] font-semibold rounded-lg px-4 py-2"
          onClick={handleDownloadMultiFileSelected}
          size="large"
        >
          <DownloadIcon color="#00aaf2" />
          Download Selected
        </Button>
      </div>
    </div>
  )
}

export default ContentModal
