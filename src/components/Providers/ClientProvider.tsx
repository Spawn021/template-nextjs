'use client'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store, persistor } from '@/store/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { queryClient } from '@/lib/queryClient'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Provider store={store}>
          <ToastContainer position="top-right" autoClose={5000} />
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
