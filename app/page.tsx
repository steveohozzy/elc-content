import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCTS } from "@/lib/queries";

import Link from "next/link";
import Image from "next/image";

type ProductNode = {
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
    };
  };
};

export default async function Home() {
  const data = await shopifyFetch(
    GET_PRODUCTS
  );

  const products: { node: ProductNode }[] =
    data?.data?.products?.edges ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* HERO */}
      <section className="py-14 text-center md:py-20">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Headless Shopify Store
        </h1>

        <p className="text-gray-600">
          Modern ecommerce powered by
          Next.js
        </p>
      </section>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 gap-4 pb-14 md:grid-cols-4 md:gap-6">
        {products.map(({ node }) => (
          <Link
            key={node.id}
            href={`/products/${node.handle}`}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg"
          >
            {/* IMAGE */}
            <div className="aspect-square overflow-hidden bg-gray-100">
              <Image
                src={
                  node.images.edges[0]?.node.url
                }
                width={600}
                height={600}
                alt={node.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h3 className="line-clamp-2 text-sm font-medium md:text-base">
                {node.title}
              </h3>

              <p className="mt-2 text-lg font-bold">
                £
                {
                  node.priceRange
                    .minVariantPrice.amount
                }
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}