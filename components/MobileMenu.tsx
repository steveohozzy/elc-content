"use client";

import { useState } from "react";
import Link from "next/link";
import SearchPreview from "./SearchPreview";

type Collection = {
  node: {
    id: string;
    title: string;
    handle: string;
  };
};

export default function MobileMenu({
  collections,
}: {
  collections: Collection[];
}) {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <>
      {/* MENU BUTTON */}
      <button
        onClick={() =>
          setMobileMenuOpen(true)
        }
        className="
          flex h-11 w-11 items-center
          justify-center rounded-xl
          border border-white/10
          bg-white/5 text-white
          backdrop-blur-xl
        "
      >
        ☰
      </button>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-50 transition duration-300 ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() =>
            setMobileMenuOpen(false)
          }
        />

        {/* DRAWER */}
        <div
          className={`absolute left-0 top-0 h-full w-80 border-r border-white/10 bg-black p-6 transition-transform duration-300 ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          {/* TOP */}
          <div className="mb-10 flex items-center justify-between">

            <div>
              <h2
                className="
                  text-2xl font-black uppercase
                  tracking-[0.2em] text-white
                "
              >
                Summit
              </h2>

              <p
                className="
                  mt-1 text-[10px]
                  uppercase tracking-[0.35em]
                  text-gray-500
                "
              >
                Snow Supply
              </p>
            </div>

            <button
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="
                flex h-10 w-10 items-center
                justify-center rounded-xl
                border border-white/10
                bg-white/5 text-white
              "
            >
              ✕
            </button>
          </div>

          {/* SEARCH */}
          <div className="mb-8">
            <SearchPreview />
          </div>

          {/* NAV */}
          <nav className="flex flex-col gap-6">
            {collections.map(({ node }) => (
              <Link
                key={node.id}
                href={`/collections/${node.handle}`}
                className="
                  text-lg font-semibold uppercase
                  tracking-[0.15em] text-gray-300
                  transition hover:text-white
                "
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                {node.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}