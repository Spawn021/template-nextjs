import React from 'react'
import { Tag, Typography } from 'antd'
import clsx from 'clsx'

export default function TagCategory({
  backgroundColor,
  borderColor,
  textColor,
  title,
  cssText,
}: {
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  title?: string
  cssText?: boolean
}) {
  const { Text } = Typography
  return (
    <Tag
      className={clsx(
        'font-semibold rounded-[6px] text-center ',
        cssText
          ? 'text-[12px] py-[2px] px-2 mb-1 w-auto inline-block max-w-[100%]'
          : 'text-base py-[2px] px-3 mb-[6px] w-full',
      )}
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
