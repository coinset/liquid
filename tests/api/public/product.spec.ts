import { fetchProduct } from '@/api/public/product'
import type { ProductData, SymbolUnit } from '@/api/public/product'

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
  expect(id).toBeString()
  expect(name).toEqualOneOf([expect.any(String), null])
  expect(code).toBe('CASH')
  expect(product_type).toBe('CurrencyPair')
  expect([...symbols, null]).toContain(symbol)
  expect(base_currency).toBeString()
  expect(currency_pair_code).toBeString()
  expect(market_ask).toEqualOneOf([expect.any(Number), null])
  expect(market_bid).toEqualOneOf([expect.any(Number), null])
  expect(indicator).toEqualOneOf([expect.any(Number), null])
  expect(btc_minimum_withdraw).toBeNull()
  expect(fiat_minimum_withdraw).toBeNull()
  expect(pusher_channel).toBeString()
  expect(taker_fee).toBeNumber()
  expect(maker_fee).toBeNumber()
  expect(low_market_bid).toEqualOneOf([expect.any(Number), null])
  expect(high_market_ask).toEqualOneOf([expect.any(Number), null])
  expect(volume_24h).toEqualOneOf([expect.any(Number), null])
  expect(last_price_24h).toEqualOneOf([expect.any(Number), null])
  expect(last_traded_price).toEqualOneOf([expect.any(Number), null])
  expect(last_traded_quantity).toEqualOneOf([expect.any(Number), null])
  expect(tick_size).toBeNumber()
  expect(disabled).toBeBoolean()
  expect(margin_enabled).toBeBoolean()
  expect(cfd_enabled).toBeBoolean()
  expect(perpetual_enabled).toBeBoolean()
  expect(last_event_timestamp).toBeValidDate()
  expect(timestamp).toBeValidDate()
}

export { forEachTest }
