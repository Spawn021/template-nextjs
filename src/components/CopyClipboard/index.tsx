import React, { useState } from 'react'
import Copied from '@/resources/svg/copied.svg'
import CopyIcon from '@/resources/svg/icon-copy.svg'
import copy from 'copy-to-clipboard'
import Image from 'next/image'
function CopyClipboard({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (url: string) => {
    copy(url)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }
  return (
    <>
      {!copied ? (
        <div
          className="flex items-center px-2 border-[1px] border-solid border-[#e1e3e7] rounded-[8px] cursor-pointer text-[#030712] font-semibold h-10 text-sm gap-3 "
          onClick={() => handleCopy(value)}
        >
          <Image className="w-6 h-6" src={CopyIcon} alt="copy" />
          <span className="copy__text">Copy link</span>
        </div>
      ) : (
        <div className="flex items-center px-2 border-[1px] border-solid border-[#e1e3e7] rounded-[8px]">
          <Image src={Copied} alt="copied" />
        </div>
      )}
    </>
  )
}

export default CopyClipboard
