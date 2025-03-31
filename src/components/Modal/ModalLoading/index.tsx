import { Modal } from 'antd'
import Image from 'next/image'
import LoadingIcon from '@/resources/images/loading.png'

type PropModal = {
  visible: boolean
  title?: string
  subtitle?: string
}
const ModalLoading = ({ visible, title, subtitle }: PropModal) => {
  return (
    <Modal
      open={visible}
      wrapClassName="modal-loading"
      footer={false}
      destroyOnClose
      closable={false}
    >
      <div className="title">{title}</div>
      <Image src={LoadingIcon} alt="loading icon" className="icon-loading" />
      <div className="subtitle">{subtitle}</div>
    </Modal>
  )
}

export default ModalLoading
