import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCTS } from "@/lib/queries";

export async function POST(req: Request) {
  const { after, first, sortKey, reverse } = await req.json();

  const result = await shopifyFetch(GET_PRODUCTS, {
    first,
    after,
    sortKey,
    reverse,
  });

  const products = result?.data?.products;

  return Response.json({
    data: {
      edges: products?.edges ?? [],
      pageInfo: products?.pageInfo ?? {
        hasNextPage: false,
        endCursor: null,
      },
    },
  });
}