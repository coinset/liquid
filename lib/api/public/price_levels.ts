import { BASE_URL, PRODUCTS, PRICE_LEVELS } from '@/constants/api'
import { jsonFetch } from '@/shared/fetch'
import type { PublicAPI, Reviver } from '@/shared/types/fetch'

import { join } from 'path'

type PriceLevelsOptions = {
  id: string
  full?: number
}

type PriceLevelsResponse = {
  buy_price_levels: [number, number][]
  sell_price_levels: [number, number][]
  timestamp: Date
}

const reviver: Reviver = (key, value) => {
  if (key === 'timestamp' && typeof value === 'string') {
    return new Date(Number(value) * 1000)
  }

  if (
    ['buy_price_levels', 'sell_price_levels'].includes(key) &&
    Array.isArray(value)
  ) {
    return value.map((_v) => {
      if (Array.isArray(_v)) {
        return _v.map((__v) => (typeof __v === 'string' ? Number(__v) : __v))
      }

      return _v
    })
  }
  return value
}

const fetchPriceLevels: PublicAPI<PriceLevelsOptions, PriceLevelsResponse> = (
  { id, full },
  init
) => {
  const url = new URL(join(PRODUCTS, id, PRICE_LEVELS), BASE_URL)

  if (typeof full === 'number') {
    url.searchParams.set('full', String(full))
  }

  return jsonFetch(url, init, {
    parseJson: reviver
  })
}

export { fetchPriceLevels }

export type { PriceLevelsOptions, PriceLevelsResponse }
