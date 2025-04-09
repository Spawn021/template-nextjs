import { useEffect, useState } from 'react'

export default function useCountdown(seconds: number) {
  const [count, setCount] = useState(seconds)

  useEffect(() => {
    if (count === 0) return

    const timer = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [count])

  const reset = () => setCount(seconds)

  return { count, setCount }
}
