import { shopifyFetch } from "@/lib/shopify";
import { SEARCH_PRODUCTS } from "@/lib/queries";

export async function POST(req: Request) {
  const { query, after, first } = await req.json();

  const data = await shopifyFetch(SEARCH_PRODUCTS, {
    query,
    first: first ?? 10,
    after: after ?? null,
  });

  return Response.json(data);
}