import { cache } from "react";
import { contentfulFetch } from "@/lib/contentful";
import { GET_PAGE } from "@/lib/queries";

export const getBlogPage = cache(async () => {
  const data = await contentfulFetch(GET_PAGE, {
    slug: "blog",
  });

  console.log(JSON.stringify(data, null, 2));

  return data?.data?.pageCollection?.items?.[0] ?? null;
});