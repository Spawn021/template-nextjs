import { Empty } from 'antd'
import NoDataIcon from '@/resources/svg/NoDataVoice'

export default function EmptyVoice({ message }: { message: string }) {
  return (
    <div className="empty-wrapper">
      <Empty
        image={<NoDataIcon />}
        description={
          <div>
            <b>No result found</b>
            <p className="message" dangerouslySetInnerHTML={{ __html: message }}></p>
          </div>
        }
      />
    </div>
  )
}
