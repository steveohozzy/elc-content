import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCT } from "@/lib/queries";
import ProductMediaGallery from "@/components/ProductMediaGallery";
import AddToCartButton from "@/components/AddToCartButton";

type ShopifyImageEdge = {
  node: {
    url: string;
    altText?: string;
  };
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  const data = await shopifyFetch(GET_PRODUCT, { handle });

  const product = data?.data?.product;

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h1 className="text-2xl font-semibold">Product not found</h1>
      </div>
    );
  }

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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        
        {/* LEFT: IMAGE */}
        <div className="md:sticky md:top-24 md:self-start">
          <div className="relative">
            <ProductMediaGallery media={media} />

            {/* BADGES OVER IMAGE */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              <span className="rounded-full bg-black/80 backdrop-blur px-3 py-1 text-xs text-white">
                ✓ In stock
              </span>

              <span className="rounded-full bg-green-600/90 backdrop-blur px-3 py-1 text-xs text-white">
                ⚡ Fast dispatch
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="flex flex-col gap-6">
          
          {/* TITLE */}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {product.title}
          </h1>

          {/* PRICE */}
          <div className="flex items-center gap-3">
            <p className="text-2xl font-semibold text-black">
              £{price}
            </p>
            <span className="text-sm text-gray-500">
              incl. VAT (where applicable)
            </span>
          </div>

          {/* DESCRIPTION */}
          <div className="prose prose-sm max-w-none text-gray-600">
            {product.description}
          </div>

          {/* BUY BOX */}
          <div className="rounded-2xl border bg-gray-50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  ● In stock
                </span>

                <span className="text-sm text-gray-500">
                  Ready to ship today
                </span>
              </div>
            </div>

            <div className="mt-4">
              <AddToCartButton variantId={variantId} />
            </div>
          </div>

          {/* EXTRA INFO */}
          <div className="grid grid-cols-2 gap-2">
            {/* Fast delivery */}
            <div className="group flex items-center gap-2 rounded-full bg-gray-100/70 px-4 py-2 text-xs font-medium text-gray-700 transition-all duration-300 hover:bg-black hover:text-white hover:scale-[1.02]">
              <span className="text-sm">🚚</span>
              <span>Fast delivery</span>
            </div>

            {/* Secure checkout */}
            <div className="group flex items-center gap-2 rounded-full bg-gray-100/70 px-4 py-2 text-xs font-medium text-gray-700 transition-all duration-300 hover:bg-black hover:text-white hover:scale-[1.02]">
              <span className="text-sm">🔒</span>
              <span>Secure checkout</span>
            </div>

            {/* Returns */}
            <div className="group flex items-center gap-2 rounded-full bg-gray-100/70 px-4 py-2 text-xs font-medium text-gray-700 transition-all duration-300 hover:bg-black hover:text-white hover:scale-[1.02]">
              <span className="text-sm">🔁</span>
              <span>Easy returns</span>
            </div>

            {/* Trust */}
            <div className="group flex items-center gap-2 rounded-full bg-gray-100/70 px-4 py-2 text-xs font-medium text-gray-700 transition-all duration-300 hover:bg-black hover:text-white hover:scale-[1.02]">
              <span className="text-sm">⭐</span>
              <span>Trusted store</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}