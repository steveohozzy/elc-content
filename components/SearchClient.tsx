"use client";

import { useMemo, useState, useEffect } from "react";
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

  const prices = useMemo(() => {
  return products
    .map((p) =>
      parseFloat(p.priceRange?.minVariantPrice?.amount ?? "0")
    )
    .filter((p) => !isNaN(p) && p > 0);
}, [products]);

  const maxProductPrice = useMemo(() => {
    return Math.max(
      ...products.map((p) =>
        parseFloat(p.priceRange?.minVariantPrice?.amount || "0")
      )
    );
  }, [products]);

  const [maxPrice, setMaxPrice] = useState(maxProductPrice)

  console.log(products.slice(0, 3));

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
      {/* FILTER BAR */}
      <div className="flex flex-col gap-3 rounded-2xl border bg-white p-4 md:flex-row md:items-center md:justify-between">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter results..."
          className="w-full rounded-full border px-4 py-2 text-sm md:w-64"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border px-3 py-2 text-sm"
        >
          <option value="default">Default</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

        <div className="flex items-center gap-2 text-sm">
          <span>
            Max £{maxPrice} (range £0- £{maxProductPrice})
          </span>

          <input
            type="range"
            min={0}
            max={maxProductPrice}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4 pb-14 md:grid-cols-4 md:gap-6">
        {filtered.map((node: ProductNode) => (
          <Link
            key={node.id}
            href={`/products/${node.handle}`}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg"
          >
            <div className="aspect-square overflow-hidden bg-gray-100">
              <Image
                src={node.images.edges[0]?.node.url}
                width={600}
                height={600}
                alt={node.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
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