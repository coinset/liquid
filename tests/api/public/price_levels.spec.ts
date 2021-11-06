import { fetchPriceLevels } from '@/api/public/price_levels'

describe('fetchPriceLevels', () => {
  it('should return currency pairs info', async () => {
    const { buy_price_levels, sell_price_levels, timestamp } =
      await fetchPriceLevels({
        id: '1'
      })

    expect(buy_price_levels).toBeArray()
    expect(sell_price_levels).toBeArray()
    expect(timestamp).toBeValidDate()

    const forEachTest = (value: [number, number]) => {
      expect(value).toHaveLength(2)

      const [price, amount] = value

      expect(price).toBeNumber()
      expect(amount).toBeNumber()
    }

    buy_price_levels.forEach(forEachTest)
    sell_price_levels.forEach(forEachTest)
  })
})
