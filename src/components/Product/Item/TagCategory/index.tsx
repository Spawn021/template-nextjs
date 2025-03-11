import React from 'react'
import { Tag, Typography } from 'antd'

export default function TagCategory({
  backgroundColor,
  borderColor,
  textColor,
  title,
}: {
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  title?: string
}) {
  const { Text } = Typography
  return (
    <Tag
      className="text-base font-semibold rounded-[6px] py-[2px] px-3 w-full text-center mb-[6px] "
      style={{
        backgroundColor: `${backgroundColor}`,
        border: `1px solid ${borderColor}`,
      }}
    >
      <Text style={{ color: textColor }} ellipsis={{ tooltip: title }}>
        {title}
      </Text>
    </Tag>
  )
}
