import React, { useState } from 'react'
import { Dropdown, Button } from 'antd'
import Image from 'next/image'
import type { MenuProps } from 'antd'
import DownloadIcon from '@/resources/svg/DownloadIcon'
import IconDownload from '@/resources/svg/icon-download.svg'
import { FileMediaType } from '@/types/Content'
type Props = {
  handleDownload: (type: string, id: string) => void
  loading?: boolean
  suffixIcon?: React.ReactNode
  isShowIconContent?: boolean
  fileFormat?: string
  id: string
}

function ButtonDownLoad({
  suffixIcon,
  handleDownload,
  loading,
  isShowIconContent,
  fileFormat,
  id,
}: Props) {
  const getKeyByValue = (value: string) => {
    return Object.entries(FileMediaType).find(([, v]) => v === value)?.[0]
  }
  const [openDropdown, setOpenDropdown] = useState(false)

  const newFileFormat = fileFormat?.split(',') || []
  const items: MenuProps['items'] = newFileFormat.map((item, index) => ({
    key: index,
    label: (
      <div
        className={`flex items-center gap-2 cursor-pointer ${isShowIconContent ? 'text-sm ml-1' : 'text-lg  justify-center font-semibold'}`}
        onClick={(e) => {
          e.stopPropagation()
          setOpenDropdown(false)
          handleDownload(item, id)
        }}
      >
        {isShowIconContent && (
          <Image className="text-sm" src={IconDownload} alt="icon-download" />
        )}
        {getKeyByValue(item)}
      </div>
    ),
  }))

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      placement="bottom"
      open={openDropdown}
      onOpenChange={setOpenDropdown}
    >
      <Button
        className={`w-full h-full font-semibold text-[#00AAF2] border-[#00AAF2] ${isShowIconContent ? 'text-sm font-medium' : 'text-lg  font-semibold'} `}
        size="large"
      >
        <div className="flex items-center gap-2">
          <DownloadIcon color="#00AAF2" />
          Download
          {suffixIcon && <span>{suffixIcon}</span>}
        </div>
      </Button>
    </Dropdown>
  )
}

export default ButtonDownLoad
