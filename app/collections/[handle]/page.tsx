import { shopifyFetch } from "@/lib/shopify";
import { contentfulFetch } from "@/lib/contentful";
import { GET_COLLECTION_PRODUCTS, GET_PRODUCTS, GET_SECTION } from "@/lib/queries";
import CollectionClient from "@/components/CollectionClient";

import type { Metadata } from "next";
import { getCollectionPage } from "@/lib/getCollectionPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;

  const { collection, section } = await getCollectionPage(handle);

  return {
    title: section?.title || collection?.title || "Collection",
    description:
      section?.blurb ||
      "Premium snowboard gear and performance apparel built for riders.",
  };
}

type ProductEdge = {
  node: {
    id: string;
    title: string;
    handle: string;
    images: {
      edges: {
        node: {
          url: string;
        };
      }[];
    };
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
  };
};

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  const isAllProducts = handle === "all";
  const isNewArrivals = handle === "new-arrivals";

  // ----------------------------
  // FETCH DATA
  // ----------------------------
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

  // ----------------------------
  // COLLECTION TITLE LOGIC
  // ----------------------------
  const collection = isAllProducts
    ? { title: "All Products" }
    : isNewArrivals
      ? { title: "New Arrivals" }
      : shopifyData?.data?.collection;

  // ----------------------------
  // PRODUCT NORMALISATION (FIXED)
  // ----------------------------
  const collectionProducts =
  shopifyData?.data?.collection?.products;

const rootProducts = shopifyData?.data?.products;

const source = collectionProducts ?? rootProducts;

const products =
  source?.edges?.map((edge: ProductEdge) => edge.node) ?? [];

const pageInfo = source?.pageInfo;

  if (!collection) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <h1 className="text-3xl font-bold">Collection not found</h1>
      </div>
    );
  }

  return (
    <>
      {/* HEADER */}
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-white to-white" />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-10 bg-gray-300" />

            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              {section?.subtitle || "Collection"}
            </span>
          </div>

          <h1 className="text-4xl font-black uppercase md:text-6xl">
            {section?.title || collection.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base text-gray-600 md:text-lg">
            {section?.blurb ||
              "Premium snowboard gear and performance apparel built for riders who chase powder, progression, and style on every run."}
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <div className="mx-auto max-w-7xl px-4">
        <CollectionClient
          products={products}
          initialCursor={pageInfo?.endCursor}
          hasNextPage={pageInfo?.hasNextPage}
          handle={handle}
        />
      </div>
    </>
  );
}