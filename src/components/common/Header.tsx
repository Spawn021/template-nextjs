'use client'
import Image from 'next/image'
import Logo from '@/resources/svg/logo.svg'
import HomeSearch from '@/components/Search/HomeSearch'
import SoundWaveIcon from '@/resources/svg/SoundWaveIcon'
import CartIcon from '@/resources/svg/CartIcon'
import HelpIcon from '@/resources/svg/HelpIcon'
import LoginIcon from '@/resources/svg/LoginIcon'
import ProfileIcon from '@/resources/svg/ProfileIcon'
import { Link } from '@/i18n/routing'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/redux/store'
import Notifications from '@/components/Notifications'
import FavouriteListIcon from '@/resources/svg/FavouriteListIcon'
import Profile from '@/components/Profile'
export default function Header() {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <header className="w-full text-base bg-[#dfe5ff] py-[14px] pl-[40px] pr-14 mx-auto sticky top-0 z-40 ">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="h-[50px] px-4 rounded-[30px] bg-white flex items-center">
            <Image src={Logo} alt="logo" />
          </div>
        </Link>
        <div className="flex justify-center items-center rounded-[30px] bg-white h-14 px-4 gap-2">
          <HomeSearch />
          <div className="flex items-center justify-center font-semibold h-8 gap-3 rounded-2xl border-[1px] border-solid border-[#e1e3e7] bg-white px-3 cursor-pointer">
            <SoundWaveIcon />
            <span>List</span>
          </div>
          {user?.accessToken && (
            <div className="flex items-center justify-center font-semibold h-8 gap-3 rounded-2xl border-[1px] border-solid border-[#e1e3e7] bg-white px-3 cursor-pointer">
              <FavouriteListIcon />
              <span className="inline-block whitespace-nowrap">My library </span>
            </div>
          )}
          <div className="flex items-center justify-center font-semibold h-8 gap-3 rounded-2xl border-[1px] border-solid border-[#e1e3e7] bg-white px-3 cursor-pointer">
            <CartIcon />
            <span>Cart</span>
          </div>
          {user?.accessToken ? (
            <Notifications />
          ) : (
            <div className="flex items-center justify-center font-semibold h-8 gap-3 rounded-2xl border-[1px] border-solid border-[#e1e3e7] bg-white px-3 cursor-pointer">
              <HelpIcon />
              <span>Help </span>
            </div>
          )}
          {!user?.accessToken && (
            <Link href="/login">
              <div className="flex items-center justify-center font-semibold h-8 gap-3 rounded-2xl border-[1px] border-solid border-[#e1e3e7] bg-white px-3 cursor-pointer">
                <LoginIcon />
                <span>Login</span>
              </div>
            </Link>
          )}
          {!user?.accessToken ? (
            <Link href="/signup">
              <div className="flex items-center justify-center font-semibold h-8 bg-[#00aaf2] text-white  gap-3 rounded-2xl border-[1px] border-solid border-[#e1e3e7 px-3 cursor-pointer">
                <ProfileIcon />
                <span className="inline-block whitespace-nowrap">Sign up</span>
              </div>
            </Link>
          ) : (
            <Profile email={user?.email} />
          )}
        </div>
      </div>
    </header>
  )
}
