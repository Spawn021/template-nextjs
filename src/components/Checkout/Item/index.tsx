import TagCategory from '@/components/Product/Item/TagCategory'
import React from 'react'
import { Typography } from 'antd'
import clsx from 'clsx'

const { Text, Paragraph } = Typography

function Item({
  data,
  listItemUnavailable,
}: {
  data: any
  listItemUnavailable?: string[]
}) {
  const itemData = data?.content
  return (
    <div
      className={clsx(
        'flex items-center gap-3 item-cart justify-between px-3',
        listItemUnavailable?.includes(itemData?.id) ? 'opacity-50' : '',
      )}
    >
      <div className="flex items-center gap-3 w-[88%]">
        <img
          src={itemData?.images[0]?.url}
          className="w-16 h-16 object-cover rounded-[4px] cursor-pointer bg-[#f3f4f6]"
          alt="thumbnail"
        />
        <div className="w-[70%] flex flex-col">
          <div className="tag cursor-pointer">
            <TagCategory
              backgroundColor={itemData?.category?.color.colorCode}
              borderColor={itemData?.category?.color.colorCodeBorder}
              textColor={itemData?.category?.color.colorCodeText}
              title={itemData?.category?.name}
              cssText={true}
            />
          </div>
          <Paragraph
            className="cursor-pointer text-base overflow-ellipsis overflow-hidden w-[100%] "
            ellipsis={{ tooltip: itemData?.title, rows: 2 }}
          >
            {itemData?.title}
          </Paragraph>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Text className="text-[#030712] text-base font-semibold flex justify-end">
          {listItemUnavailable?.includes(itemData?.id)
            ? 'Sold out'
            : `${data?.unitPrice} 円`}
        </Text>
      </div>
    </div>
  )
}

export default Item
