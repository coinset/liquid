import { BASE_URL } from "./constants.ts";
import { jsonFetch, Reviver } from "./_utils.ts";
import { isNumber } from "../deps.ts";

const EXECUTIONS = "executions";

export type ExecutionsOptions = {
  id: string;
  timestamp?: number;
};

export type ExecutionsResponse = {
  current_page: number;
  total_pages: number;
  models: {
    id: number;
    quantity: number;
    price: number;
    taker_side: "sell" | "buy";
    created_at: Date;
  }[];
};

const reviver: Reviver = (key, value) => {
  if (key === "created_at" && isNumber(value)) {
    return new Date(value * 1000);
  }
  return value;
};

export function fetchExecutions(
  { id, timestamp }: ExecutionsOptions,
  init?: RequestInit,
): Promise<ExecutionsResponse> {
  const url = new URL(EXECUTIONS, BASE_URL);

  url.searchParams.set("product_id", id);

  if (isNumber(timestamp)) {
    url.searchParams.set("timestamp", String(timestamp));
  }

  return jsonFetch(url.toString(), init, {
    parseJson: reviver,
  });
}
