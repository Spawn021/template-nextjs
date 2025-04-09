import React, { useState } from 'react'
import RenderContent from '@/components/Profile/UserProfile/RenderContent'
import RenderInput from '@/components/Profile/UserProfile/RenderInput'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/redux/store'
import useProfile from '@/hooks/useProfile'
import { setTypeModal } from '@/store/redux/slices/appSlice'
import { TYPE_MODAL } from '@/constants'
import useModal from '@/hooks/useModal'
import { setEmailSending } from '@/store/redux/slices/authSlice'
import ModalDeleteCard from '@/components/ModalDeleteCard'

function UserProfile() {
  const { id, provider } = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()
  const { onVisible } = useModal()
  const [show, setShow] = useState({
    active: false,
    field: '',
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { fetchUserProfile, onRequestVerifyCode } = useProfile(id)
  const { data } = fetchUserProfile
  const handleChangeProfile = (field: string) => {
    setShow({
      active: true,
      field,
    })
  }
  const handleChangeEmail = () => {
    const { email } = data

    if (email) {
      onRequestVerifyCode(undefined, {
        onSuccess() {
          dispatch(setTypeModal(TYPE_MODAL.VERIFY_EMAIL_OLD))
          onVisible()
          dispatch(setEmailSending(email))
        },
      })
    }
  }
  const handleChangePassword = () => {
    dispatch(setTypeModal(TYPE_MODAL.CHANGE_PASSWORD_PROFILE))
    onVisible()
  }

  const onCancel = () => {
    setShow({ active: false, field: '' })
  }
  const handleCreateCard = () => {
    if (data?.listCardNumber && data?.listCardNumber[0]) {
      dispatch(setTypeModal(TYPE_MODAL.EDIT_CARD_PAYMENT))
    } else {
      dispatch(setTypeModal(TYPE_MODAL.ADD_CARD_PAYMENT))
    }
    onVisible()
  }
  const handleDelete = () => {
    setIsModalVisible(true)
  }
  return (
    <>
      <h2 className="font-semibold text-xl mb-2">My Profile</h2>
      <RenderContent
        title="Sign up method"
        description="This email address is associated with your Echo Canvas account."
        provider={provider}
        isMethod={true}
      >
        <div className="flex gap-3 flex-col">
          <RenderInput
            name="email address"
            disabled={true}
            data={data?.email}
            onEdit={handleChangeEmail}
            onClose={onCancel}
          />
          <RenderInput
            name="password"
            data={'****'}
            onClose={onCancel}
            onEdit={handleChangePassword}
            disabled={!(show?.active && show?.field === 'password')}
          />
        </div>
      </RenderContent>
      <RenderContent
        title="Other Information"
        description="Manage your personal details."
        provider={provider}
      >
        <div className="flex gap-3 flex-col">
          <RenderInput
            name="name"
            onEdit={() => handleChangeProfile('name')}
            show={show}
            onClose={onCancel}
            data={data?.name}
            disabled={!(show?.active && show?.field === 'name')}
          />
          <RenderInput
            name="furigana"
            onEdit={() => handleChangeProfile('furigana')}
            show={show}
            onClose={onCancel}
            data={data?.furigana}
            disabled={!(show?.active && show?.field === 'furigana')}
          />
          <RenderInput
            name="phone number"
            onEdit={() => handleChangeProfile('phone number')}
            show={show}
            onClose={onCancel}
            data={data?.phoneNumber}
            disabled={!(show?.active && show?.field === 'phone number')}
          />
        </div>
      </RenderContent>
      <RenderContent
        title="Credit card"
        description="Update your saved credit card details for faster and secure payments."
        provider={provider}
      >
        {data?.listCardNumber && data?.listCardNumber[0] ? (
          <RenderInput
            name="card_number"
            onClose={() => {}}
            data={`****${data?.listCardNumber[0]}`}
            onEdit={handleCreateCard}
            onDelete={handleDelete}
            disabled={true}
          />
        ) : (
          <span
            className="text-base font-semibold text-[#00aaf2] cursor-pointer"
            onClick={handleCreateCard}
          >
            Add
          </span>
        )}
      </RenderContent>
      <RenderContent
        title="Login history"
        description="View your login history to EC Platform"
        provider={provider}
      >
        data
      </RenderContent>
      <ModalDeleteCard
        isModalVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false)
        }}
      />
    </>
  )
}

export default UserProfile
