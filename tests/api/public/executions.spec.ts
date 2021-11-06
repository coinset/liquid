import { fetchExecutions } from '@/api/public/executions'

describe('fetchExecutions', () => {
  it('should return currency pairs info', async () => {
    const { current_page, total_pages, models } = await fetchExecutions({
      id: '1'
    })

    expect(current_page).toBeNumber()
    expect(total_pages).toBeNumber()
    expect(models).toBeArray()

    models.forEach(({ id, quantity, price, taker_side, created_at }) => {
      expect(id).toBeNumber()
      expect(quantity).toBeNumber()
      expect(price).toBeNumber()
      expect(taker_side).toBeOneOf(['buy', 'sell'])
      expect(created_at).toBeValidDate()
    })
  })
})
