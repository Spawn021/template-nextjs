'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { RootState } from '@/store/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import useCartList from '@/hooks/useCartList'
import useDrawerCart from '@/hooks/useDrawerCart'
import EditIcon from '@/resources/svg/EditIcon'
import { useRouter } from '@/i18n/routing'
import Item from '@/components/Checkout/Item'
import { Form } from 'antd'
import { APP_URL, PAYMENT_METHOD, PROFILE_SECTION, STATUS_CONTENT } from '@/constants'
import PaymentMethod from '@/components/Checkout/PaymentMethod'
import useProfile from '@/hooks/useProfile'
import CheckoutInfo from '@/components/Checkout/CheckoutInfo'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import { useShowMessage } from '@/components/Message'
import { CURRENCY_PAYMENT, TYPE_MODAL_ERROR_CHECKOUT } from '@/lib/utils'
import { InfoPayment } from '@/types/Home'
import useCardPayment from '@/hooks/useCardPayment'
import {
  setAddToCart,
  setListCheckout,
  setListItemUnavailable,
} from '@/store/redux/slices/contentSlice'
import { useQueryClient } from '@tanstack/react-query'
import ModalLoading from '@/components/Modal/ModalLoading'
import ModalNotice from '@/components/Modal/ModalNotice'
function Checkout() {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user } = useSelector((state: RootState) => state.auth)
  const { listCheckout, listItemUnavailable } = useSelector(
    (state: RootState) => state.content,
  )
  const { data } = useCartList(user?.accessToken)
  const { onOpen } = useDrawerCart()
  const { fetchUserProfile } = useProfile(user?.id)
  const { data: infoUser } = fetchUserProfile
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const showMessage = useShowMessage()
  const { getClientSecretConfirm, purchaseTransactionFree, checkTransactionPuchased } =
    useCardPayment()
  const [modalInfo, setModalInfo] = useState({
    typeModal: '',
    visible: false,
  })
  const [dataForm, setDataForm] = useState({
    paymentMethod: PAYMENT_METHOD.CREDIT_CART,
    number: '',
    name: '',
    email: user.email,
  })
  useEffect(() => {
    if (!user?.accessToken) {
      router.push('/')
    }
  }, [user?.accessToken])

  const checkoutlist = data?.filter((item: any) =>
    listCheckout?.includes(item.content.id),
  )

  const totalPrice = useMemo(() => {
    return checkoutlist?.reduce((acc: number, item: any) => {
      return acc + item.content.unitPrice
    }, 0)
  }, [checkoutlist])

  useEffect(() => {
    dispatch(setListItemUnavailable([]))
  }, [])

  useEffect(() => {
    const currentFormValues = form.getFieldsValue()
    setDataForm((prev) => ({
      ...prev,
      ...currentFormValues,
    }))
  }, [form.getFieldValue('paymentMethod')])

  const onValuesChange = (changedValues: any, allValues: any) => {
    setDataForm(allValues)
  }
  const onDeleteCart = () => {
    const newListCart = data?.filter(
      (item: any) => !listCheckout?.includes(item.content.id),
    )
    queryClient.invalidateQueries({ queryKey: ['cartList'] })
    dispatch(setAddToCart(newListCart))
  }
  const onPaymentSuccess = () => {
    onDeleteCart()
    showMessage(
      'success',
      'Payment Successful. You can view your purchased items in My library',
    )
    dispatch(setListCheckout([]))
    setLoading(false)
    router.push({
      pathname: APP_URL.MY_LIBRARY,
    })
  }
  const onPaymentFail = () => {
    setLoading(false)
    showMessage('error', 'Payment Failed')
  }

  const onFinish = (values: any) => {
    const { paymentMethod, number, name, email } = values
    const contents = checkoutlist?.map((item: any) => ({
      id: item?.content.id,
      unitPrice: item?.content.unitPrice,
    }))
    setLoading(true)
    if (paymentMethod === PAYMENT_METHOD.CREDIT_CART) {
      if (!(infoUser?.listCardNumber?.length > 0)) {
        setLoading(false)
        return showMessage('error', 'Please provide a payment method to process')
      }
    }
    if (!stripe || !elements) {
      return
    }
    setTimeout(async () => {
      const data: InfoPayment = {
        currency: CURRENCY_PAYMENT,
        contents,
        paymentMethod:
          paymentMethod === PAYMENT_METHOD.CREDIT_CART
            ? PAYMENT_METHOD.CREDIT_CART
            : PAYMENT_METHOD.KONBINI,
      }
      const response = await getClientSecretConfirm(data)
      const { paymentClientSecret, paymentId, purchaseTransactionId } =
        response?.data.data || {}
      const { errorCode, extraInfo } = response?.data.meta || {}

      const lstErrorCode = errorCode?.split(',')
      if (lstErrorCode?.includes('E33')) {
        queryClient.invalidateQueries({ queryKey: ['cartList'] })
        setTimeout(() => {
          setLoading(false)
          return setModalInfo({
            visible: true,
            typeModal: TYPE_MODAL_ERROR_CHECKOUT.CHANGE_PRICE,
          })
        }, 100)
        return
      }

      if (lstErrorCode?.includes('E34')) {
        setLoading(false)
        dispatch(setListItemUnavailable(extraInfo?.diffContent))
        return setModalInfo({
          visible: true,
          typeModal: TYPE_MODAL_ERROR_CHECKOUT.ITEM_UNAVAIBLE,
        })
      }
      if (totalPrice === 0) {
        setTimeout(() => {
          purchaseTransactionFree(
            { currency: CURRENCY_PAYMENT, contents },
            onPaymentSuccess,
            onPaymentFail,
          )
        }, 1000)
        return
      }
      try {
        if (paymentMethod === PAYMENT_METHOD.CREDIT_CART) {
          const { error, paymentIntent } = await stripe.confirmCardPayment(
            paymentClientSecret,
            {
              return_url: `${window.location.origin}/${APP_URL.CHECKOUT}`,
            },
          )
          if (error?.type === 'card_error' || error?.type === 'validation_error') {
            showMessage('error', 'Your payment was unsuccessful. Please try again later.')
            router.push(APP_URL.CHECKOUT)
          }
          if (paymentIntent) {
            const checkStatusTransaction = setInterval(async () => {
              const status = await checkTransactionPuchased(paymentId)
              if (status) {
                clearInterval(checkStatusTransaction)
                onPaymentSuccess()
              }
            }, 500)
          }
        }
        if (paymentMethod === PAYMENT_METHOD.KONBINI) {
          const { error, paymentIntent } = await stripe.confirmKonbiniPayment(
            paymentClientSecret,
            {
              payment_method: {
                billing_details: {
                  name,
                  email,
                },
              },
              payment_method_options: {
                konbini: {
                  confirmation_number: number,
                },
              },
            },
          )
          if (error?.type === 'card_error' || error?.type === 'validation_error') {
            showMessage('error', 'Your payment was unsuccessful. Please try again later.')
            router.push(APP_URL.CHECKOUT)
          }
          if (paymentIntent) {
            onDeleteCart()
            router.push({
              pathname: APP_URL.PROFILE,
              query: { tab: PROFILE_SECTION.TRANSACTION_HISTORY },
            })
          }
        }
      } catch (error) {
        onPaymentFail()
      }
    }, 1000)
  }
  const handleCloseModal = () => {
    queryClient.invalidateQueries({ queryKey: ['cartList'] })
    if (modalInfo?.typeModal === TYPE_MODAL_ERROR_CHECKOUT.ITEM_UNAVAIBLE) {
      router.push({
        pathname: APP_URL.CHECKOUT,
      })
    }
    setModalInfo({ ...modalInfo, visible: false })
  }
  const handleContinueConfirm = () => {
    handleCloseModal()
    onFinish(dataForm)
  }
  return (
    <div className="px-10 py-[14px]">
      <div className="text-[28px] font-bold py-6 ">Check out</div>
      <div className="flex justify-between">
        <div className="w-1/2">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-semibold">
              Purchasing items
              <span> ({checkoutlist?.length || 0})</span>
            </div>
            <button
              onClick={onOpen}
              className="text-[#00aaf2] font-semibold border flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm"
            >
              <EditIcon />
              <span className="text-[#030712]">Edit your cart</span>
            </button>
          </div>
          <div className="flex flex-col gap-5 mt-5 list-purchase">
            {checkoutlist?.map((item: any, index: number) => (
              <div key={index}>
                <Item data={item} listItemUnavailable={listItemUnavailable} />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5"></div>
        </div>
        <div className="w-1/2 ">
          <div className="border ml-5 rounded-[12px] p-5">
            <Form
              form={form}
              onValuesChange={onValuesChange}
              onFinish={onFinish}
              initialValues={dataForm}
              layout="vertical"
              requiredMark={false}
            >
              <PaymentMethod
                dataForm={dataForm}
                infoUser={infoUser}
                disabled={totalPrice === 0}
              />
              <CheckoutInfo
                totalSelectedItems={checkoutlist?.length}
                totalPrice={totalPrice}
                paymentMethod={dataForm.paymentMethod}
              />
            </Form>
          </div>
        </div>
      </div>
      {modalInfo.visible && (
        <ModalNotice
          modalInfo={modalInfo}
          onCoutinueConfirm={handleContinueConfirm}
          totalPrice={totalPrice}
          onClose={handleCloseModal}
        />
      )}
      <ModalLoading
        visible={loading}
        title={'Payment processing...'}
        subtitle={
          'We are processing your payment. Do not refresh the page or navigate away while this is happening. '
        }
      />
    </div>
  )
}

export default Checkout
