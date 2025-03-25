import { useRef, useState, useEffect } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import DomPurify from 'dompurify'
import clsx from 'clsx'

function ShowMore({ contentDetail }: { contentDetail: any }) {
  const { description } = contentDetail ?? {}

  const [expanded, setExpanded] = useState(false)
  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const toggleExpand = () => {
    setExpanded(!expanded)
  }
  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        setHeight(ref?.current.clientHeight)
      }
    }, 500)
  }, [description])

  return (
    <div className="border-[1px] border-solid border-[#e1e3e7] mb-5 rounded-[12px]">
      <div className="text-[18px] font-semibold px-4 py-2 border-b-[1px]">作品内容</div>
      <div className={clsx('relative overflow-hidden p-4', !expanded && 'max-h-[200px]')}>
        <div
          className="text-sm"
          ref={ref}
          dangerouslySetInnerHTML={{ __html: DomPurify.sanitize(description) }}
        />
        {height >= 200 && (
          <div
            className={`absolute bottom-0 left-0 right-0 h-[100px] ${!expanded ? 'bg-show' : ''}`}
          >
            <span
              className="absolute bottom-2 text-base left-[45%] rounded-[6px] cursor-pointer px-2 py-1 bg-[#f3f4f6]"
              onClick={toggleExpand}
            >
              {expanded ? (
                <>
                  Show less <UpOutlined />
                </>
              ) : (
                <>
                  Show more <DownOutlined />
                </>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowMore
