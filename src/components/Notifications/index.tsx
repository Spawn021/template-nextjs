import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { Dropdown } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

import EmptyWrapper from '@/components/Empty/EmptyWrapper'
import {
  addTargetBlankToLinks,
  getNotificationTitle,
  getTimeAmPm,
  unescapeString,
} from '@/lib/utils'
import useNotification from '@/hooks/useNotification'

import NotificationIcon from '@/resources/svg/NotificationIcon'
import LogoDefault from '@/resources/svg/logo_default_noti.svg'
import MoreIcon from '@/resources/svg/MoreIcon'
import CheckCircle from '@/resources/svg/CheckCircle'
import Trash from '@/resources/svg/Trash'
import ModalConfirm from '@/components/Modal/ModalConfirm'
import { useRouter } from '@/i18n/routing'
import { APP_URL } from '@/constants'

type NotificationType = 'news-notification' | 'content-changed'

const Notifications = () => {
  const router = useRouter()
  const {
    useFetchInfiniteNotification,
    total,
    onReadNotification,
    onReadAllNotification,
    onDeleteNotification,
    unReadItems,
  } = useNotification('')
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchInfiniteNotification
  const [activeItemId, setActiveItemId] = useState<number | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const onFetchMore = () => {
    fetchNextPage()
  }
  const dataSource = useMemo(() => {
    if (data && data?.pages) {
      return data?.pages.reduce((result, el) => {
        return result?.concat(el.items)
      }, [])
    }
  }, [data])

  const getMoreMenu = (item: any) => {
    const menu = []
    if (!item?.isRead) {
      menu.push({
        key: '1',
        label: (
          <div className="flex items-center gap-2 cursor-pointer">
            <CheckCircle />
            <span>Mark as read</span>
          </div>
        ),
        onClick: () => {
          console.log('Mark as read', item)
        },
      })
    }
    menu.push({
      key: '2',
      label: (
        <div className="flex items-center gap-2 cursor-pointer">
          <Trash />
          <span>Delete</span>
        </div>
      ),
      onClick: () => {
        setIsModalVisible(true)
        setSelectedItem(item)
      },
    })
    return menu
  }

  const handleOnClickNotiItem = (item: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setDropdownOpen(false)
    if (!item?.isRead) {
      onReadNotification(item.id)
    }
    switch (item.notification.type) {
      case 'news-notification':
        if (item.notification.redirectUrl) {
          window.open(item.notification.redirectUrl, '_blank')
        } else {
          router.push(`/notification-detail?notificationId=${item.notification.id}`)
        }
        break

      case 'content-changed':
        router.push({
          pathname: APP_URL.MY_LIBRARY,
          query: { page: 'detail', id: item.notification.metadata.contentId },
        })

        break
    }
  }
  const handleDeleteNotification = () => {
    const id = selectedItem?.id
    onDeleteNotification(id)
    setIsModalVisible(false)
  }
  const handleReadAllNotification = () => {
    onReadAllNotification()
  }
  const renderContentMenu = () => {
    return (
      <div className="w-[500px] bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between mt-[10px] p-4 border-b text-lg">
          <span className="font-semibold">Notifications</span>
          <span
            onClick={handleReadAllNotification}
            className="text-[#00aaf2] border border-[#00aaf2] text-sm font-semibold px-3 py-2 rounded-lg cursor-pointer"
          >
            Mark all as read
          </span>
        </div>

        <InfiniteScroll
          dataLength={total || 0}
          next={onFetchMore}
          hasMore={Boolean(hasNextPage)}
          loader={
            isFetchingNextPage ? <div className="text-center">Loading...</div> : null
          }
          height={400}
          className="infinite-scroll w-full"
        >
          {dataSource?.length ? (
            dataSource?.map((item: any, index: number) => {
              const notificationTypes: Record<
                NotificationType,
                () => {
                  title: string | undefined
                  message: string
                  image: any
                  link: string | undefined
                  useImageComponent?: boolean
                }
              > = {
                'content-changed': () => ({
                  title: 'Your purchased voice has been updated!',
                  message: `Your purchased voice <span class='text-higlight'>${item?.notification?.metadata?.title}</span> has been updated. Check out and download the latest version now!`,
                  image: item?.notification?.metadata?.contentImage,
                  link: item?.notification?.redirectUrl,
                  useImageComponent: false,
                }),
                'news-notification': () => ({
                  title: item?.notification?.title,
                  message: item?.notification?.previewMessage,
                  image: LogoDefault,
                  link: item?.notification?.redirectUrl,
                  useImageComponent: true,
                }),
              }
              const notificationData = notificationTypes[
                item?.notification?.type as NotificationType
              ]?.() || {
                title: item?.notification?.title,
                message: item?.notification?.previewMessage,
                image: null,
                link: null,
              }

              return (
                <div
                  key={index}
                  className={`flex items-center p-4 gap-3 border-b hover:bg-[#e1e3e7] cursor-pointer w-full group relative ${activeItemId === item.id && 'bg-[#e1e3e7]'}`}
                  onClick={(e) => handleOnClickNotiItem(item, e)}
                >
                  {notificationData.image &&
                    (notificationData.useImageComponent ? (
                      <Image
                        src={notificationData.image}
                        alt="Notification"
                        className="w-[60px] h-[60px] rounded-[10px] object-cover"
                      />
                    ) : (
                      <img
                        src={notificationData.image}
                        alt="Notification"
                        className="w-[60px] h-[60px] rounded-[10px] object-cover"
                      />
                    ))}

                  <div className="px-1 flex flex-1 items-center justify-between">
                    <div className=" w-[89%] ">
                      <div className="overflow-hidden line-clamp-1 notification__desc text-[#1a1a1a] font-semibold text-sm">
                        {notificationData.title}
                      </div>
                      <div
                        className="pt-1 pb-1 text-sm text-[#313131] notification__desc overflow-hidden line-clamp-3 "
                        dangerouslySetInnerHTML={{
                          __html: addTargetBlankToLinks(
                            unescapeString(notificationData.message || ''),
                          ),
                        }}
                      />
                      <div className="text-xs text-[#6b7280] mt-1">
                        {getTimeAmPm(item?.notification.publicDate)}
                      </div>
                    </div>
                    {!item?.isRead && (
                      <div className="bg-[#00aaf2] w-[7px] h-[7px] rounded-full"></div>
                    )}
                  </div>
                  <div
                    className={`notification__item-more absolute right-[32px] top-[40%] ${
                      activeItemId === item.id ? 'block ' : 'group-hover:block hidden'
                    }`}
                  >
                    <Dropdown
                      menu={{
                        items: getMoreMenu(item),
                      }}
                      trigger={['click']}
                      placement="bottomRight"
                      overlayClassName="notification-dropdown"
                      getPopupContainer={(triggerNode) =>
                        triggerNode.parentNode as HTMLElement
                      }
                      overlayStyle={{
                        position: 'fixed',
                      }}
                      onOpenChange={(open) => {
                        if (open) setActiveItemId(item.id)
                        else setActiveItemId(null)
                      }}
                    >
                      <div
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <MoreIcon />
                      </div>
                    </Dropdown>
                  </div>
                </div>
              )
            })
          ) : (
            <EmptyWrapper message="There are no items" hasButton={false} />
          )}
        </InfiniteScroll>
      </div>
    )
  }
  return (
    <>
      <Dropdown
        open={dropdownOpen}
        onOpenChange={(open) => setDropdownOpen(open)}
        dropdownRender={renderContentMenu}
        trigger={['click']}
        placement="bottomRight"
        overlayStyle={{
          position: 'fixed',
        }}
      >
        <div className="flex items-center justify-center font-semibold h-8 gap-3 rounded-2xl border-[1px] border-solid border-[#e1e3e7] bg-white px-3 cursor-pointer">
          <div className="relative">
            <NotificationIcon />
            {unReadItems && unReadItems >= 1 ? (
              <div className="absolute -top-2 -right-[10px] bg-[#e12828] min-w-[16px] px-1 py-[2px] rounded-[30px] h-4 flex items-center justify-center text-white text-[10px] font-semibold">
                +{unReadItems}
              </div>
            ) : null}
          </div>

          <span>Notifications</span>
        </div>
      </Dropdown>

      {isModalVisible && (
        <ModalConfirm
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title={
            <div
              dangerouslySetInnerHTML={{
                __html: `<span class='font-normal'>Do you want to remove</span> ${getNotificationTitle(selectedItem.notification)}`,
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

export default Notifications
