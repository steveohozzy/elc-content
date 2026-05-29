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

export default function SearchClient({
  products,
}: {
  products: ProductNode[];
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const maxProductPrice = useMemo(() => {
    return Math.max(
      ...products.map((p) =>
        parseFloat(p.priceRange?.minVariantPrice?.amount || "0")
      )
    );
  }, [products]);

  const [maxPrice, setMaxPrice] = useState(maxProductPrice);

  const filtered = useMemo(() => {
    return products
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
  }, [products, search, sort, maxPrice]);

  return (
    <div className="space-y-6">

      {/* ================= FILTER BAR ================= */}
      <div className="sticky top-20 z-40 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-2xl">

        {/* MOBILE BAR */}
        <div className="flex items-center justify-between p-3 md:hidden">
          <div className="text-xs text-gray-300">
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

          {/* SEARCH */}
          <div className="relative w-full md:w-72">
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
                placeholder:text-gray-400
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

          {/* SORT */}
          <div className="relative">
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
            >
              <option value="default">Default</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>

            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              ▾
            </div>
          </div>

          {/* PRICE */}
          <div className="flex w-full flex-col gap-2 md:w-72">

            <div className="flex items-center justify-between text-xs text-gray-300">
              <span>Max Price</span>
              <span className="font-semibold text-white">
                £{maxPrice}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={maxProductPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20"
            />
          </div>

        </div>
      </div>

      {/* ================= MOBILE FILTER SHEET ================= */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* PANEL */}
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

            {/* SEARCH */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gear..."
              className="
                mb-3 w-full rounded-full
                border border-white/15
                bg-black/40 px-4 py-3
                text-sm text-white
                placeholder:text-gray-400
              "
            />

            {/* SORT */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="
                mb-3 w-full rounded-full
                border border-white/15
                bg-black/40 px-4 py-3
                text-sm text-white
              "
            >
              <option value="default">Default</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>

            {/* PRICE */}
            <div className="text-xs text-gray-300">
              Max £{maxPrice}
            </div>

            <input
              type="range"
              min={0}
              max={maxProductPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4 pb-14 md:grid-cols-4 md:gap-6">
        {filtered.map((node: ProductNode) => (
          <Link
            key={node.id}
            href={`/products/${node.handle}`}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg"
          >
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

            <div className="p-4">
              <h3 className="line-clamp-2 text-sm font-medium md:text-base">{node.title}</h3>

              <p className="mt-2 text-lg font-bold">
                {node.priceRange?.minVariantPrice?.currencyCode}{" "}
                {node.priceRange?.minVariantPrice?.amount}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}