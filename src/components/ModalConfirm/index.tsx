import { Button, Modal } from 'antd'

type PropModal = {
  visible: boolean
  title?: React.ReactNode
  subtitle?: React.ReactNode
  icon?: React.ReactNode
  primaryButton?: {
    text: string
    onClick: () => void
  }
  secondaryButton?: {
    text: string
    onClick: () => void
  }
  onClose?: () => void
  children?: React.ReactNode
}

const ModalConfirm = ({
  visible,
  title,
  subtitle,
  icon,
  primaryButton,
  secondaryButton,
  onClose,
}: PropModal) => {
  return (
    <Modal
      className="modal-confirm width-[472px]"
      open={visible}
      footer={
        primaryButton || secondaryButton ? (
          <div className="modal-footer">
            {secondaryButton && (
              <Button className="button-secondary" onClick={secondaryButton.onClick}>
                {secondaryButton.text}
              </Button>
            )}
            {primaryButton && (
              <Button
                className="button-primary"
                type="primary"
                onClick={primaryButton.onClick}
              >
                {primaryButton.text}
              </Button>
            )}
          </div>
        ) : null
      }
      onCancel={onClose}
      destroyOnClose
      zIndex={10000}
    >
      <div className="content-modal">
        <div className="mb-4">{icon && <div className="modal-icon">{icon}</div>}</div>

        <div className="modal-body">
          {title && (
            <div className="text-xl  font-semibold mb-6 text-[#030712]">{title}</div>
          )}
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </div>
      </div>
    </Modal>
  )
}

export default ModalConfirm
