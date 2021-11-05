import { BASE_URL, EXECUTIONS } from '@/constants/api'
import { jsonFetch } from '@/shared/fetch'
import type { PublicAPI, Reviver } from '@/shared/types/fetch'

type ExecutionsOptions = {
  id: string
  timestamp?: number
}

type ExecutionsResponse = {
  current_page: number
  total_pages: number
  models: {
    id: number
    quantity: number
    price: number
    taker_side: 'sell' | 'buy'
    created_at: Date
  }[]
}

const reviver: Reviver = (key, value) => {
  if (key === 'created_at' && typeof value === 'number') {
    return new Date(value * 1000)
  }
  return value
}

const fetchExecutions: PublicAPI<ExecutionsOptions, ExecutionsResponse> = (
  { id, timestamp },
  init
) => {
  const url = new URL(EXECUTIONS, BASE_URL)

  url.searchParams.set('product_id', id)

  if (typeof timestamp === 'number') {
    url.searchParams.set('timestamp', String(timestamp))
  }

  return jsonFetch(url, init, {
    parseJson: reviver
  })
}

export { fetchExecutions }

export type { ExecutionsOptions, ExecutionsResponse }
