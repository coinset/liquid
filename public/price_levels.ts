import { BASE_URL } from "./constants.ts";

import { jsonFetch, Reviver } from "./_utils.ts";
import { isNumber, isString, join } from "../deps.ts";

const PRICE_LEVELS = "price_levels";
const PRODUCTS = "products";

export type PriceLevelsOptions = {
  id: string;
  full?: number;
};

export type PriceLevelsResponse = {
  buy_price_levels: [number, number][];
  sell_price_levels: [number, number][];
  timestamp: Date;
};

const reviver: Reviver = (key, value) => {
  if (key === "timestamp" && isString(value)) {
    return new Date(Number(value) * 1000);
  }

  if (
    ["buy_price_levels", "sell_price_levels"].includes(key) &&
    Array.isArray(value)
  ) {
    return value.map((_v) => {
      if (Array.isArray(_v)) {
        return _v.map((__v) => (isString(__v) ? Number(__v) : __v));
      }

      return _v;
    });
  }
  return value;
};

export function fetchPriceLevels(
  { id, full }: PriceLevelsOptions,
  init?: RequestInit,
): Promise<PriceLevelsResponse> {
  const url = new URL(join(PRODUCTS, id, PRICE_LEVELS), BASE_URL);

  if (isNumber(full)) {
    url.searchParams.set("full", String(full));
  }

  return jsonFetch(url.toString(), init, {
    parseJson: reviver,
  });
}
