import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getTags } from '@/lib/api/product'

export default function FilterBox() {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  })
  console.log(categories, tags)
  return (
    <div className=" border-r-[1px] border-solid w-[260px] border-[#dcdcdc]">
      <div className="py-5 pr-4">12</div>
    </div>
  )
}
