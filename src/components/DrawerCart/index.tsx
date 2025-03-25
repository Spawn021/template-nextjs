import React, { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/redux/store'
import { Drawer } from 'antd'

import ModalConfirm from '@/components/ModalConfirm'
import CloseIcon from '@/resources/svg/CloseIcon'
import { Checkbox } from 'antd'
import Item from '@/components/DrawerCart/Item'
import type { CheckboxProps } from 'antd'
import { useDeleteCart } from '@/hooks/useDeleteCart'
import EmptyWrapper from '@/components/Empty/EmptyWrapper'
import PackageIcon from '@/resources/svg/PackageIcon'
import { setAddToCart } from '@/store/redux/slices/contentSlice'

function DrawerCart({
  open,
  onClose,
  listCart,
}: {
  open: boolean
  onClose: () => void
  listCart: any
}) {
  const { user } = useSelector((state: RootState) => state.auth)
  const queryClient = useQueryClient()
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [isShowModal, setIsShowModal] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    if (listCart && listCart.length > 0) {
      setCheckedList(listCart.map((item: any) => item?.content))
    } else {
      setCheckedList([])
    }
  }, [listCart])
  const checkAll = checkedList?.length === listCart?.length
  const indeterminate = checkedList?.length > 0 && checkedList.length < listCart?.length
  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? listCart.map((item: any) => item?.content) : [])
  }
  const onItemCheck = (id: string, checked: boolean) => {
    setCheckedList((prev) => {
      if (!Array.isArray(prev)) {
        prev = []
      }
      return checked ? [...prev, id] : prev.filter((item) => item !== id)
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
    } else {
      dispatch(setAddToCart([]))
    }
  }
  const handleDeleteItem = (ids: string, idGuest?: string) => {
    const idsArray = [ids]
    if (user?.accessToken) {
      deleteItemCart({ ids: idsArray })
    } else {
      dispatch(
        setAddToCart(listCart.filter((item: any) => item?.content?.id !== idGuest)),
      )
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
                checked={checkAll}
              ></Checkbox>
              <div className="px-2">{`${listCart?.length} アイテム `}</div>
            </div>
            <button onClick={showModalDeleteCart} disabled={checkedList?.length === 0}>
              すべてクリア
            </button>
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
                {checkedList?.reduce((acc: number, item: any) => acc + item.unitPrice, 0)}{' '}
                円
              </div>
            </div>
            <button className="px-3 py-2 border bg-[#00aaf2] w-full rounded-[8px] text-base text-white hover:bg-[#fff] hover:text-[#00aaf2] hover:border-[#00aaf2] font-semibold">
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
