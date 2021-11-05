import type { ProductData } from '@/api/public/product'
import { BASE_URL, PRODUCTS } from '@/constants/api'
import { jsonFetch } from '@/shared/fetch'
import type { SimplePublicAPI } from '@/shared/types/fetch'

// eslint-disable-next-line @typescript-eslint/ban-types
type ProductsOptions = {}

type ProductsResponse = ProductData[]

const fetchProducts: SimplePublicAPI<ProductsOptions, ProductsResponse> = (
  _,
  init
) => {
  const url = new URL(PRODUCTS, BASE_URL)

  return jsonFetch(url, init)
}

export { fetchProducts }
export type { ProductsOptions, ProductsResponse }
