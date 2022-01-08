import { any, anyArray, anyNumber, expect, test } from "../dev_deps.ts";
import { fetchPriceLevels } from "./price_levels.ts";
test("fetch", async () => {
  await expect(fetchPriceLevels({ id: "1" })).resolves.toEqual({
    buy_price_levels: anyArray([anyNumber(), anyNumber()]),
    sell_price_levels: anyArray([anyNumber(), anyNumber()]),
    timestamp: any(Date),
  });
});
