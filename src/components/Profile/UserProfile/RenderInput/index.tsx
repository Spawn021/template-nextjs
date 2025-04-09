import React, { use, useEffect, useState } from 'react'
import { Input } from 'antd'
import useProfile from '@/hooks/useProfile'
import { RootState } from '@/store/redux/store'
import { useSelector } from 'react-redux'
import { useShowMessage } from '@/components/Message'
type Props = {
  name: string
  data: string
  show?: any
  disabled?: boolean
  onDelete?: () => void
  onClose: () => void
  onEdit?: () => void
}

function RenderInput({ name, disabled, onEdit, data, show, onClose, onDelete }: Props) {
  const [newValue, setNewValue] = useState('')
  const { id } = useSelector((state: RootState) => state.auth.user)
  const { onUpdateProfile } = useProfile(id)
  const showMessage = useShowMessage()
  const handleKeyDown = (e: any) => {
    if (
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'].indexOf(e.key) ===
      -1
    ) {
      e.preventDefault()
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value)
  }
  const onCloseInput = () => {
    setNewValue(data)
    onClose()
  }
  const onSave = () => {
    const key = name === 'phone umber' ? 'phoneNumber' : name
    const params = {
      [key]: newValue,
    }
    onUpdateProfile(params, {
      onSuccess: () => {
        showMessage('success', `Successfully updated ${name}`)
        onClose()
      },
    })
  }
  useEffect(() => {
    setNewValue(data)
  }, [data])
  return (
    <div>
      <div className="mb-[6px] text-sm font-semibold capitalize">{name}</div>
      <div className="w-full input-profile flex items-center justify-between gap-4">
        {name === 'Phone Number' ? (
          <Input
            name={name}
            value={newValue}
            minLength={10}
            maxLength={15}
            placeholder="Enter phone number"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            disabled={disabled}
          />
        ) : (
          <Input
            name={name}
            value={newValue}
            onChange={handleChange}
            placeholder={`Enter ${name}`}
            disabled={disabled}
            autoComplete="off"
          />
        )}
        <div>
          {show?.active && show?.field === name ? (
            <div className="flex gap-4 items-center">
              <span
                className="font-semibold text-base text-[#6b7280] cursor-pointer "
                onClick={onCloseInput}
              >
                Discard
              </span>
              <span
                className="font-semibold text-base text-[#00aaf2] cursor-pointer "
                onClick={onSave}
              >
                Save
              </span>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              {onDelete && (
                <span
                  className="font-semibold text-base text-[#d92d20] cursor-pointer"
                  onClick={onDelete}
                >
                  Remove
                </span>
              )}
              <span
                className="text-base font-semibold text-[#00aaf2] cursor-pointer"
                onClick={onEdit}
              >
                Edit
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RenderInput
