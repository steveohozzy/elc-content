import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCT, GET_PRODUCT_PAGE_SECTIONS } from "@/lib/queries";
import ProductMediaGallery from "@/components/ProductMediaGallery";
import AddToCartButton from "@/components/AddToCartButton";
import SectionRenderer from "@/components/sections/SectionRenderer";
import { contentfulFetch } from "@/lib/contentful";
import type { Metadata } from "next";
import { getProductPage } from "@/lib/getProductPage";

type ShopifyImageEdge = {
  node: {
    url: string;
    altText?: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;

  const { product } = await getProductPage(handle);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.title || "Summit Snow Supply",
    description:
      product.description ||
      "The one stop shop for snowboard gear and performance apparel",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  // 1. Fetch product
  const data = await shopifyFetch(GET_PRODUCT, { handle });
  const product = data?.data?.product;
  

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h1 className="text-2xl font-semibold">Product not found</h1>
      </div>
    );
  }

  const cms = await contentfulFetch(GET_PRODUCT_PAGE_SECTIONS, {
  handle
});

  const sections =
  cms?.data?.productPageCollection?.items?.[0]?.sectionsCollection?.items ?? [];

    console.log("CMS RAW:", JSON.stringify(cms, null, 2));

  // 3. Media fallback
  const media =
    product.media?.edges?.length
      ? product.media
      : {
          edges:
            (product.images?.edges as ShopifyImageEdge[] | undefined)?.map(
              (img) => ({
                node: {
                  __typename: "MediaImage" as const,
                  image: {
                    url: img.node.url,
                    altText: img.node.altText || "",
                  },
                },
              })
            ) || [],
        };

  const variant = product.variants?.edges?.[0]?.node;
  const variantId = variant?.id;
  const price = variant?.price?.amount || "0.00";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.7fr_1fr]">
        
        {/* LEFT */}
        <div>
          <ProductMediaGallery media={media} />
        </div>

        {/* RIGHT */}
        <div className="md:sticky md:top-24 md:self-start flex flex-col gap-6">

          <h1 className="text-2xl font-black uppercase md:text-4xl">
            {product.title}
          </h1>

          <p className="text-2xl font-semibold">£{price}</p>

          <div className="prose text-gray-600">
            {product.description}
          </div>

          <div className="rounded-2xl border bg-gray-50 p-6">
            <AddToCartButton variantId={variantId} />
          </div>

        </div>
      </div>

      {/* ===================== */}
      {/* CMS SECTIONS (CONTENTFUL) */}
      {/* ===================== */}
      <div className="mt-16">
        <SectionRenderer sections={sections} />
        
      </div>

    </div>
  );
}