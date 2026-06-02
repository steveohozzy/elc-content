// lib/getHomePage.ts
import { cache } from "react";
import { contentfulFetch } from "@/lib/contentful";
import { GET_PAGE } from "@/lib/queries";

export const getHomePage = cache(async () => {
  const data = await contentfulFetch(GET_PAGE, {
    slug: "home",
  });

  return data?.data?.pageCollection?.items?.[0] ?? null;
});