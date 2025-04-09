export interface FilterMyLibrary {
  purchasedAtFrom?: string
  purchasedAtTo?: string
  keyword?: string
  fileType?: string
  page?: number
  limit?: number
}

export interface FilterTransaction extends FilterMyLibrary {
  keyword?: string
  paymentMethod?: string
  createdAtFrom?: string
  createdAtTo?: string
  method?: string
  status?: string
}
