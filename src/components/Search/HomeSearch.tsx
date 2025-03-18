import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

const HomeSearch: React.FC = () => (
  <>
    <Input
      className="rounded-[20px] h-[30px] custom-input w-[280px] "
      placeholder="Search"
      suffix={
        <SearchOutlined className="text-lg cursor-pointer text-gray-500 font-bold" />
      }
    />
  </>
)

export default HomeSearch
