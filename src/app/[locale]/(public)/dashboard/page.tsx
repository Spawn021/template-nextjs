'use client'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { RootState } from '@/store/redux/store'
import { useRouter } from 'next/navigation'
import { logout } from '@/store/redux/slices/authSlice'
import { getUserProfile } from '@/lib/api/user'
import { Link } from '@/i18n/routing'
import { signOut } from 'next-auth/react'

export default function DashboardPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)
  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  })

  const handleLogout = async () => {
    await signOut({ redirect: false }) // Đăng xuất khỏi Google nhưng không chuyển trang
    dispatch(logout()) // Xóa Redux state
    router.push('/') // Chuyển hướng về trang chủ
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Chào, {user.email}</p>
      <p>Thông tin cá nhân:</p>
      {isLoading && <p>Đang tải...</p>}
      {isError && <p>Lỗi khi tải thông tin cá nhân</p>}
      {userProfile && (
        <ul>
          <li>ID: {userProfile?.data?.id}</li>
          <li>Email: {userProfile?.data?.email}</li>
          <li>Tên: {userProfile?.data?.name}</li>
        </ul>
      )}
      <Link href="/">Home</Link>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  )
}
