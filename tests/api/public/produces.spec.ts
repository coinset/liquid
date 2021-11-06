// eslint-disable-next-line import/no-unresolved
import { forEachTest } from '@test/api/public/product.spec'

import { fetchProducts } from '@/api/public/products'

describe('fetchProducts', () => {
  it('should return currency pairs info', async () => {
    const result = await fetchProducts()

    expect(result).toBeArray()
    result.forEach(forEachTest)
  })
})
