import NotificationIcon from '@/resources/svg/NotificationIcon'
import React from 'react'

const Notifications: React.FC = () => (
  <div className="flex items-center justify-center font-semibold h-8 gap-3 rounded-2xl border-[1px] border-solid border-[#e1e3e7] bg-white px-3 cursor-pointer">
    <NotificationIcon />
    <span>Notifications</span>
  </div>
)

export default Notifications
