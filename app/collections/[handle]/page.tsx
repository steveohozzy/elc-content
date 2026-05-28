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
    <div className="mx-auto max-w-7xl px-4">
      {/* HEADER */}
      <section className="py-10 md:py-14">
        <h1 className="text-3xl font-bold md:text-5xl">
          {collection.title}
        </h1>
      </section>

      {/* CLIENT FILTER + GRID */}
      <CollectionClient products={products} />
    </div>
  );
}