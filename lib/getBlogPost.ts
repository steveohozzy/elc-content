import { cache } from "react";
import { contentfulFetch } from "@/lib/contentful";
import { GET_BLOG_POST_PAGE } from "@/lib/queries";

export const getBlogPost = cache(async (slug: string) => {
  const data = await contentfulFetch(GET_BLOG_POST_PAGE, {
    slug,
  });

  return data?.data?.pageCollection?.items?.[0] ?? null;
});