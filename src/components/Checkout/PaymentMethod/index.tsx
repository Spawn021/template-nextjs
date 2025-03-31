import React, { useState } from 'react'
import classNames from 'classnames'
import { Button, Drawer, Form, Input, Radio } from 'antd'
import { PAYMENT_METHOD } from '@/constants'
import Visa from '@/resources/svg/visa.svg'
import EditIcon from '@/resources/svg/EditIcon'
import FamilyMart from '@/resources/images/familyMart.png'
import MiniStop from '@/resources/images/miniStop.png'
import Secomart from '@/resources/images/secomart.png'
import Lawson from '@/resources/images/lawson.png'
import IconDanger from '@/resources/svg/icon-danger.svg'
import Image from 'next/image'
import CardPayment from '@/components/Checkout/CardPayment'
type Props = {
  dataForm: any
  infoUser: any
  disabled: boolean
}
const listSupportedKobini = [FamilyMart, MiniStop, Secomart, Lawson]

function PaymentMethod({ dataForm, infoUser, disabled }: Props) {
  const { listCardNumber } = infoUser || ''
  const [isEditCard, setIsEditCard] = useState(false)
  const handleKeyDown = (e: any) => {
    if (
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'].indexOf(e.key) ===
      -1
    ) {
      e.preventDefault()
    }
  }
  return (
    <div className="payment-method">
      <div className="text-2xl mb-4 font-semibold">Payment method</div>
      <Form.Item name="paymentMethod" className="mb-4">
        <Radio.Group>
          <Radio
            disabled={disabled}
            value={PAYMENT_METHOD.CREDIT_CART}
            className={classNames({ disabled: disabled })}
          >
            Credit card
          </Radio>
          <Radio
            disabled={disabled}
            value={PAYMENT_METHOD.KONBINI}
            className={classNames({ disabled: disabled })}
          >
            Konbini
          </Radio>
        </Radio.Group>
      </Form.Item>
      {dataForm?.paymentMethod === PAYMENT_METHOD.CREDIT_CART && !disabled && (
        <>
          {listCardNumber?.length > 0 ? (
            <>
              <div>Select payment account</div>
              <div className="flex justify-between items-center rounded-lg p-4 bg-[#f3f4f6]">
                <Radio checked value={PAYMENT_METHOD.KONBINI}>
                  <div className="flex items-center gap-1">
                    <Image src={Visa} alt="visa" className="w-12 h-8" />
                    ****{listCardNumber}
                  </div>
                </Radio>
                <Button
                  onClick={() => setIsEditCard(true)}
                  disabled={disabled}
                  className={classNames({ disabled: disabled })}
                >
                  <EditIcon />
                  <span className="font-semibold">Edit my card</span>
                </Button>
              </div>
              {isEditCard && (
                <div className="relative">
                  <CardPayment setIsEditCard={setIsEditCard} />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-4">Select payment account</div>
              <CardPayment />
            </>
          )}
        </>
      )}
      {dataForm?.paymentMethod === PAYMENT_METHOD.KONBINI && (
        <div className="method-konbini">
          <div className="mb-4">Supported Konbini</div>
          <div className="flex gap-3 items-center">
            {listSupportedKobini.map((item, index) => (
              <Image key={index} src={item} alt="konbini supported" />
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3">
            <Form.Item
              label={
                <span className="font-semibold">
                  Name <span className="text-red-500">*</span>
                </span>
              }
              name="name"
              className="mb-0"
              required
              rules={[{ required: true, message: 'Name is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <strong>
                  <span className="font-semibold">
                    Email <span className="text-red-500">*</span>
                  </span>
                </strong>
              }
              name="email"
              className="mb-0"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Email is wrong format' },
              ]}
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <strong>
                  <span className="font-semibold">
                    Phone Number <span className="text-red-500">*</span>
                  </span>
                </strong>
              }
              name="number"
              className="mb-0"
              required
              rules={[
                { required: true, message: 'Phone Number is required' },
                {
                  validator: async (_, value) => {
                    if (value === '0000000000' || value === '00000000000') {
                      return Promise.reject(new Error('Phone Number is wrong format'))
                    }
                  },
                },
              ]}
            >
              <Input minLength={10} maxLength={11} onKeyDown={handleKeyDown} />
            </Form.Item>
            <div className="flex gap-3 px-4 py-2 rounded-lg bg-[#e128281a] text-xs border">
              <Image src={IconDanger} alt="icon danger" />
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    'The minimum charge amount is 120 JPY </br> We will send other neccessary information in \"Purchase summary\" via your email. Please make payment within <span class=\"txt-danger\">3</span> days (by 23:59 JST two days after order)',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentMethod
