import { useRouter } from '@/i18n/routing'

import { Button, Modal } from 'antd'
import FeaturedIcon from '@/resources/svg/FeaturedModalIcon'
import { TYPE_MODAL_ERROR_CHECKOUT } from '@/lib/utils'
import PackageIcon from '@/resources/svg/PackageIcon'

type PropModal = {
  t?: any
  totalPrice: any
  modalInfo: {
    visible: boolean
    typeModal: string
  }
  onClose: () => void
  onCoutinueConfirm: any
}

const ModalNotice = ({
  modalInfo,
  totalPrice,
  onClose,
  onCoutinueConfirm,
}: PropModal) => {
  const router = useRouter()

  return (
    <Modal
      open={modalInfo.visible}
      wrapClassName="modal-notice-checkout"
      footer={false}
      onCancel={onClose}
    >
      {modalInfo.typeModal === TYPE_MODAL_ERROR_CHECKOUT.CHANGE_PRICE && (
        <div className="content-modal-price-change">
          <FeaturedIcon />

          <div className="mt-4 text-xl font-semibold">Price updated!</div>
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html:
                'There are changes with the price of items you are purchasing. \nClick "<span class=\'text-highlight\'>Continue</span>" to complete your purchase with the new price',
            }}
          />
          <div className="my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="2"
              viewBox="0 0 500 2"
              fill="none"
              className="divider-line_icon"
            >
              <path d="M0 1H500" stroke="#E1E3E7" strokeDasharray="8 8" />
            </svg>
          </div>
          <div className="text-[#6b7280] text-sm font-normal">
            New Total:
            <span className="flex items-center gap-1">
              <div className="text-[#d92d20] text-xl font-semibold">
                {totalPrice?.toLocaleString()} 円
              </div>
              <div className="text">(Tax including)</div>
            </span>
          </div>
          <Button
            type="primary"
            className="mt-6 w-full"
            size="large"
            onClick={onCoutinueConfirm}
          >
            Continue
          </Button>
        </div>
      )}

      {modalInfo.typeModal === TYPE_MODAL_ERROR_CHECKOUT.ITEM_UNAVAIBLE && (
        <div className="content-modal-unavaible">
          <PackageIcon />
          <div className="mt-4 text-xl font-semibold">Item unavailable!</div>
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html:
                'There are changes with the availability of items you are purchasing.</br>\r\nReview your purchase before checking out',
            }}
          />
          <Button type="primary" className="mt-6 w-full" size="large" onClick={onClose}>
            Back to Shopping cart
          </Button>
        </div>
      )}
    </Modal>
  )
}

export default ModalNotice
