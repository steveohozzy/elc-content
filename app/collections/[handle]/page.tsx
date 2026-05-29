import { shopifyFetch } from "@/lib/shopify";
import { GET_COLLECTION_PRODUCTS } from "@/lib/queries";
import CollectionClient from "@/components/CollectionClient";
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

  const data = await shopifyFetch(GET_COLLECTION_PRODUCTS, {
    handle,
  });

  const collection = data?.data?.collection;

  if (!collection) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <h1 className="text-3xl font-bold">Collection not found</h1>
      </div>
    );
  }

  const products =
  (collection.products?.edges as ProductEdge[] | undefined)?.map(
    (edge) => edge.node
  ) ?? [];

  return (
    <>
    <section className="relative overflow-hidden py-12 md:py-16">

        {/* BACKGROUND ACCENT */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-white to-white" />

        {/* TOP LABEL */}
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-10 bg-gray-300" />

            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              Collection
            </span>
          </div>

          {/* TITLE */}
          <div className="relative inline-block overflow-hidden">
            <h1 className="relative text-4xl font-black uppercase tracking-tight text-black md:text-6xl">
              {collection.title}
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

          {/* SUBTEXT (optional but nice UX touch) */}
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            Premium snowboard gear and performance apparel built
            for riders who chase powder, progression, and style
            on every run.
          </p>
        </div>
      </section>
    <div className="mx-auto max-w-7xl px-4">
      {/* CLIENT FILTER + GRID */}
      <CollectionClient products={products} />
    </div>
    </>
  );
}