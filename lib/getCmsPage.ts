import { cache } from "react";
import { contentfulFetch } from "@/lib/contentful";
import { GET_PAGE } from "@/lib/queries";

export const getCmsPage = cache(async (slug: string) => {
  const data = await contentfulFetch(GET_PAGE, { slug });

  return data?.data?.pageCollection?.items?.[0] ?? null;
});