import React, { useRef, useState } from 'react'
import { FilterTransaction } from '@/types/Profile'
import dayjs from 'dayjs'

function useFilter(initValueFilter: FilterTransaction) {
  const [filter, setFilter] = useState(initValueFilter)
  const [localKeyword, setLocalKeyword] = useState('')
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const page = filter.page
  const [show, setShow] = useState([])
  const [toggle, setToggle] = useState(false)
  const limit = filter.limit || 0

  const onChangeDate = (date: any, dateString: string, name: string) => {
    let value = ''
    if (date) {
      if (name === 'createdAtFrom') {
        value = dayjs(date).startOf('day').toISOString()
      }
      if (name === 'createdAtTo') {
        value = dayjs(date).endOf('day').toISOString()
      }
    } else {
      value = ''
    }
    setFilter((prev) => ({ ...prev, [name]: value, page: 1 }))
  }
  const onShow = (value: string) => {
    const result: any = [...show]
    if (show.findIndex((f) => f === value) === -1) {
      result.push(value)
    } else {
      const index = show.findIndex((f) => f === value)
      result.splice(index, 1)
    }
    setShow(result)
  }
  const onSelect = (value: string | number, name: string) => {
    setFilter((prev) => ({ ...prev, [name]: value, page: 1 }))
  }
  const onSearch = (keyword: string) => {
    setLocalKeyword(keyword)
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      setFilter((prev) => ({ ...prev, keyword, page: 1 }))
    }, 2000)
  }
  const onToggle = () => {
    setToggle(!toggle)
  }
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      setFilter((prev) => ({ ...prev, keyword: localKeyword, page: 1 }))
    }
  }
  const onClear = () => {
    setFilter(initValueFilter)
    setLocalKeyword('')
  }
  const onShowSizeChange = (current: number, pageSize: number) => {
    setFilter((f) => ({ ...f, page: current, limit: pageSize }))
  }
  const onChangePage = (pageNum: any, pageSize: any) => {
    if (pageSize === limit) {
      setFilter((f) => ({ ...f, page: pageNum, limit: pageSize }))
    } else setFilter((f) => ({ ...f, page: 1, limit: pageSize }))
  }
  const onBlur = () => {
    setLocalKeyword(localKeyword.trim())
  }
  const onChange = (value: string) => {
    setLocalKeyword(value)
  }

  return {
    show,
    filter,
    localKeyword,
    toggle,
    onShow,
    setFilter,
    onToggle,
    onChange,
    onSelect,
    onChangeDate,
    onKeyDown,
    onSearch,
    onClear,
    onChangePage,
    onBlur,
    onShowSizeChange,
  }
}

export default useFilter
