'use client'
import ModalConfirm from '@/components/Modal/ModalConfirm'
import useNotification from '@/hooks/useNotification'
import { useRouter } from '@/i18n/routing'
import { getNotificationTitle, getTimeAmPm, unescapeString } from '@/lib/utils'
import ArrowLeft from '@/resources/svg/ArrowLeft'
import NotificationIcon from '@/resources/svg/NotificationIcon'
import Trash from '@/resources/svg/Trash'
import { Button } from 'antd'
import { useSearchParams } from 'next/navigation'
import React, { use, useState } from 'react'

function NotificationDetail() {
  const serchParams = useSearchParams()
  const router = useRouter()
  const id = serchParams.get('notificationId')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { onDeleteNotification, fetchNotificationDetail } = useNotification(id)
  const { data } = fetchNotificationDetail
  const handleDeleteNotification = () => {
    onDeleteNotification(data?.notiUserId)
    setIsModalVisible(false)
    router.push('/')
  }
  return (
    <>
      <div className="py-[60px] px-[160px] min-h-[780px] ">
        <div className="flex flex-col gap-5 max-w-[840px] mx-auto border rounded-[10px] py-5 px-[15px]">
          <div
            className="flex gap-1 cursor-pointer items-center"
            onClick={() => router.push('/')}
          >
            <ArrowLeft />
            <span className="text-xs text-[#6b7280]">Back to Hompage</span>
          </div>
          <div className="flex justify-between items-center pb-5 border-b">
            <div className="flex gap-[2px] flex-col">
              <span className="text-xl text-[#191919] font-bold text-ellipsis overflow-hidden">
                {data?.title}{' '}
              </span>
              <span className="text-xs text-[#6b7280] font-normal">
                {getTimeAmPm(data?.publicDate)}
              </span>
            </div>
            <Button
              className="w-9 h-9 rounded-full border cursor-pointer"
              onClick={() => setIsModalVisible(true)}
              icon={<Trash width="20" height="20" color="#6B7280" />}
            ></Button>
          </div>
          <div className="px-[15px] text-base">
            <div
              className="notification-detail_message"
              dangerouslySetInnerHTML={{
                __html: unescapeString(data?.message || ''),
              }}
            />
          </div>
        </div>
      </div>
      {isModalVisible && (
        <ModalConfirm
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title={
            <div
              dangerouslySetInnerHTML={{
                __html: `<span class='font-normal'>Do you want to remove</span> ${data.title}}`,
              }}
            />
          }
          icon={<NotificationIcon width="20" height="20" />}
          primaryButton={{ text: 'Yes', onClick: handleDeleteNotification }}
          secondaryButton={{ text: 'No', onClick: () => setIsModalVisible(false) }}
        />
      )}
    </>
  )
}

export default NotificationDetail
