'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { APP_URL, PROFILE_SECTION } from '@/constants'
import UserHistoryIcon from '@/resources/svg/user-history.svg'
import UserProfileIcon from '@/resources/svg/user-profile.svg'
import Image from 'next/image'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import UserProfile from '@/components/Profile/UserProfile'
import TransactionHistory from '@/components/Profile/TransactionHistory'

function Profile() {
  const searchParams = useSearchParams()

  const router = useRouter()
  const tab = searchParams.get('tab')
  const [tabActive, setTabActive] = useState<string>(PROFILE_SECTION.MY_PROFILE)
  const menu: MenuProps['items'] | any = [
    PROFILE_SECTION.MY_PROFILE,
    PROFILE_SECTION.TRANSACTION_HISTORY,
  ].map((key, index) => {
    return {
      key: key,
      icon:
        key === PROFILE_SECTION.TRANSACTION_HISTORY ? (
          <Image src={UserHistoryIcon} alt="user_profile" />
        ) : (
          <Image src={UserProfileIcon} alt="user_profile" />
        ),
      label:
        key === PROFILE_SECTION.TRANSACTION_HISTORY
          ? 'Transaction History'
          : 'My Profile',
    }
  })
  const onClick: MenuProps['onClick'] = (e) => {
    router.push({
      pathname: APP_URL.PROFILE,
      query: { tab: e.key },
    })
  }
  useEffect(() => {
    if (!tab) {
      router.replace({
        pathname: APP_URL.PROFILE,
        query: { tab: PROFILE_SECTION.MY_PROFILE },
      })
    } else {
      setTabActive(tab)
    }
  }, [tab])

  return (
    <div className="py-[60px] px-[160px] bg-[#f3f4f6] profile-page">
      <Layout className="flex gap-6">
        <div>
          <Sider width={'256px'} theme="light">
            <Menu
              onClick={onClick}
              selectedKeys={[tabActive]}
              mode="inline"
              items={menu}
            />
          </Sider>
        </div>
        <Content>
          <div className="bg-white border rounded-[10px] p-[20px]">
            {tabActive === PROFILE_SECTION.MY_PROFILE && <UserProfile />}
            {tabActive === PROFILE_SECTION.TRANSACTION_HISTORY && <TransactionHistory />}
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default Profile
