import { useState } from 'react'

import { Modal } from 'antd'
import ContentModal from '@/components/ModalDownload/ContentModal'

type Prop = {
  visible: boolean
  contentDetail?: any
  onCancel: () => void
  onDownloadMulti?: any
  onDownloadSingleFile?: any
}

const ModalDownload = ({
  visible,
  contentDetail,
  onCancel,
  onDownloadMulti,
  onDownloadSingleFile,
}: Prop) => {
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [checkAll, setCheckAll] = useState(false)

  const onCancelModal = () => {
    onCancel && onCancel()
    setCheckAll(false)
    setCheckedList([])
  }

  return (
    <Modal
      wrapClassName="modal-download"
      open={visible}
      footer={false}
      onCancel={onCancelModal}
      width={800}
      closable={true}
      centered
      maskClosable={false}
    >
      <ContentModal
        onDownloadMulti={onDownloadMulti}
        contentDetail={contentDetail}
        checkedList={checkedList}
        checkAll={checkAll}
        setCheckedList={setCheckedList}
        setCheckAll={setCheckAll}
        onDownloadSingleFile={onDownloadSingleFile}
      />
    </Modal>
  )
}

export default ModalDownload
