import { notFound } from "next/navigation";
import SectionRenderer from "@/components/sections/SectionRenderer";
import type { Document } from "@contentful/rich-text-types";

/* ---------------------------
   TYPES
---------------------------- */

type ContentfulSection =
  | {
      __typename: "HeroSection";
      headline?: string;
      subheading?: string;
      buttonText?: string;
      buttonLink?: string;
      image?: { url: string };
    }
  | {
      __typename: "TextSection";
      text?: {
        json: Document;
      };
    }
  | {
      __typename: "CtaSection";
      text?: string;
      buttonText?: string;
      buttonLink?: string;
    };

type ContentfulPage = {
  title: string;
  slug: string;
  sectionsCollection?: {
    items: ContentfulSection[];
  };
};

/* ---------------------------
   FETCH PAGE
---------------------------- */

async function getPage(slug: string) {
  console.log("GET PAGE CALLED WITH:", slug);

  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          query ($slug: String!) {
  pageCollection(where: { slug: $slug }, limit: 1) {
    items {
      title
      slug

      sectionsCollection {
        items {
          __typename

          ... on HeroSection {
            headline
            subheading
            buttonText
            buttonLink
            image {
              url
            }
          }

          ... on TextSection {
            content {
              json
            }
          }

          ... on CtaSection {
            text
            buttonText
            buttonLink
          }

          ... on ShopifyCollectionSection {
            __typename
            collectionId
          }
        }
      }
    }
  }
}
        `,
        variables: { slug },
      }),
    }
  );

  console.log("STATUS:", res.status);

  const text = await res.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    console.log("❌ FAILED TO PARSE JSON");
    return null;
  }

  console.log("PARSED JSON:", json);

 const page = json?.data?.pageCollection?.items?.[0] ?? null;

return page;

return page ?? null;
}

/* ---------------------------
   PAGE
---------------------------- */

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  console.log("PAGE HIT");

  const { slug } = await params;

  const page = await getPage(slug);

  if (!page) return notFound();

  return (
    <main>
      <SectionRenderer sections={page.sectionsCollection?.items ?? []} />
    </main>
  );
}