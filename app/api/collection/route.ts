import { shopifyFetch } from "@/lib/shopify";
import { GET_COLLECTION_PRODUCTS } from "@/lib/queries";

export async function POST(req: Request) {
  try {
    const { handle, after, first } = await req.json();

    if (!handle) {
      return Response.json({
        data: { edges: [], pageInfo: { hasNextPage: false, endCursor: null } }
      });
    }

    const data = await shopifyFetch(GET_COLLECTION_PRODUCTS, {
      handle,
      first: first ?? 10,
      after: after ?? null,
    });

    const products =
      data?.data?.collection?.products ??
      data?.collection?.products ??
      null;

    return Response.json({
      data: {
        edges: products?.edges ?? [],
        pageInfo: products?.pageInfo ?? {
          hasNextPage: false,
          endCursor: null,
        },
      },
    });

  } catch {
    return Response.json({
      data: {
        edges: [],
        pageInfo: { hasNextPage: false, endCursor: null }
      }
    });
  }
}