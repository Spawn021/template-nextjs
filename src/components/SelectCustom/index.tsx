import React from 'react'
import DownArrowIcon from '@/resources/svg/down-arrow.svg'
import { Select } from 'antd'
import Image from 'next/image'
type Props = {
  value?: any
  options: { label: string; value: string | number }[]
  mode?: any
  placeholder?: string
  suffixIcon?: React.ReactNode
  classNames?: string
  filterOption?: boolean
  dropdownClassName?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
}
function SelectCustom({
  value,
  options,
  mode,
  placeholder,
  classNames,
  suffixIcon = <Image src={DownArrowIcon} alt="arrow-down" />,
  filterOption,
  dropdownClassName,
  onChange,
  onSearch,
}: Props) {
  return (
    <Select
      value={value}
      className={classNames}
      mode={mode}
      placeholder={placeholder}
      suffixIcon={suffixIcon}
      options={options}
      filterOption={filterOption}
      popupClassName={dropdownClassName}
      onChange={onChange}
      onSearch={onSearch}
      placement="bottomRight"
    >
      {options?.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  )
}

export default SelectCustom
