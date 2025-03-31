import { useSearchParams } from 'next/navigation'
import React from 'react'

function MyLibraryDetail() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  console.log('id', id)
  return <div>MyLibraryDetail</div>
}

export default MyLibraryDetail
