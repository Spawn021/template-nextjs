'use client'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(String(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY))

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <Elements stripe={stripePromise}>{children}</Elements>
}
