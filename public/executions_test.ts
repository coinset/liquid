import { fetchExecutions } from "./executions.ts";
import {
  any,
  anyArray,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";

test("fetchExecutions", async () => {
  await expect(fetchExecutions({ id: "1" })).resolves.toEqual({
    current_page: anyNumber(),
    total_pages: anyNumber(),
    models: anyArray({
      id: anyNumber(),
      quantity: anyNumber(),
      price: anyNumber(),
      taker_side: anyOf(["sell", "buy"]),
      created_at: any(Date),
      timestamp: anyString(),
    }),
  });
});
