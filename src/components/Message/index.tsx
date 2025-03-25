'use client'

import { App } from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'

export function useShowMessage() {
  const { message } = App.useApp()

  const showMessage = (
    msgType: 'success' | 'error' | 'warning' | 'info',
    msgContent: string,
  ) => {
    if (typeof document === 'undefined') {
      return
    }

    if (msgContent) {
      message[msgType]({
        content: msgContent,
        duration: 3,
        icon: <CustomIcon type={msgType} />,
      })
    }
  }

  return showMessage
}

const CustomIcon = ({ type }: { type: 'success' | 'error' | 'warning' | 'info' }) => {
  const iconMap = {
    success: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    error: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
    warning: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
    info: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
  }
  return iconMap[type] || null
}

export default function MessageProvider({ children }: { children: React.ReactNode }) {
  return <App>{children}</App>
}
