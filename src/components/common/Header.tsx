'use client'
import clsx from 'clsx'
import Image from 'next/image'
import { use, useEffect, useState } from 'react'
import { Link } from '@/i18n/routing'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/redux/store'
import { useSearchParams } from 'next/navigation'
import { usePathname } from '@/i18n/routing'
import { useQueryClient } from '@tanstack/react-query'

import Notifications from '@/components/Notifications'
import Profile from '@/components/Profile'
import { APP_URL } from '@/constants'
import useCartList from '@/hooks/useCartList'
import DrawerCart from '@/components/DrawerCart'

import Logo from '@/resources/svg/logo.svg'
import FavouriteListIcon from '@/resources/svg/FavouriteListIcon'
import HomeSearch from '@/components/Search/HomeSearch'
import SoundWaveIcon from '@/resources/svg/SoundWaveIcon'
import CartIcon from '@/resources/svg/CartIcon'
import HelpIcon from '@/resources/svg/HelpIcon'
import LoginIcon from '@/resources/svg/LoginIcon'
import ProfileIcon from '@/resources/svg/ProfileIcon'
import useDrawerCart from '@/hooks/useDrawerCart'

export default function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { user } = useSelector((state: RootState) => state.auth)
  const { cart } = useSelector((state: RootState) => state.content)
  const { data } = useCartList(user?.accessToken)

  const listCart = user?.accessToken ? data : cart
  const numberCart = listCart ? listCart.length : 0
  const { onOpen, onClose, openDrawerCart } = useDrawerCart()

  useEffect(() => {
    if (searchParams.toString().includes('sortField')) {
      sessionStorage.setItem('preFilter', searchParams.toString())
    }
  }, [searchParams.toString()])

  return (
    <header
      className={clsx(
        'w-full text-base py-[14px] pl-[40px] pr-14 mx-auto sticky top-0 z-40',
        pathname.length > 1 ? 'bg-white' : 'bg-[#dfe5ff]',
      )}
    >
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="h-[50px] px-4 rounded-[30px] bg-white flex items-center">
            <Image src={Logo} alt="logo" />
          </div>
        </Link>
        <div className="flex justify-center items-center rounded-[30px] bg-white h-14 px-4 gap-2">
          <HomeSearch />
          <Link href={APP_URL.VOICE_SEARCH('')}>
            <div className="flex items-center justify-center font-semibold h-8 gap-3 rounded-2xl border-[1px] border-solid border-[#e1e3e7] bg-white px-3 cursor-pointer">
              <SoundWaveIcon />
              <span>List</span>
            </div>
          </Link>
          {user?.accessToken && (
            <div className="flex items-center justify-center font-semibold h-8 gap-3 rounded-2xl border-[1px] border-solid border-[#e1e3e7] bg-white px-3 cursor-pointer">
              <FavouriteListIcon />
              <span className="inline-block whitespace-nowrap">My library </span>
            </div>
          )}
          <div
            onClick={onOpen}
            className="flex items-center justify-center font-semibold h-8 gap-3 rounded-2xl border-[1px] border-solid border-[#e1e3e7] bg-white px-3 cursor-pointer"
          >
            <div className="relative">
              <CartIcon />
              {numberCart > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#ff0000] text-white text-xs rounded-full px-1">
                  +{numberCart}
                </span>
              )}
            </div>
            <span>Cart</span>
          </div>
          <DrawerCart open={openDrawerCart} onClose={onClose} listCart={listCart} />
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
