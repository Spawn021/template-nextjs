import React from 'react'
import { Typography } from 'antd'
import moment from 'moment'
const { Paragraph } = Typography
function TrackList({ contentDetail }: { contentDetail: any }) {
  const { medias } = contentDetail ?? {}
  return (
    <div className="border-[1px] border-solid border-[#e1e3e7] mb-5 rounded-[12px]">
      <div className="flex items-center gap-2 p-4 border-b-[1px]">
        <div className="text-[18px] font-semibold">トラックリスト</div>
        <div className="text-sm ">{`${medias?.length} トラック`}</div>
      </div>
      <div className="pb-3">
        {medias &&
          medias
            ?.sort((a: any, b: any) => a.order - b.order)
            ?.map((item: any, i: number) => (
              <div className="py-3 px-4 border-b" key={i}>
                <div className="flex pb-3 gap-3 items-center">
                  <div className="text-base text-[#9ca3af] font-semibold">
                    {i + 1 >= 10 ? i + 1 : `0${i + 1}`}
                  </div>

                  <div className="flex justify-between w-full items-center">
                    <Paragraph
                      className="text-base"
                      ellipsis={{ tooltip: item?.name, rows: 2 }}
                    >
                      {item?.name}
                    </Paragraph>

                    <div className="text-[#6b7280]">
                      {moment.utc(item?.timeRunning * 1000).format('HH:mm:ss') ||
                        '00:00:00'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default TrackList
