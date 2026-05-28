import { shopifyFetch } from "@/lib/shopify";
import { SEARCH_PRODUCTS } from "@/lib/queries";

export async function POST(req: Request) {
  const { query } = await req.json();

  const data = await shopifyFetch(
    SEARCH_PRODUCTS,
    { query }
  );

  return Response.json(data);
}