// lib/getProductPage.ts
import { cache } from "react";
import { shopifyFetch } from "@/lib/shopify";
import { contentfulFetch } from "@/lib/contentful";
import { GET_PRODUCT, GET_PRODUCT_PAGE_SECTIONS } from "@/lib/queries";

export const getProductPage = cache(async (handle: string) => {
  const [shopifyData, cmsData] = await Promise.all([
    shopifyFetch(GET_PRODUCT, { handle }),
    contentfulFetch(GET_PRODUCT_PAGE_SECTIONS, { handle }),
  ]);

  const product = shopifyData?.data?.product;

  const sections =
    cmsData?.data?.productPageCollection?.items?.[0]?.sectionsCollection
      ?.items ?? [];

  return {
    product,
    sections,
  };
});