import { fetchProduct } from '@/api/public/product'
import type { ProductData, SymbolUnit } from '@/api/public/product'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toEqualOneOf(expected: unknown[]): R
    }
  }
}

const symbols: SymbolUnit[] = [
  'S$',
  'HK$',
  'AU$',
  '€',
  '$',
  '¥',
  'Rp',
  'Ꝗ',
  '฿',
  'Ξ',
  '₹',
  '₱',
  'XRP',
  'MCO',
  'FDX',
  'TPT',
  'IXT',
  'SAL',
  'SER',
  'ECH',
  'GAT',
  'SNIP',
  'STAC',
  'MGO',
  'BTRN',
  'ADH',
  'ALX',
  'LND',
  'FLP',
  'ZPR',
  'UBT',
  'FTT',
  'MITH',
  'ONT',
  'CMCT',
  'KRL',
  'FLIXX',
  'GET',
  'WIN',
  'CRPT',
  'IDH',
  'DACS',
  'DRG',
  'TPAY',
  'FSN',
  'ETN',
  'AMLT',
  'MRK',
  'IHF',
  '1WO',
  'ENJ',
  'PPL',
  'XNK',
  'GEN',
  'HOT',
  'MT',
  'UKG',
  'SPHTX',
  'MTN',
  'GZE',
  'CAN',
  'SIX',
  'IPSX',
  'LIKE',
  'MITX',
  'DENT'
]

describe('fetchProduct', () => {
  it('should return currency pairs info', async () => {
    const result = await fetchProduct({
      id: '1'
    })

    expect(result).toEqual(expect.any(Object))

    forEachTest(result)
  })
})

const forEachTest = ({
  code,
  product_type,
  symbol,
  base_currency,
  currency_pair_code,
  id,
  name,
  market_ask,
  market_bid,
  indicator,
  btc_minimum_withdraw,
  fiat_minimum_withdraw,
  pusher_channel,
  taker_fee,
  maker_fee,
  low_market_bid,
  high_market_ask,
  volume_24h,
  last_price_24h,
  last_traded_price,
  last_traded_quantity,
  tick_size,
  disabled,
  margin_enabled,
  cfd_enabled,
  perpetual_enabled,
  last_event_timestamp,
  timestamp
}: ProductData) => {
  expect(id).toEqual(expect.any(String))
  expect(name).toEqualOneOf([expect.any(String), null])
  expect(code).toMatch(/CASH/)
  expect(product_type).toMatch(/CurrencyPair/)
  expect([...symbols, null]).toContain(symbol)
  expect(base_currency).toEqual(expect.any(String))
  expect(currency_pair_code).toEqual(expect.any(String))
  expect(market_ask).toEqualOneOf([expect.any(Number), null])
  expect(market_bid).toEqualOneOf([expect.any(Number), null])
  expect(indicator).toEqualOneOf([expect.any(Number), null])
  expect(btc_minimum_withdraw).toBeNull()
  expect(fiat_minimum_withdraw).toBeNull()
  expect(pusher_channel).toEqual(expect.any(String))
  expect(taker_fee).toEqual(expect.any(Number))
  expect(maker_fee).toEqual(expect.any(Number))
  expect(low_market_bid).toEqualOneOf([expect.any(Number), null])
  expect(high_market_ask).toEqualOneOf([expect.any(Number), null])
  expect(volume_24h).toEqualOneOf([expect.any(Number), null])
  expect(last_price_24h).toEqualOneOf([expect.any(Number), null])
  expect(last_traded_price).toEqualOneOf([expect.any(Number), null])
  expect(last_traded_quantity).toEqualOneOf([expect.any(Number), null])
  expect(tick_size).toEqual(expect.any(Number))
  expect(disabled).toEqual(expect.any(Boolean))
  expect(margin_enabled).toEqual(expect.any(Boolean))
  expect(cfd_enabled).toEqual(expect.any(Boolean))
  expect(perpetual_enabled).toEqual(expect.any(Boolean))
  expect(last_event_timestamp).toEqual(expect.any(Date))
  expect(timestamp).toEqual(expect.any(Date))
}

export { forEachTest }
