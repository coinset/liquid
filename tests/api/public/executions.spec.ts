import { fetchExecutions } from '@/api/public/executions'

describe('fetchExecutions', () => {
  it('should return currency pairs info', async () => {
    const { current_page, total_pages, models } = await fetchExecutions({
      id: '1'
    })

    expect(current_page).toEqual(expect.any(Number))
    expect(total_pages).toEqual(expect.any(Number))
    expect(models).toEqual(expect.any(Array))

    models.forEach(({ id, quantity, price, taker_side, created_at }) => {
      expect(id).toEqual(expect.any(Number))
      expect(quantity).toEqual(expect.any(Number))
      expect(price).toEqual(expect.any(Number))
      expect(taker_side).toMatch(/buy|sell/)
      expect(created_at).toEqual(expect.any(Date))
    })
  })
})
