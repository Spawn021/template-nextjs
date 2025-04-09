import SelectCustom from '@/components/SelectCustom'
import React, { useState } from 'react'
import { Col, DatePicker, Row } from 'antd'
import { LIST_FILE_FORMAT, PAYMENT_METHOD_OPTIONS, STATUS_TRANSACTION } from '@/constants'
import CalendarIcon from '@/resources/svg/CalendarIcon'
import moment from 'moment'
import dayjs from 'dayjs'
type Props = {
  isSelectionFile?: boolean
  filter?: any
  onChangeDate: (date: any, dateString: any, name: string) => void
  onSelect: (value: string | number, name: string) => void
}
function FilterAdvance({
  isSelectionFile = false,
  onChangeDate,
  onSelect,
  filter,
}: Props) {
  const [fileType, setFileType] = useState<string>('')
  const options = LIST_FILE_FORMAT.filter((item) =>
    item.label.toLocaleLowerCase().includes(fileType),
  )
  const handleSearch = (value: string) => {
    setFileType(value?.toLocaleLowerCase()?.trim())
  }
  const disabledDate = (current: any, name: string) => {
    if (name === 'createdAtFrom') {
      const toDate = filter.createdAtTo ? moment(filter.createdAtTo) : ''
      if (toDate) {
        return current && current > toDate.endOf('day')
      }
      return current && current > moment().endOf('day')
    } else if (name === 'createdAtTo') {
      const createdAtFrom = filter.createdAtFrom ? moment(filter.createdAtFrom) : ''
      if (createdAtFrom) {
        return (
          (current && current > moment().endOf('day')) ||
          current < createdAtFrom.startOf('day')
        )
      }
      return current && current > moment().endOf('day')
    }
  }

  return (
    <Row gutter={[8, 8]} align={'middle'} className="mt filter-advance">
      <Col xl={isSelectionFile ? 8 : 5} lg={6} md={12} xs={12} className="col-date">
        <DatePicker
          value={filter?.createdAtFrom ? dayjs(filter.createdAtFrom) : null}
          onChange={(date, dateString) => onChangeDate(date, dateString, 'createdAtFrom')}
          disabledDate={(current) => disabledDate(current, 'createdAtFrom')}
          className="w-full"
          suffixIcon={<CalendarIcon />}
          placeholder="Purchase date (From)"
        />
      </Col>
      <Col xl={isSelectionFile ? 8 : 5} lg={6} md={12} xs={12} className="col-date">
        <DatePicker
          value={filter?.createdAtTo ? dayjs(filter.createdAtTo) : null}
          disabledDate={(current) => disabledDate(current, 'createdAtTo')}
          onChange={(date, dateString) => onChangeDate(date, dateString, 'createdAtTo')}
          className="w-full"
          suffixIcon={<CalendarIcon />}
          placeholder="Purchase date (To)"
        />
      </Col>
      {isSelectionFile ? (
        <Col xl={8} lg={6} md={12} xs={12} className="select-option-type">
          <SelectCustom
            value={filter.fileType}
            onChange={(value: string) => onSelect(value, 'fileType')}
            classNames="w-full"
            onSearch={handleSearch}
            options={options}
            placeholder="File format"
            mode="multiple"
            filterOption={false}
          />
        </Col>
      ) : (
        <>
          <Col xl={5} lg={6} md={12} xs={24} className="select-option">
            <SelectCustom
              value={filter.paymentMethod}
              onChange={(value) => onSelect(value, 'paymentMethod')}
              classNames="w-full"
              options={PAYMENT_METHOD_OPTIONS}
              placeholder="Payment method"
            />
          </Col>
          <Col xl={5} lg={6} md={12} xs={24} className="select-option">
            <SelectCustom
              value={filter.status}
              onChange={(value: string) => onSelect(value, 'status')}
              classNames="w-full"
              options={STATUS_TRANSACTION}
              placeholder="Status"
            />
          </Col>
        </>
      )}
    </Row>
  )
}

export default FilterAdvance
