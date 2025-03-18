import React, { memo } from 'react'
import { Checkbox } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { filterVoice } from '@/lib/constant'

type props = {
  title: string
  options?: { label: string; value: string }[]
  hasSearch?: boolean
  field?: keyof filterVoice
  selectedIds?: string[]
  onChange?: (field: keyof filterVoice, value: number[]) => void
  onSearch?: (value: string) => void
}
function FilterCustom({
  title,
  options,
  hasSearch,
  field,
  onChange,
  onSearch,
  selectedIds = [],
}: props) {
  const handleChange = (checkedValues: any) => {
    if (field && onChange) {
      onChange(field, checkedValues)
    }
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value)
    }
  }
  return (
    <div className="w-full">
      <div className="text-sm font-semibold mb-[14px]">{title}</div>
      {hasSearch && (
        <Input
          className="rounded-[20px] h-[30px] custom-input w-full mb-4"
          placeholder="Search"
          suffix={
            <SearchOutlined className="text-lg cursor-pointer text-gray-500 font-bold" />
          }
          onChange={handleSearch}
        />
      )}
      <Checkbox.Group
        options={options}
        value={selectedIds}
        className="flex checkbox-custom w-full max-h-[180px] gap-4 overflow-y-auto"
        onChange={handleChange}
      />
    </div>
  )
}

export default memo(FilterCustom)
