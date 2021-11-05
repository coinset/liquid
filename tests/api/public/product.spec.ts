import { fetchProduct } from '@/api/public/product'

describe('fetchProduct', () => {
  it('should return currency pairs info', async () => {
    const {
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
    } = await fetchProduct({
      id: '1'
    })

    expect(id).toEqual(expect.any(String))

    expect(name).toEqual(expect.any(String))
    expect(market_ask).toEqual(expect.any(Number))
    expect(market_bid).toEqual(expect.any(Number))
    expect(indicator).toEqual(expect.any(Number))
    expect(btc_minimum_withdraw).toBeNull()
    expect(fiat_minimum_withdraw).toBeNull()
    expect(pusher_channel).toEqual(expect.any(String))
    expect(taker_fee).toEqual(expect.any(Number))
    expect(maker_fee).toEqual(expect.any(Number))
    expect(low_market_bid).toEqual(expect.any(Number))
    expect(high_market_ask).toEqual(expect.any(Number))
    expect(volume_24h).toEqual(expect.any(Number))
    expect(last_price_24h).toEqual(expect.any(Number))
    expect(last_traded_price).toEqual(expect.any(Number))
    expect(last_traded_quantity).toEqual(expect.any(Number))
    expect(tick_size).toEqual(expect.any(Number))
    expect(disabled).toEqual(expect.any(Boolean))
    expect(margin_enabled).toEqual(expect.any(Boolean))
    expect(cfd_enabled).toEqual(expect.any(Boolean))
    expect(perpetual_enabled).toEqual(expect.any(Boolean))
    expect(last_event_timestamp).toEqual(expect.any(Date))
    expect(timestamp).toEqual(expect.any(Date))
  })
})
