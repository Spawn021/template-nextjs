import React from 'react'

import { Button } from 'antd'
import PauseIcon from '@/resources/svg/PauseIcon'

interface Props {
  title: string
  handlePauseAudio: () => void
}

export default function ButtonPause({ title, handlePauseAudio }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    handlePauseAudio()
  }
  return (
    <Button
      className={
        'button-pause bg-white text-black border-[1px] border-solid border-[#e5e7eb] font-semibold min-w-[145px] flex items-center justify-center px-[15px]'
      }
      onClick={handleClick}
    >
      <PauseIcon />

      {title}
    </Button>
  )
}
