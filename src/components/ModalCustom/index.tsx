'use client'
import { TYPE_MODAL } from '@/constants'
import useModal from '@/hooks/useModal'
import { getContentModal } from '@/lib/utils'
import { RootState } from '@/store/redux/store'
import { Modal } from 'antd'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

function ModalCustom() {
  const { open, typeModal } = useSelector((state: RootState) => state.app)

  const { onClose } = useModal()
  const modalCantClose = [
    TYPE_MODAL.VERIFY_REGISTER_MODAL,
    TYPE_MODAL.VERIFY_REGISTER_SUCCESS_MODAL,
  ]
  const modalHasCloseX = [
    TYPE_MODAL.FORGET_MODAL,
    TYPE_MODAL.RESET_PASSWORD,
    TYPE_MODAL.VERIFY_EMAIL_NEW,
    TYPE_MODAL.CHANGE_EMAIL,
    TYPE_MODAL.LOGIN_HISTORY,
    TYPE_MODAL.ADD_EMAIL,
  ]
  const {
    title,
    subtitle,
    content,
  }: { title: string; subtitle: string; content: React.ReactNode } = useMemo(() => {
    return getContentModal({
      typeModal,
    })
  }, [typeModal])
  return (
    <>
      <Modal
        open={open}
        title={
          <div className="text-xl mb-6">
            <h3>{title ? title : 'common'}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
        }
        onCancel={onClose}
        maskClosable={modalCantClose.indexOf(typeModal) !== -1 ? false : true}
        closeIcon={modalHasCloseX.indexOf(typeModal) === -1 ? true : false}
        footer={null}
        destroyOnClose={true}
        className="modal-custom"
      >
        {content}
      </Modal>
    </>
  )
}

export default ModalCustom
