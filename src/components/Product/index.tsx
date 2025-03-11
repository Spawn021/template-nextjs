import React from 'react'
import { ProductItem } from '@/types/Home'
import Item from '@/components/Product/Item'

export default function Product({ data }: any) {
  return (
    <div className="product-list">
      {data?.items?.map((item: ProductItem, index: number) => (
        <div key={index} className="gap-5">
          <Item data={item} />
        </div>
      ))}
    </div>
  )
}
