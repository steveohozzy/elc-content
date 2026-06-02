"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

export default function SearchPreview({
  onSearch,
}: {
  onSearch?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductNode[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query) return;
    
    const timeout = setTimeout(async () => {
      setLoading(true);

      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        query,
        first: 3,
        after: null,
      }),
      });

      const data = await res.json();

      const products =
        data?.data?.products?.edges?.map(
          (edge: { node: ProductNode }) => edge.node
        ) ?? [];

      setResults(products);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);


  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    onSearch?.();
    setOpen(false);

    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mt-4 md:mt-0">
      {/* INPUT */}
      <form onSubmit={handleSubmit}>
  <label htmlFor="search" className="sr-only">Search</label>
  <input
    value={query}
    onChange={(e) => {
      setQuery(e.target.value);
      setOpen(true);
    }}
    onFocus={() => setOpen(true)}
    placeholder="Search products..."
    className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-black"
  />
</form>

      {/* DROPDOWN */}
      {open && (query || results.length > 0) && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border bg-white shadow-lg">
          {loading ? (
            <div className="p-4 text-sm text-gray-500">
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">
              No results found
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.handle}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-3 transition hover:bg-gray-50"
                >
                  <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={
                        p.images.edges[0]?.node
                          .url
                      }
                      alt={p.title}
                      width={60}
                      height={60}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {p.title}
                    </p>

                    <p className="text-xs text-gray-500">
                      £
                      {
                        p.priceRange
                          ?.minVariantPrice
                          ?.amount
                      }
                    </p>
                  </div>
                </Link>
              ))}
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={() => {
                  setOpen(false);
                  onSearch?.();
                }}
                className="block border-t p-3 text-sm text-gray-600 hover:bg-gray-50"
              >
                Search for “{query}” →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}