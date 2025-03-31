import TagCategory from '@/components/Product/Item/TagCategory'
import { STATUS_CONTENT } from '@/constants'
import useDrawerCart from '@/hooks/useDrawerCart'
import { useRouter } from '@/i18n/routing'
import Trash from '@/resources/svg/Trash'
import { Checkbox } from 'antd'
import { Typography } from 'antd'
import clsx from 'clsx'
const { Text, Paragraph } = Typography
function Item({
  item,
  checkedList,
  onItemCheck,
  onItemDelete,
}: {
  item: any
  checkedList: any
  onItemCheck: (id: string, checked: boolean) => void
  onItemDelete: (ids: string, idGuest?: string) => void
}) {
  const { onClose } = useDrawerCart()
  const router = useRouter()
  const isChecked = checkedList.map((i: any) => i?.id).includes(item?.content?.id)
  const handleClickItem = () => {
    if (item.content?.status === STATUS_CONTENT.OFF_SALE) return
    onClose()
    router.push(`/voice/${item?.content?.id}`)
  }
  return (
    <div className="flex items-center gap-3 item-cart justify-between">
      <div
        className={clsx(
          'flex items-center gap-3 w-[75%]',
          item?.content?.status === STATUS_CONTENT.OFF_SALE &&
            'opacity-50 cursor-not-allowed',
        )}
      >
        <Checkbox
          checked={isChecked}
          disabled={item?.content?.status === STATUS_CONTENT.OFF_SALE}
          onChange={(e) => onItemCheck(item?.content?.id, e.target.checked)}
          className="flex items-center"
        ></Checkbox>
        <div onClick={handleClickItem} className="w-1/5">
          <img
            src={item?.content?.images[0]?.url}
            className={clsx(
              'w-16 h-16 object-cover rounded-[4px] bg-[#f3f4f6]',
              item?.content?.status === STATUS_CONTENT.OFF_SALE
                ? 'cursor-not-allowed'
                : 'cursor-pointer',
            )}
            alt="thumbnail"
          />
        </div>
        <div onClick={handleClickItem} className="w-[70%] flex flex-col">
          <div
            className={clsx(
              'tag',
              item?.content?.status === STATUS_CONTENT.OFF_SALE
                ? 'cursor-not-allowed'
                : 'cursor-pointer',
            )}
          >
            <TagCategory
              backgroundColor={item?.content.category?.color.colorCode}
              borderColor={item?.content.category?.color.colorCodeBorder}
              textColor={item?.content.category?.color.colorCodeText}
              title={item?.content.category?.name}
              cssText={true}
            />
          </div>
          <Paragraph
            className={clsx(
              'text-base overflow-ellipsis overflow-hidden w-[100%]',
              item?.content?.status === STATUS_CONTENT.OFF_SALE
                ? 'cursor-not-allowed'
                : 'cursor-pointer',
            )}
            ellipsis={{ tooltip: item?.content.title, rows: 2 }}
          >
            {item?.content.title}
          </Paragraph>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-end">
          <div
            onClick={() => onItemDelete(item?.id, item?.content?.id)}
            className="w-6 h-6 border cursor-pointer flex items-center justify-center rounded-[4px]"
          >
            <Trash />
          </div>
        </div>
        <Text className="text-[#030712] text-base font-semibold flex justify-end">
          {item?.unitPrice} 円
        </Text>
      </div>
    </div>
  )
}

export default Item
