import React, { memo, useEffect } from 'react'
import { Button } from 'antd'
import { FloatingLabel } from 'flowbite-react'
import { filterPriceSchema } from '@/schemas/filter'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'

export type FilterPriceForm = z.infer<typeof filterPriceSchema>
type Props = {
  onApply: (data: FilterPriceForm) => void
  fromPrice?: string
  toPrice?: string
}
function FilterPrice({ onApply, fromPrice, toPrice }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FilterPriceForm>({
    resolver: zodResolver(filterPriceSchema),
    defaultValues: {
      fromPrice: fromPrice || '',
      toPrice: toPrice || '',
    },
  })
  useEffect(() => {
    setValue('fromPrice', fromPrice || '')
    setValue('toPrice', toPrice || '')
  }, [fromPrice, toPrice, setValue])
  const onSubmit = (data: FilterPriceForm) => {
    onApply(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="text-sm font-semibold mb-[14px]">Price</div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <Controller
            name="fromPrice"
            control={control}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                {...field}
                label="Min"
                inputMode="numeric"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                  if (
                    !/^[0-9]$/.test(e.key) &&
                    e.key !== 'Backspace' &&
                    e.key !== 'Delete'
                  ) {
                    e.preventDefault()
                  }
                }}
                color={errors.fromPrice ? 'error' : 'default'}
              />
            )}
          />
          {errors.fromPrice && (
            <p className="text-red-500 text-xs mt-1">{errors.fromPrice.message}</p>
          )}
        </div>
        <div className="w-1/2">
          <Controller
            name="toPrice"
            control={control}
            render={({ field }) => (
              <FloatingLabel
                variant="outlined"
                label="Max"
                {...field}
                inputMode="numeric"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                  if (
                    !/^[0-9]$/.test(e.key) &&
                    e.key !== 'Backspace' &&
                    e.key !== 'Delete'
                  ) {
                    e.preventDefault()
                  }
                }}
                color={errors.toPrice ? 'error' : 'default'}
              />
            )}
          />
          {errors.toPrice && (
            <p className="text-red-500 text-xs mt-1">{errors.toPrice.message}</p>
          )}
        </div>
      </div>
      <Button
        className="mt-5 w-full bg-[#00AAF2] py-2 px-4 text-xs h-auto font-semibold"
        type="primary"
        htmlType="submit"
      >
        Apply
      </Button>
    </form>
  )
}

export default memo(FilterPrice)
