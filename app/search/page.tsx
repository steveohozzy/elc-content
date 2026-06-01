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
    first: 10,
    after: null,
  });

  const products: ProductNode[] =
    data?.data?.products?.edges?.map(
      (edge: { node: ProductNode }) => edge.node
    ) ?? [];

  const pageInfo = data?.data?.products?.pageInfo;

  return (
    <div className="mx-auto max-w-7xl px-4">
      <section className="py-10 md:py-14">
        <h1 className="text-4xl font-black uppercase md:text-6xl">
          Search results
        </h1>

        <p className="mt-2 text-gray-600">
          Results for:{" "}
          <span className="font-black text-black">{q}</span>
        </p>
      </section>

      <SearchClient
        key={q}
        products={products}
        query={q}
        initialCursor={pageInfo?.endCursor}
        hasNextPage={pageInfo?.hasNextPage}
      />
    </div>
  );
}