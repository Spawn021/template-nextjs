import React from 'react'
import { Tag, Tooltip } from 'antd'
import { selectedOptions } from '@/components/FilterBox'

function TagsFilter({
  selectedOptions,
  closeItem,
  closeAll,
}: {
  selectedOptions: selectedOptions[]
  closeItem?: (field: string, id: string | number) => void
  closeAll?: () => void
}) {
  const onClear = () => {
    if (closeAll) {
      closeAll()
    }
  }
  const onClose = (field: string, id: string | number) => {
    if (closeItem) {
      closeItem(field, id)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-[7px]">
        {selectedOptions.map((item, index) => (
          <Tooltip title={item.value} key={index}>
            <Tag
              className="bg-[#f3f4f6] border-[1px] border-solid border-[#f3f4f6] text-sm cursor-pointer font-medium rounded-[8px] px-2 py-[3px]  "
              closable
              onClose={() => onClose(item.field, item.id)}
            >
              {typeof item.value === 'string' && item.value.length > 20
                ? item.value.slice(0, 10) + '...'
                : item.value}
            </Tag>
          </Tooltip>
        ))}
      </div>
      {selectedOptions.length > 0 && (
        <button className="text-[#00aaf2] text-sm font-semibold mt-2" onClick={onClear}>
          Clear All
        </button>
      )}
    </div>
  )
}

export default TagsFilter
