import { z } from 'zod'

export const filterPriceSchema = z
  .object({
    fromPrice: z.string().optional(),
    toPrice: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const from = data.fromPrice ? parseInt(data.fromPrice, 10) : 0
    const to = data.toPrice ? parseInt(data.toPrice, 10) : 0

    if (data.fromPrice && data.toPrice && from >= to) {
      ctx.addIssue({
        code: 'custom',
        path: ['fromPrice'],
        message: 'From price must be less than to price',
      })
      ctx.addIssue({
        code: 'custom',
        path: ['toPrice'],
        message: 'To price must be greater than from price',
      })
    }
  })
