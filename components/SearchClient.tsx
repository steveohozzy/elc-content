"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

type ShopifySearchResponse = {
  data?: {
    products?: {
      edges: { node: ProductNode }[];
      pageInfo: {
        endCursor: string | null;
        hasNextPage: boolean;
      };
    };
  };
};

export default function SearchClient({
  products,
  query,
  initialCursor,
  hasNextPage: initialHasNextPage,
}: {
  products: ProductNode[];
  query: string;
  initialCursor?: string;
  hasNextPage?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // ✅ PAGINATION STATE
  const [items, setItems] = useState<ProductNode[]>(products);
  const [cursor, setCursor] = useState<string | null>(initialCursor || null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(
    initialHasNextPage || false
  );
  const [loading, setLoading] = useState(false);

  const maxProductPrice = useMemo(() => {
    return Math.max(
      ...items.map((p) =>
        parseFloat(p.priceRange?.minVariantPrice?.amount || "0")
      )
    );
  }, [items]);

  const [maxPrice, setMaxPrice] = useState(maxProductPrice);

  // ---------------- FILTERS ----------------
  const filtered = useMemo(() => {
    return items
      .filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((p) => {
        const amount = parseFloat(
          p.priceRange?.minVariantPrice?.amount ?? "0"
        );
        return amount <= maxPrice;
      })
      .sort((a, b) => {
        const aPrice = parseFloat(
          a.priceRange?.minVariantPrice?.amount || "0"
        );
        const bPrice = parseFloat(
          b.priceRange?.minVariantPrice?.amount || "0"
        );

        if (sort === "low") return aPrice - bPrice;
        if (sort === "high") return bPrice - aPrice;
        return 0;
      });
  }, [items, search, sort, maxPrice]);

  // ---------------- LOAD MORE ----------------
  async function loadMore() {
    if (!cursor || loading || !hasNextPage) return;

    setLoading(true);

    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        after: cursor,
        first: 10,
        query,
      }),
    });

    const json: ShopifySearchResponse = await res.json();

    const edges = json?.data?.products?.edges ?? [];
    const pageInfo = json?.data?.products?.pageInfo;

    setItems((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));

      const newItems = edges
        .map((e) => e.node)
        .filter((n) => !existingIds.has(n.id));

      return [...prev, ...newItems];
    });

    setCursor(pageInfo?.endCursor ?? null);
    setHasNextPage(!!pageInfo?.hasNextPage);

    setLoading(false);
  }

  // ---------------- UI (UNCHANGED) ----------------
  return (
    <div className="space-y-6">

      {/* ================= FILTER BAR ================= */}
      <div className="sticky top-20 z-40 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl">

        {/* MOBILE BAR */}
        <div className="flex items-center justify-between p-3 md:hidden">
          <div className="text-xs text-gray-100">
            {filtered.length} items
          </div>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs text-white"
          >
            Filters
          </button>
        </div>

        {/* DESKTOP BAR */}
        <div className="hidden flex-col gap-4 p-4 md:flex md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:w-72">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter results..."
              className="
                w-full rounded-full
                border border-white/15
                bg-black/40
                px-5 py-3 pl-10
                text-sm text-white
                placeholder:text-gray-300
                outline-none
                transition
                focus:border-white/40
                focus:bg-black/60
                focus:ring-2 focus:ring-white/10
              "
            />

            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>

          <div className="relative">
            <label htmlFor="sort" className="sr-only">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="
                appearance-none rounded-full
                border border-white/15
                bg-black/40
                px-5 py-3 pr-10
                text-sm text-white
                outline-none
                transition
                focus:border-white/40
                focus:bg-black/60
                focus:ring-2 focus:ring-white/10
              "
              id="sort"
            >
              <option value="default">Default</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>

            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              ▾
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-72">

            <div className="flex items-center justify-between text-xs text-gray-200">
              <span>Max Price</span>
              <span className="font-semibold text-white">
                £{maxPrice}
              </span>
            </div>

            <label htmlFor="max-price" className="sr-only">Max Price</label>
            <input
              type="range"
              min={0}
              max={maxProductPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20"
              id="max-price"
            />
          </div>

        </div>
      </div>

      {/* ================= MOBILE FILTER SHEET ================= */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">

          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileFiltersOpen(false)}
          />

          <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl border border-white/10 bg-black p-5">

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">
                Filters
              </h2>

              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-white"
              >
                ✕
              </button>
            </div>

            <label htmlFor="search" className="sr-only">Search</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gear..."
              className="mb-3 w-full rounded-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-white"
            />

            <label htmlFor="sort" className="sr-only">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="mb-3 w-full rounded-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-white"
              id="sort"
            >
              <option value="default">Default</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>

            <div className="text-xs text-gray-300">
              Max £{maxPrice}
            </div>

            <label htmlFor="max-price" className="sr-only">Max Price</label>
            <input
              type="range"
              min={0}
              max={maxProductPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full"
              id="max-price"
            />
          </div>
        </div>
      )}

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-2 gap-4 pb-14 md:grid-cols-4 md:gap-6">
        {filtered.map((node, index) => (
          <Link
            key={node.id}
            href={`/products/${node.handle}`}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden bg-gray-100">

              <Image
                src={node.images.edges[0]?.node.url}
                width={600}
                height={600}
                alt={node.title}
                className="
                  absolute inset-0 h-full w-full object-cover
                  transition duration-500
                  group-hover:scale-110 group-hover:opacity-0
                "
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
              />

              {node.images.edges[1]?.node.url && (
                <Image
                  src={node.images.edges[1]?.node.url}
                  width={600}
                  height={600}
                  alt={node.title}
                  className="
                    absolute inset-0 h-full w-full object-cover
                    opacity-0 transition duration-500
                    group-hover:scale-110 group-hover:opacity-100
                  "
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                />
              )}
            </div>

            <div className="p-4">
              <div className="line-clamp-2 text-sm font-medium md:text-base">
                {node.title}
              </div>

              <p className="mt-2 text-lg font-bold">
                {node.priceRange?.minVariantPrice?.currencyCode}{" "}
                {node.priceRange?.minVariantPrice?.amount}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ================= LOAD MORE ================= */}
      {hasNextPage && (
        <div className="flex justify-center pb-10">
          <button
            onClick={loadMore}
            disabled={loading}
            className="rounded-full border border-black/10 bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/80 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

    </div>
  );
}