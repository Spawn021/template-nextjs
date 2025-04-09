import React from 'react'
import useCountdown from '@/hooks/useCountDown'
type props = {
  onResend: () => void
}
function ReSendBtn({ onResend }: props) {
  const { count, setCount } = useCountdown(60)
  const reset = () => {
    setCount(60)
    onResend()
  }
  return (
    <div>
      {count > 0 ? (
        <span className="text-[#00aaf2]">Resend in {count} seconds</span>
      ) : (
        <button onClick={reset} className="text-[#00aaf2]">
          Resend Code
        </button>
      )}
    </div>
  )
}

export default ReSendBtn
