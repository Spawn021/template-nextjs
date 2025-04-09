import { useShowMessage } from '@/components/Message'
import ModalConfirm from '@/components/Modal/ModalConfirm'
import useCardPayment from '@/hooks/useCardPayment'
import CardIcon from '@/resources/svg/CardIcon'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
type props = {
  isModalVisible: boolean
  onClose: () => void
}

function ModalDeleteCard({ isModalVisible, onClose }: props) {
  const showMessage = useShowMessage()
  const queryClient = useQueryClient()
  const { onDeleteCard } = useCardPayment()
  const onDelete = () => {
    onDeleteCard(undefined, {
      onSuccess() {
        showMessage('success', 'Delete card successfully')
        queryClient.invalidateQueries({ queryKey: ['userProfile'] })
        onClose()
      },
      onError(error) {
        showMessage('error', 'Failed to remove the credit card')
      },
    })
    onClose()
  }
  return (
    <ModalConfirm
      visible={isModalVisible}
      title="Remove credit card"
      subtitle="Are you sure you want to remove the credit card?"
      icon={<CardIcon />}
      primaryButton={{ text: 'Yes', onClick: onDelete }}
      secondaryButton={{ text: 'No', onClick: onClose }}
      onClose={onClose}
    >
      ModalDeleteCard
    </ModalConfirm>
  )
}

export default ModalDeleteCard
