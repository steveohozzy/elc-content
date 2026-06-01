import { shopifyFetch } from "@/lib/shopify";
import { GET_COLLECTION_PRODUCTS } from "@/lib/queries";
import Image from "next/image";
import FeaturedProductsCarousel from "../FeaturedCarousel";

type Props = {
  data: {
    collectionId: string;
    title?: string;
    limit?: number;
  };
};

type ProductEdge = {
  node: {
    id: string;
    title: string;
    handle: string;
    images: {
      edges: { node: { url: string } }[];
    };
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
  };
};

export default async function ShopifyCollectionSection({ data }: Props) {
  const handle = data.collectionId;

  console.log("🔥 SHOPIFY COLLECTION HANDLE:", handle);

  if (!handle) return null;

  const shopifyData = await shopifyFetch(GET_COLLECTION_PRODUCTS, {
    handle,
    first: data.limit ?? 8,
  });

  const collection = shopifyData?.data?.collection;

  const products =
  collection?.products?.edges ?? [];

  if (!products.length) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl px-4 mt-6 mx-auto">
      {data.title && (
        <h2 className="mb-8 text-center text-3xl font-semibold">
          {data.title}
        </h2>
      )}

      <FeaturedProductsCarousel products={products} />
      </div>
    </section>
  );
}