import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/redux/store'
import { Drawer } from 'antd'

import ModalConfirm from '@/components/Modal/ModalConfirm'
import CloseIcon from '@/resources/svg/CloseIcon'
import { Checkbox } from 'antd'
import Item from '@/components/DrawerCart/Item'
import type { CheckboxProps } from 'antd'
import { useDeleteCart } from '@/hooks/useDeleteCart'
import EmptyWrapper from '@/components/Empty/EmptyWrapper'
import PackageIcon from '@/resources/svg/PackageIcon'
import { setAddToCart, setListCheckout } from '@/store/redux/slices/contentSlice'
import { useRouter } from '@/i18n/routing'
import { APP_URL, STATUS_CONTENT } from '@/constants'
import { useQueryClient } from '@tanstack/react-query'

function DrawerCart({
  open,
  onClose,
  listCart,
}: {
  open: boolean
  onClose: () => void
  listCart: any
}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user } = useSelector((state: RootState) => state.auth)
  const [checkedList, setCheckedList] = useState<string[]>([])
  const { listCheckout } = useSelector((state: RootState) => state.content)
  const [isShowModal, setIsShowModal] = useState(false)
  const dispatch = useDispatch()
  const isDisabledCheckAll = useMemo(() => {
    return listCart?.every(
      (item: any) => item?.content?.status === STATUS_CONTENT.OFF_SALE,
    )
  }, [listCart])

  useEffect(() => {
    if (listCart && listCart.length > 0) {
      if (listCheckout && listCheckout.length > 0) {
        setCheckedList(
          listCart
            .filter((item: any) => listCheckout.includes(item.content.id))
            .map((item: any) => item.content)
            .filter((item: any) => item?.status !== STATUS_CONTENT.OFF_SALE),
        )
      } else {
        setCheckedList(listCart.map((item: any) => item?.content))
      }
    } else {
      setCheckedList([])
    }
  }, [listCart, listCheckout])

  const checkAll =
    checkedList?.length ===
    listCart?.filter((item: any) => item.content.status === STATUS_CONTENT.ON_SALE).length
  const indeterminate =
    checkedList?.length > 0 &&
    checkedList.length <
      listCart?.filter((item: any) => item.content.status === STATUS_CONTENT.ON_SALE)
        .length
  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(
      e.target.checked
        ? listCart
            .filter((item: any) => item.content.status === STATUS_CONTENT.ON_SALE)
            .map((item: any) => item?.content)
        : [],
    )
  }
  const onItemCheck = (id: string, checked: boolean) => {
    setCheckedList((prev) => {
      return checked
        ? [
            ...prev,
            listCart.find(
              (item: any) =>
                item.content.id === id && item.content.status === STATUS_CONTENT.ON_SALE,
            ).content,
          ]
        : prev.filter((item: any) => item.id !== id)
    })
  }
  const showModalDeleteCart = () => {
    setIsShowModal(true)
  }
  const handleModalConfirm = () => {
    handleDeleteAll()
    setIsShowModal(false)
  }
  const handleModalCancel = () => {
    setIsShowModal(false)
  }
  const { mutate: deleteItemCart } = useDeleteCart()
  const handleDeleteAll = () => {
    const idsArray = listCart.map((item: any) => item?.id)
    if (user?.accessToken) {
      deleteItemCart({ ids: idsArray })
      dispatch(setListCheckout([]))
      queryClient.invalidateQueries({ queryKey: ['voice'] })
    } else {
      dispatch(setAddToCart([]))
    }
  }

  const handleDeleteItem = (ids: string, idGuest?: string) => {
    const idsArray = [ids]
    if (user?.accessToken) {
      deleteItemCart({ ids: idsArray })
      queryClient.invalidateQueries({ queryKey: ['voice'] })
    } else {
      dispatch(
        setAddToCart(listCart.filter((item: any) => item?.content?.id !== idGuest)),
      )
    }
  }
  const handleCheckout = () => {
    dispatch(setListCheckout(checkedList.map((item: any) => item.id)))
    onClose()
    if (user.accessToken) {
      router.push(APP_URL.CHECKOUT)
    } else {
      router.push({
        pathname: APP_URL.LOGIN,
        query: { redirect: APP_URL.CHECKOUT },
      })
    }
  }
  return (
    <>
      <Drawer
        className="drawer-cart "
        title={
          <div className="flex justify-between">
            <span className="text-[20px] font-semibold">Cart</span>
            <span className="cursor-pointer" onClick={onClose}>
              <CloseIcon />
            </span>
          </div>
        }
        closable={false}
        onClose={onClose}
        open={open}
        width={500}
        placement="right"
      >
        {listCart?.length === 0 ? (
          <EmptyWrapper message={'アイテムはありません。'} />
        ) : (
          <div className="flex justify-between">
            <div className="flex items-center">
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                disabled={isDisabledCheckAll}
                checked={checkAll}
              ></Checkbox>
              <div className="px-2">{`${listCart?.length} アイテム `}</div>
            </div>
            <button onClick={showModalDeleteCart}>すべてクリア</button>
          </div>
        )}
        <div className="flex flex-col my-3 gap-3 w-full">
          {listCart?.map((item: any, index: number) => (
            <Item
              key={index}
              item={item}
              checkedList={checkedList}
              onItemCheck={onItemCheck}
              onItemDelete={handleDeleteItem}
            />
          ))}
        </div>
        {listCart?.length !== 0 && (
          <div className="sticky bottom-0 bg-white border-t pt-3 pb-6">
            <div className="flex justify-between px-3">
              <div className="text-sm">選択されたアイテム：</div>
              <div className="text-sm">{checkedList?.length}</div>
            </div>
            <div className="flex justify-between px-3 mb-4">
              <div className="text-base font-semibold">合計：</div>
              <div className="text-base font-semibold text-[#d92d20]">
                {checkedList?.reduce(
                  (acc: number, item: any) => acc + item?.unitPrice,
                  0,
                )}{' '}
                円
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="px-3 py-2 border bg-[#00aaf2] w-full rounded-[8px] text-base text-white hover:bg-[#fff] hover:text-[#00aaf2] hover:border-[#00aaf2] font-semibold"
            >
              Complete Purchase
            </button>
          </div>
        )}
      </Drawer>
      <ModalConfirm
        visible={isShowModal}
        title={'カート内の商品をすべて削除します。よろしいですか。'}
        icon={<PackageIcon />}
        primaryButton={{
          text: 'OK',
          onClick: handleModalConfirm,
        }}
        secondaryButton={{
          text: 'No',
          onClick: handleModalCancel,
        }}
        onClose={handleModalCancel}
      />
    </>
  )
}

export default DrawerCart
