import React from 'react'
import ProfileIcon from '@/resources/svg/ProfileIcon'
import ListIcon from '@/resources/svg/ListIcon'
import { useRouter } from '@/i18n/routing'
import { useDispatch } from 'react-redux'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import LogoutIcon from '@/resources/svg/LogoutIcon'
import { signOut } from 'next-auth/react'
import { logout } from '@/store/redux/slices/authSlice'
import { setAddToCart } from '@/store/redux/slices/contentSlice'
interface ProfileProps {
  email: string
}

const Profile: React.FC<ProfileProps> = ({ email }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    await signOut({ redirect: false })
    dispatch(logout())
    dispatch(setAddToCart([]))
    router.push('/')
  }
  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1':
        console.log('My Profile')
        break
      case '2':
        console.log('Transaction History')
        break
      case '3':
        handleLogout()
        break
      default:
    }
  }

  const items: MenuProps['items'] = [
    {
      label: 'My Profile',
      key: '1',
      icon: <ProfileIcon />,
      className: 'profile-item',
    },
    {
      label: 'Transaction History',
      key: '2',
      icon: <ListIcon />,
    },
    {
      label: 'Logout',
      key: '3',
      icon: <LogoutIcon />,
    },
  ]
  return (
    <Dropdown
      menu={{ items, onClick }}
      trigger={['click']}
      overlayClassName="profile-dropdown"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <div className="flex items-center justify-center font-semibold h-8 bg-[#00aaf2] text-white  gap-3 rounded-2xl border-[1px] border-solid border-[#e1e3e7 px-3 cursor-pointer">
            <ProfileIcon />
            <span className="inline-block whitespace-nowrap">{email}</span>
          </div>
        </Space>
      </a>
    </Dropdown>
  )
}
export default Profile
