import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AutoComplete, Empty, Input, Modal, Typography } from 'antd'
import SearchIcon from '@/resources/svg/SearchIcon'
import CloseIcon from '@/resources/svg/CloseIcon'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/redux/store'
import useSearch from '@/hooks/useSearch'
import TagCategory from '@/components/Product/Item/TagCategory'

import { APP_URL } from '@/constants'
import { useRouter } from '@/i18n/routing'

const { Text } = Typography
function HomeSearch() {
  const router = useRouter()
  const searchRef = useRef<any>(null)
  const searchModalRef = useRef<any>(null)
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const { id } = useSelector((state: RootState) => state.auth.user)
  const { useFetchRecommendation } = useSearch({ keyword, id })
  const data = useFetchRecommendation?.data?.items
  const options = useMemo(() => {
    if (!data?.length) return []

    return [
      {
        label: <div className="font-semibold">Results</div>,
        options: data.map((item: any) => ({
          label: (
            <div className="bg-white flex items-center gap-3 border-b py-3 px-4 hover:bg-[#f3f4f6] cursor-pointer">
              <img
                className="w-14 h-14 rounded-[4px] object-contain bg-[#f3f4f6]"
                src={item.images?.[0]?.url}
                alt={item.title}
              />
              <div className="search-recommendation-item-content">
                <TagCategory
                  backgroundColor={item?.category?.color}
                  borderColor={item?.category?.colorBorder}
                  textColor={item?.category?.colorText}
                  title={item.category.name}
                  cssText={true}
                />
                <div className="search-recommendation-item-title">
                  <Text ellipsis={{ tooltip: item.title }}>{item.title}</Text>
                </div>
              </div>
            </div>
          ),
          value: item.title,
          item: item,
        })),
      },
    ]
  }, [data])

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const input = document.querySelector('.search-modal input')
        if (input) {
          ;(input as HTMLInputElement).focus()
        }
      }, 100)
    }
  }, [open])
  const navigateToPage = (id: string, isPending: boolean, isBought: boolean) => {
    if (isPending) {
      router.push({
        pathname: APP_URL.VOICE + `/${id}`,
      })
    } else if (isBought) {
      router.push({
        pathname: APP_URL.MY_LIBRARY,
        query: { page: 'detail', id: id },
      })
    } else {
      router.push({
        pathname: APP_URL.VOICE + `/${id}`,
      })
    }
  }
  const handleSelect = (value: string, item: any) => {
    setOpen(false)
    navigateToPage(item.item.id, item.isPending, item.isBought)
  }

  const handleChange = (e: any) => {
    setKeyword(e.target.value)
  }
  const handleSearch = (value: string) => {
    setOpen(false)
    router.push(APP_URL.VOICE_SEARCH(value.trim()))
  }
  useEffect(() => {
    const dropdown = document.querySelector('.search-autocomplete-popup') as HTMLElement
    if (dropdown) {
      dropdown.style.display = open ? 'block' : 'none'
    }
  }, [open])
  console.log(open)
  return (
    <>
      <Input
        ref={searchRef}
        value={keyword}
        className="rounded-[20px] h-[30px] custom-input w-[280px] "
        placeholder="Search"
        suffix={<SearchIcon className="text-lg cursor-pointer text-gray-500 font-bold" />}
        onFocus={() => {
          setOpen(true)
          searchRef.current?.blur()
        }}
      />
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false)
        }}
        closable={false}
        footer={null}
        className="search-modal"
        width={472}
      >
        <AutoComplete
          ref={searchModalRef}
          key={open ? 'open' : 'closed'}
          value={keyword}
          options={options}
          onSelect={handleSelect}
          open={open}
          popupClassName="search-autocomplete-popup"
          notFoundContent={
            open ? (
              <>
                <div className="bg-[#f3f4f6] py-1 px-3 text-[#00000040]">Results</div>
                <Empty description="No result found" />
              </>
            ) : null
          }
        >
          <Input.Search
            value={keyword}
            onSearch={handleSearch}
            onChange={handleChange}
            id="search-box"
            placeholder="Search"
            addonAfter={
              <div className="search-modal-close-icon bg-white cursor-pointer rounded-r-[30px]">
                <CloseIcon onClick={() => setOpen(false)} />
              </div>
            }
            autoComplete="off"
          />
        </AutoComplete>
      </Modal>
    </>
  )
}

export default HomeSearch
