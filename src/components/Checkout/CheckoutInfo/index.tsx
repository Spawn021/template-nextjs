import {
  MAX_PRICE_CREDIT_CARD,
  MAX_PRICE_KONBINI,
  MIN_PRICE_CREDIT_CARD,
  MIN_PRICE_KONBINI,
} from '@/constants'
import { compareTwoNumber } from '@/lib/utils'
import { Button } from 'antd'

function CheckoutInfo({
  totalSelectedItems,
  totalPrice,
  paymentMethod,
}: {
  totalSelectedItems: number
  totalPrice: number
  paymentMethod: string
}) {
  const isKonbini = paymentMethod === 'konbini'
  const isCreditCard = paymentMethod === 'credit-card'
  const isMinAmountKonbini = compareTwoNumber(MIN_PRICE_KONBINI, totalPrice || 0)
  const isMaxAmountKobini = compareTwoNumber(totalPrice || 0, MAX_PRICE_KONBINI)

  const isMinAmountCreditCard = compareTwoNumber(MIN_PRICE_CREDIT_CARD, totalPrice || 0)
  const isMaxAmountCreditCard = compareTwoNumber(totalPrice || 0, MAX_PRICE_CREDIT_CARD)
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <div>Selected items:</div>
        <div>{totalSelectedItems}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-base font-semibold ">Total:</div>
        <div className="flex flex-col">
          <div className="text-base font-bold text-[#e12828] flex justify-end">{`${totalPrice} 円`}</div>
          {isKonbini && <div className="flex justify-end">{`(Tax including)`}</div>}
          {isKonbini && (
            <>
              {isMinAmountKonbini && (
                <div className="text-xs text-[#e12828] pt-4 text-right">{`Total amount can not less than ${MIN_PRICE_KONBINI} JPY`}</div>
              )}
              {isMaxAmountKobini && (
                <div className="text-xs text-[#e12828] pt-4 text-right">{`Total amount must not exceed ${MAX_PRICE_KONBINI.toLocaleString()} JPY`}</div>
              )}
            </>
          )}
          {totalPrice !== 0 && isCreditCard && (
            <>
              {isMinAmountCreditCard && (
                <div className="text-xs text-[#e12828] pt-4 text-right">{`Total amount can not less than ${MIN_PRICE_CREDIT_CARD} JPY`}</div>
              )}
              {isMaxAmountCreditCard && (
                <div className="text-xs text-[#e12828] pt-4 text-right">{`Total amount must not exceed ${MAX_PRICE_CREDIT_CARD.toLocaleString()} JPY`}</div>
              )}
            </>
          )}
        </div>
      </div>
      {(isKonbini && (isMinAmountKonbini || isMaxAmountKobini)) ||
      (totalPrice !== 0 &&
        isCreditCard &&
        (isMinAmountCreditCard || isMaxAmountCreditCard)) ||
      totalSelectedItems === 0 ? (
        <Button className="w-full mt-4" size="large" disabled>
          {isCreditCard ? 'Pay' : 'Confirm'}
        </Button>
      ) : (
        <Button className="w-full mt-4" type="primary" size="large" htmlType="submit">
          {isCreditCard ? 'Pay' : 'Confirm'}
        </Button>
      )}
    </div>
  )
}

export default CheckoutInfo
