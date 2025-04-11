import React, { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
const items: MenuProps['items'] = [
  {
    label: 'Newest',
    key: '1',
  },
  {
    label: 'Oldest',
    key: '2',
  },
  {
    label: 'Price: highest',
    key: '3',
  },
  {
    label: 'Price: lowest',
    key: '4',
  },
  {
    label: 'Top sales',
    key: '5',
  },
]

type Props = {
  onSortChange: (sort: string) => void
  total: number
  keyword?: string
}
export default function Sort({ onSortChange, total, keyword }: Props) {
  const [selected, setSelected] = useState('Newest')
  const handleSelect: MenuProps['onClick'] = (e) => {
    const selectedItem = items?.find((item) => item?.key === e.key) as
      | { label: string; key: string }
      | undefined
    if (selectedItem?.label) {
      setSelected(selectedItem.label)
      onSortChange(selectedItem.key)
    }
  }
  const menuProps = {
    items,
    onClick: handleSelect,
  }
  return (
    <div className="border-l-[1px] px-4 h-11 flex items-center justify-between gap-4">
      <div className="text-sm font-semibold">
        {`${total ? total : 0} results`}
        {keyword && (
          <>
            <span> for:</span>
            <span className="text-[#00aaf2]"> {keyword} </span>
          </>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm sort-custom">
        <div className="text-sm">Sort by:</div>
        <Dropdown menu={menuProps} trigger={['click']} className="text-xs cursor-pointer">
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {selected}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  )
}
