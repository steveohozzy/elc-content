import { shopifyFetch } from "@/lib/shopify";
import { SEARCH_PRODUCTS } from "@/lib/queries";
import SearchClient from "@/components/SearchClient";

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
  priceRange?: {
    minVariantPrice?: {
      amount: string;
      currencyCode: string;
    };
  };
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  if (!q) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <h1 className="text-3xl font-bold">Search products</h1>
        <p className="mt-2 text-gray-600">
          Type something in the search bar above.
        </p>
      </div>
    );
  }

  const data = await shopifyFetch(SEARCH_PRODUCTS, {
    query: q,
  });

  console.log("SEARCH RAW DATA:", JSON.stringify(data, null, 2));

  const products: ProductNode[] =
    data?.data?.products?.edges?.map(
      (edge: { node: ProductNode }) => edge.node
    ) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4">
      <section className="py-10 md:py-14">
        <div className="relative inline-block overflow-hidden">
          <h1 className="relative text-4xl font-black uppercase tracking-tight text-black md:text-6xl">
            Search results
          </h1>

          {/* SHIMMER */}
          <div
            className="
              absolute inset-0
              -translate-x-full
              animate-[shimmer_5s_infinite]
              bg-gradient-to-r
              from-transparent
              via-white/70
              to-transparent
            "
          />
        </div>
        <p className="mt-2 text-gray-600">
          Results for:{" "}
          <span className="font-black text-black">{q}</span>
        </p>
      </section>

      <SearchClient products={products} />
    </div>
  );
}