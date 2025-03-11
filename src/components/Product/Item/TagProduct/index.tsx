import { Tag as TagType } from '@/types/Home'
import React, { useRef, useEffect, useState } from 'react'
import { Tag, Tooltip } from 'antd'
import { truncateText } from '@/lib/utils'

export default function TagProduct({ tags }: { tags?: TagType[] }) {
  const tagContainerRef = useRef<HTMLDivElement>(null)
  const [visibleTags, setVisibleTags] = useState<TagType[]>([])
  const [hiddenTags, setHiddenTags] = useState<TagType[]>([])
  const tagContainerWidth = tagContainerRef.current?.offsetWidth

  const calculateVisibleTags = () => {
    let totalWidth = 0
    let visibleCount = 0
    const hidden: TagType[] = []

    if (!tags?.length || !tagContainerRef.current) return

    setVisibleTags([])
    setHiddenTags([])

    tags.forEach((tag, index) => {
      const tagWidth = tag.name.length * 8 + 40
      const plusTagWidth = hidden.length > 0 ? 40 : 0

      if (totalWidth + tagWidth + plusTagWidth < tagContainerWidth!) {
        totalWidth += tagWidth
        visibleCount++
        setVisibleTags((prev) => [...prev, tag])
      } else {
        hidden.push(tag)
      }
    })

    setHiddenTags(hidden)
  }

  useEffect(() => {
    calculateVisibleTags()
    const handleResize = () => {
      calculateVisibleTags()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [tags, tagContainerWidth])

  return (
    <div className="flex flex-wrap" ref={tagContainerRef}>
      {visibleTags.map((tag, index) => (
        <Tag key={index} className="mb-[6px] mr-[6px] hover:cursor-pointer">
          {truncateText(tag.name, 15)}
        </Tag>
      ))}
      {hiddenTags.length > 0 && (
        <Tooltip
          title={
            <div className="flex flex-wrap gap-y-2 mx-[2px]">
              {hiddenTags
                .map((t) => t.name)
                .join(', ')
                .split(',')
                .map((tag, index) => (
                  <Tag className="hover:cursor-pointer" key={index}>
                    {truncateText(tag, 15)}
                  </Tag>
                ))}
            </div>
          }
        >
          <Tag className="mb-[6px] mr-[6px] hover:cursor-pointer">
            +{hiddenTags.length}
          </Tag>
        </Tooltip>
      )}
    </div>
  )
}
