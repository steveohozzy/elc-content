import { shopifyFetch } from "@/lib/shopify";
import { contentfulFetch } from "@/lib/contentful";
import { GET_PRODUCTS, GET_HOMEPAGE_HERO } from "@/lib/queries";

import Link from "next/link";
import Image from "next/image";

type ProductNode = {
  id: string;
  title: string;
  handle: string;
  images: {
    edges: { node: { url: string } }[];
  };
  priceRange?: {
    minVariantPrice?: {
      amount: string;
      currencyCode: string;
    };
  };
};

export default async function Home() {
  const [shopifyData, contentfulData] = await Promise.all([
    shopifyFetch(GET_PRODUCTS),
    contentfulFetch(GET_HOMEPAGE_HERO),
  ]);

  const products: { node: ProductNode }[] =
    shopifyData?.data?.products?.edges ?? [];

  const hero = contentfulData?.data?.homepageHeroCollection?.items?.[0];

  return (
    <div className="mx-auto">

      {/* HERO */}
      <section className="relative overflow-hidden bg-black py-24 md:py-36">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <Image
            src={
              hero?.backgroundImage?.url
                ? `${hero.backgroundImage.url}`
                : "https://images.unsplash.com/photo-1590461283969-47fedf408cfd?fm=jpg&q=60&w=3000&auto=format&fit=crop"
            }
            alt={hero?.backgroundImage?.title || "Hero image"}
            width={1920}
            height={1080}
            priority
            className="h-full w-full object-cover opacity-60"
          />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center">

          {/* TAG */}
          <div className="mb-6 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.35em] text-white backdrop-blur-md">
            {hero?.tagline || "Winter 2026 Collection"}
          </div>

          {/* TITLE */}
          <h1 className="max-w-6xl text-5xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {hero?.title || "Ride Beyond"}
            {hero?.titleAccent &&
              <span className="block text-white/60">
                
                {hero?.titleAccent || "The Limits"}
              </span>
            }
          </h1>

          {/* SUBTITLE */}
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-gray-300 md:text-xl">
            {hero?.subtitle ||
              "Premium snowboards, outerwear, and mountain gear built for riders chasing powder, park laps, and alpine adventure."}
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link
              href={hero?.ctaPrimaryLink || "/collections/hydrogen"}
              className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition duration-300 hover:scale-105 hover:bg-white/10 hover:text-white hover:border-white/30 hover:border"
            >
              {hero?.ctaPrimaryText || "Shop Now"}
            </Link>

            <Link
              href={hero?.ctaSecondaryLink || "/collections/automated-collection"}
              className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-black hover:scale-105"
            >
              {hero?.ctaSecondaryText || "Explore"}
            </Link>

          </div>
        </div>

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* NEW ARRIVALS STRIP */}
<section className="mx-auto mt-16 max-w-7xl px-4">
  {/* PRODUCTS HEADER */}
      <div className="mx-auto mt-16 max-w-7xl px-4">

        {/* SMALL LABEL */}
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-12 bg-gray-300" />

          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            Featured Collection
          </span>
        </div>

        {/* TITLE */}
        <div className="relative inline-block overflow-hidden">
          <h2 className="relative text-4xl font-black uppercase tracking-tight text-black md:text-6xl">
            Snow Ready Gear
          </h2>

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

        {/* SUBTEXT */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
          Performance-driven snowboards, technical outerwear,
          and cold-weather essentials built for mountain life.
        </p>
      </div>

  <div className="grid grid-cols-2 gap-4  md:grid-cols-4 md:gap-6 max-w-7xl px-4 mt-6 mx-auto">
    {products.slice(0, 4).map(({ node }) => (
      <Link
        key={node.id}
        href={`/products/${node.handle}`}
        className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg"
      >
        {/* IMAGE */}
        <div className="aspect-square overflow-hidden bg-gray-100">
          {/* IMAGE */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            {/* First Image */}
            <Image
              src={node.images.edges[0]?.node.url}
              width={600}
              height={600}
              alt={node.title}
              className="
                absolute inset-0
                h-full w-full object-cover
                transition duration-500
                group-hover:scale-110
                group-hover:opacity-0
              "
            />

            {/* Second Image */}
            {node.images.edges[1]?.node.url && (
              <Image
                src={node.images.edges[1]?.node.url}
                width={600}
                height={600}
                alt={node.title}
                className="
                  absolute inset-0
                  h-full w-full object-cover
                  opacity-0
                  transition duration-500
                  group-hover:scale-110
                  group-hover:opacity-100
                "
              />
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <h3 className="line-clamp-2 text-sm font-medium md:text-base">
            {node.title}
          </h3>

          <p className="mt-2 text-lg font-bold">
            {node.priceRange?.minVariantPrice?.currencyCode}{" "}
            {node.priceRange?.minVariantPrice?.amount}
          </p>
        </div>
      </Link>
    ))}
  </div>
</section>
      {/* CATEGORIES */}
<section className="mx-auto mt-16 max-w-7xl px-4">
  <div className="mb-6 flex items-center gap-3">
    <div className="h-px w-12 bg-gray-300" />
    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
      Shop by Category
    </span>
  </div>

  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
    {[
      { title: "Snowboards", href: "/collections/hydrogen" },
      { title: "Outerwear", href: "/collections/automated-collection" },
      { title: "Accessories", href: "/collections/hydrogen" },
      { title: "Gear", href: "/collections/automated-collection" },
    ].map((cat) => (
      <Link
        key={cat.title}
        href={cat.href}
        className="group relative overflow-hidden rounded-2xl border bg-black text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />

        <div className="p-6">
          <p className="text-lg font-bold uppercase tracking-wide">
            {cat.title}
          </p>

          <p className="mt-2 text-xs text-white/60">
            Explore collection
          </p>
        </div>
      </Link>
    ))}
  </div>
</section>

{/* LIFESTYLE BANNER */}
<section className="mx-auto mt-20 max-w-7xl px-4">
  <div className="relative overflow-hidden rounded-3xl bg-black">
    <Image
      src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=2070&auto=format&fit=crop"
      alt=""
      width={1920}
      height={1080}
      className="h-[300px] w-full object-cover opacity-60 md:h-[420px]"
    />

    <div className="absolute inset-0 flex flex-col justify-center p-10 text-white">
      <h3 className="text-3xl font-black md:text-5xl">
        Built for the mountain
      </h3>

      <p className="mt-4 max-w-xl text-sm text-white/70 md:text-base">
        Performance snow gear designed for riders who push conditions, terrain, and limits.
      </p>

      <Link
        href="/collections/hydrogen"
        className="mt-6 w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
      >
        Shop Collection
      </Link>
    </div>
  </div>
</section>
{/* TRUST STRIP */}
<section className="mx-auto mt-16 max-w-7xl px-4">
  <div className="grid grid-cols-2 gap-4 rounded-2xl border bg-white p-6 md:grid-cols-4">
    {[
      "Free UK Delivery",
      "Easy Returns",
      "Secure Checkout",
      "Premium Gear",
    ].map((item) => (
      <div
        key={item}
        className="text-center text-xs font-semibold uppercase tracking-wide text-gray-600"
      >
        {item}
      </div>
    ))}
  </div>
</section>
    </div>
  );
}