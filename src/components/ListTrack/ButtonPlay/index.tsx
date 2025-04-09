import PlayIcon from '@/resources/svg/PlayIcon'
import { Button } from 'antd'
import React from 'react'
import clsx from 'clsx'
type Props = {
  title?: string
  handlePlayAudio: () => void
  isPlayAll?: boolean
}
function ButtonPlay({ title, handlePlayAudio, isPlayAll = true }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    handlePlayAudio()
  }

  return (
    <Button
      type="primary"
      onClick={handleClick}
      className={clsx(
        isPlayAll
          ? 'w-full bg-[#00aaf2] h-full'
          : 'bg-white text-black border-[1px] border-solid border-[#e5e7eb] font-semibold min-w-[145px] flex items-center justify-center play-item',
      )}
      size={isPlayAll ? 'large' : 'middle'}
    >
      {isPlayAll ? <PlayIcon /> : <PlayIcon color="#6b7280" />}
      {title}
    </Button>
  )
}

export default ButtonPlay
