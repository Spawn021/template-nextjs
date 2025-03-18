'use client'
import Banner from '@/components/Banner'
import { useQuery } from '@tanstack/react-query'
import { IHomeSiteCustoms } from '@/types/Home'
import { getSiteCustoms } from '@/lib/api/home'
import Product from '@/components/Product'
import useGetProductRelease from '@/hooks/useGetProductRelease'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/redux/store'

export default function Home() {
  const { user } = useSelector((state: RootState) => state.auth)
  const { data: productData } = useGetProductRelease(user.id, 15)
  const { data } = useQuery<IHomeSiteCustoms>({
    queryKey: ['siteCustoms'],
    queryFn: getSiteCustoms,
  })
  return (
    <div>
      <Banner />
      <div className="w-full py-[14px] px-[40px]">
        <div className="max-w-[1000px] mx-auto site-customs">
          <div
            className="flex justify-center items-center"
            dangerouslySetInnerHTML={{
              __html: `${data?.description ? data?.description : ''}`,
            }}
          />
        </div>
        <div className="mt-5">
          <Product data={productData} />
        </div>
        <div className="w-full flex items-center justify-center">
          <button className="bg-white text-[#030712] text-base font-bold border-solid my-8 py-2 px-3 border-[#dcdcdc] border-[1px] rounded-[6px] cursor-pointer">
            View more
          </button>
        </div>
      </div>
    </div>
  )
}
