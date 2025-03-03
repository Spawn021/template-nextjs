import Image from 'next/image'
import Logo from '@/resources/svg/logo.svg'
import Youtube from '@/resources/svg/youtobeMobile.svg'
import Twitter from '@/resources/svg/twitterMobile.svg'
export default function Footer() {
  return (
    <footer className="w-full text-base bg-[#f3f4f6] pt-9">
      <div className="py-[14px] mx-auto px-10 flex justify-between items-start">
        <Image src={Logo} alt="logo" />
        <div className="flex justify-center items-center gap-3">
          <span className="cursor-pointer hover:font-semibold text-sm">About us</span>
          <span className="">|</span>
          <span className="cursor-pointer hover:font-semibold text-sm">
            Terms of Service
          </span>
          <span className="">|</span>
          <span className="cursor-pointer hover:font-semibold text-sm">
            Privacy Policy
          </span>
          <span className="">|</span>
          <span className="cursor-pointer hover:font-semibold text-sm">
            Notations based on Specified Commercial Transaction Act
          </span>
          <span className="">|</span>
          <span className="cursor-pointer hover:font-semibold text-sm">
            FAQs and Guideline
          </span>
        </div>
        <div className="flex gap-3">
          <Image src={Twitter} alt="twitter" />
          <Image src={Youtube} alt="youtube" />
        </div>
      </div>
      <div className="text-white bg-[#111827] flex justify-center items-center p-2 text-xs ">
        © 2024 Clepseadra. All rights reserved.
      </div>
    </footer>
  )
}
