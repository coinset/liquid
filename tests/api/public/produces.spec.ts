import type { SymbolUnit } from '@/api/public/product'
import { fetchProducts } from '@/api/public/products'

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

describe('fetchProducts', () => {
  it('should return currency pairs info', async () => {
    const result = await fetchProducts()

    expect(result).toEqual(expect.any(Array))
    result.forEach(
      ({ code, product_type, symbol, base_currency, currency_pair_code }) => {
        expect(code).toMatch(/CASH/)
        expect(product_type).toMatch(/CurrencyPair/)
        expect([...symbols, null]).toContain(symbol)
        expect(base_currency).toEqual(expect.any(String))
        expect(currency_pair_code).toEqual(expect.any(String))
      }
    )
  })
})
