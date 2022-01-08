import { ProductData, reviver } from "./product.ts";
import { BASE_URL } from "./constants.ts";
import { jsonFetch } from "./_utils.ts";

const PRODUCTS = "products";

export type ProductsResponse = ProductData[];

export function fetchProducts(
  // deno-lint-ignore ban-types
  _?: {},
  init?: RequestInit,
): Promise<ProductsResponse> {
  const url = new URL(PRODUCTS, BASE_URL);

  return jsonFetch(url.toString(), init, {
    parseJson: reviver,
  });
}
