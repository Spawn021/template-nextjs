import React, { memo, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getTags } from '@/lib/api/product'
import FilterCustom from '@/components/FilterBox/FilterCustom'
import { Category, Tag } from '@/types/Home'
import { convertStringToArray, ParseOptionCategoryAndTag } from '@/lib/utils'
import { Divider } from 'antd'
import { FILE_FORMAT, filterVoice } from '@/lib/constant'
import FilterPrice, { FilterPriceForm } from '@/components/FilterBox/FilterPrice'
import TagsFilter from '@/components/FilterBox/TagsFilter'

type props = {
  onFilterChange: (field: keyof filterVoice, value: number[]) => void
  onApplyPrice: (data: FilterPriceForm) => void
  params?: filterVoice
  onClose?: (field: string, id: string | number) => void
  clearAll?: () => void
}
export type selectedOptions = {
  field: any
  value: string | number
  id: number | string
}
function FilterBox({
  onFilterChange,
  onApplyPrice,
  params = {},
  onClose,
  clearAll,
}: props) {
  const [search, setSearch] = useState('')
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  })

  const categoriesData = useMemo(() => {
    return categories?.items
      ?.sort((a: Category, b: Category) => Number(b.count) - Number(a.count))
      .map((item: Category) => ParseOptionCategoryAndTag(item))
  }, [categories, search])

  const tagsData = useMemo(() => {
    return tags?.items
      ?.sort((a: Tag, b: Tag) => Number(b.count) - Number(a.count))
      .filter((item: Tag) => item.name.toLowerCase().includes(search.toLowerCase()))
      .map((item: Tag) => ParseOptionCategoryAndTag(item))
  }, [tags, search])

  const selectedOptions = useMemo<selectedOptions[]>(() => {
    const arr: selectedOptions[] = []
    if (params?.categoryIds) {
      convertStringToArray(params?.categoryIds).map((item: number) => {
        const category = categories?.items.find((i: any) => i.id === item)
        if (category) {
          arr.push({ field: 'categoryIds', value: category.name, id: item })
        }
      })
    }
    if (params?.tagIds) {
      convertStringToArray(params?.tagIds).map((item: number) => {
        const tag = tags?.items.find((i: any) => i.id === item)
        if (tag) {
          arr.push({ field: 'tagIds', value: tag.name, id: item })
        }
      })
    }
    if (params?.files) {
      convertStringToArray(params?.files).map((item: string) => {
        if (item === 'audio/wav') arr.push({ field: 'files', value: 'WAV', id: item })
        if (item === 'audio/mpeg') arr.push({ field: 'files', value: 'MP3', id: item })
      })
    }
    if (params?.fromPrice && params?.toPrice) {
      arr.push({
        field: 'priceFromTo',
        value: `${params.fromPrice}円 - ${params.toPrice}円`,
        id: 'price',
      })
    } else {
      if (params?.fromPrice) {
        arr.push({
          field: 'fromPrice',
          value: `From ${params.fromPrice}円`,
          id: 'fromPrice',
        })
      }
      if (params?.toPrice) {
        arr.push({
          field: 'toPrice',
          value: `To ${params.toPrice}円`,
          id: 'toPrice',
        })
      }
    }
    return arr
  }, [params])
  const handleSearch = (value: string) => {
    setSearch(value)
  }

  return (
    <div className=" border-r-[1px] border-solid w-[260px] border-[#dcdcdc]">
      <div className="py-5 pr-3 w-[260px]">
        <TagsFilter
          selectedOptions={selectedOptions}
          closeItem={onClose}
          closeAll={clearAll}
        />
        {selectedOptions.length > 0 && <Divider />}
        <FilterCustom
          title="Category"
          options={categoriesData}
          field="categoryIds"
          onChange={onFilterChange}
          selectedIds={convertStringToArray(params.categoryIds || '')}
        />
        <Divider />
        <FilterCustom
          hasSearch
          title="Tags"
          options={tagsData}
          field="tagIds"
          selectedIds={convertStringToArray(params.tagIds || '')}
          onChange={onFilterChange}
          onSearch={handleSearch}
        />
        <Divider />
        <FilterCustom
          title="File Format"
          options={FILE_FORMAT}
          field="files"
          onChange={onFilterChange}
          selectedIds={convertStringToArray(params.files || '')}
        />
        <Divider />
        <FilterPrice
          onApply={onApplyPrice}
          fromPrice={params.fromPrice?.toString()}
          toPrice={params.toPrice?.toString()}
        />
      </div>
    </div>
  )
}
export default memo(FilterBox)
