import { cache } from "react";
import { shopifyFetch } from "@/lib/shopify";
import { contentfulFetch } from "@/lib/contentful";
import {
  GET_COLLECTION_PRODUCTS,
  GET_PRODUCTS,
  GET_SECTION,
} from "@/lib/queries";

export const getCollectionPage = cache(async (handle: string) => {
  const isAllProducts = handle === "all";
  const isNewArrivals = handle === "new-arrivals";

  const [shopifyData, sectionData] = await Promise.all([
    isAllProducts || isNewArrivals
      ? shopifyFetch(GET_PRODUCTS, {
          first: 10,
          sortKey: isNewArrivals ? "CREATED_AT" : undefined,
          reverse: isNewArrivals ? true : undefined,
        })
      : shopifyFetch(GET_COLLECTION_PRODUCTS, {
          handle,
          first: 10,
        }),

    contentfulFetch(GET_SECTION, {
      sectionKey: `${handle}-page-intro`,
    }),
  ]);

  const section =
    sectionData?.data?.sectionIntroCollection?.items?.[0];

  const collection = isAllProducts
    ? { title: "All Products" }
    : isNewArrivals
    ? { title: "New Arrivals" }
    : shopifyData?.data?.collection;

  const collectionProducts = shopifyData?.data?.collection?.products;
  const rootProducts = shopifyData?.data?.products;

  const source = collectionProducts ?? rootProducts;

  const products =
    source?.edges?.map((edge: any) => edge.node) ?? [];

  const pageInfo = source?.pageInfo;

  return {
    collection,
    section,
    products,
    pageInfo,
  };
});