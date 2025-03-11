import { Skeleton, Space } from 'antd'
import Masonry from 'react-masonry-css'

export default function SkeletonItem() {
  const breakpointColumnsObj = {
    default: 5,
    946: 4,
    700: 3,
    500: 2,
  }
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-5 mt-5">
      {[...Array(15)].map((_, index) => (
        <div className="flex flex-col gap-2 w-full mb-5 skeleton-custom" key={index}>
          <Skeleton.Image active className="w-full" />

          <Skeleton.Input active className="skeleton-category" />

          <Skeleton.Input active className="w-full" />

          <Skeleton.Button active shape={'square'} />
        </div>
      ))}
    </Masonry>
  )
}
