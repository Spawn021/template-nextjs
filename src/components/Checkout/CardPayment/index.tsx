'use client'
import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import useCardPayment from '@/hooks/useCardPayment'
import CheckoutForm from '@/components/Checkout/CardPayment/CheckoutForm'

const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

const loadStripeAsync = () =>
  wait(3000).then(() =>
    import('@stripe/stripe-js')
      .then((module) => module.loadStripe)
      .then((loadStripe) =>
        loadStripe(String(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)),
      ),
  )
function CardPayment({ setIsEditCard }: { setIsEditCard?: (value: boolean) => void }) {
  const { useFetchSecretKeyForSetup } = useCardPayment()
  const { data: clientSecret } = useFetchSecretKeyForSetup
  const option = {
    clientSecret: clientSecret,
  }
  return (
    <>
      {option.clientSecret ? (
        <Elements stripe={loadStripeAsync()} options={option}>
          <CheckoutForm setIsEditCard={setIsEditCard} />
        </Elements>
      ) : null}
    </>
  )
}

export default CardPayment
