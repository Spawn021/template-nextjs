'use client'
import React, { useEffect, useState } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button } from 'antd'
import { Spin } from 'antd'
import { useShowMessage } from '@/components/Message'
import useCardPayment from '@/hooks/useCardPayment'
import { useQueryClient } from '@tanstack/react-query'
import useModal from '@/hooks/useModal'
import { on } from 'events'

function CheckoutForm({ setIsEditCard }: { setIsEditCard?: (value: boolean) => void }) {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(true)
  const { onClose } = useModal()
  const elements = useElements()
  const stripe = useStripe()
  const showMessage = useShowMessage()
  const { onUpdateCard } = useCardPayment()
  useEffect(() => {
    if (elements) {
      const element = elements.getElement('payment')
      if (element) {
        element.on('ready', () => {
          setLoading(false)
        })
      }
    }
  }, [elements])
  const handleUpdate = (paymentMethodId: string) => {
    const params = { paymentMethodId }
    onUpdateCard(params, {
      onSuccess: () => {
        onClose()
        setIsEditCard && setIsEditCard(false)
      },
    })
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return null
    }

    const { setupIntent, error } = await stripe.confirmSetup({
      elements,

      redirect: 'if_required',
    })
    if (error) {
      console.log(error)
    } else {
      showMessage('success', 'Add card successfully')
      queryClient.invalidateQueries({ queryKey: ['card-setup'] })
      handleUpdate(String(setupIntent?.payment_method))
    }
  }
  return (
    <div className="bg-[#f3f4f6] p-4 rounded-lg -mt-2 ">
      {loading && (
        <div className="w-full flex justify-center mb-3">
          <Spin size="large" />
        </div>
      )}
      <div onSubmit={handleSubmit}>
        <PaymentElement
          options={{
            terms: {
              card: 'always',
            },
          }}
        />
        {!loading && (
          <>
            <div className="flex justify-end gap-4 items-center mt-5">
              <Button
                size="large"
                onClick={() => {
                  onClose()
                  setIsEditCard && setIsEditCard(false)
                }}
                disabled={!stripe}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                disabled={!stripe}
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CheckoutForm
