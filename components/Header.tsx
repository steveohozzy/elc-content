"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type MenuItem = {
  title: string;
  slug: string;
};

export default function Header({
  menuItems = [],
}: {
  menuItems: MenuItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-green-800/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-20 items-center justify-between">
            <Link href="/">
              <div className="relative flex h-11">
                <Image
                  src="https://www.elc.co.uk/medias/site-logo.svg?context=bWFzdGVyfGltYWdlc3wzNDcwN3xpbWFnZS9zdmcreG1sfGFXMWhaMlZ6TDJnNFppOW9ZV0l2T1RFNE56WTNNVGsyTlRjeU5pNXpkbWN8MDMyOGQ4OTBmM2VlYzg2Yzc1Nzc4YzQyNTAxNmI1OWUyNGY3YzE1OTQzZjkxYTFlYjA3NGQ0ZmJiZDM2MjcyZQ"
                  alt="ELC"
                  width={400}
                  height={200}
                />
              </div>
            </Link>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
              className="relative flex h-12 w-12 items-center justify-center cursor-pointer"
            >
              <div className="relative h-6 w-6">
                <span
                  className={`
                    absolute left-0 top-1 h-0.5 w-6 bg-white
                    transition-all duration-300
                    ${open ? "translate-y-2 rotate-45" : ""}
                  `}
                />

                <span
                  className={`
                    absolute left-0 top-3 h-0.5 w-6 bg-white
                    transition-all duration-300
                    ${open ? "opacity-0" : ""}
                  `}
                />

                <span
                  className={`
                    absolute left-0 top-5 h-0.5 w-6 bg-white
                    transition-all duration-300
                    ${open ? "-translate-y-2 -rotate-45" : ""}
                  `}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-50 bg-black/50 backdrop-blur-md
          transition-opacity duration-300
          ${open ? "opacity-100" : "pointer-events-none opacity-0"}
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed right-0 top-0 z-[60]
          flex h-screen w-full max-w-[420px] flex-col
          overflow-hidden
          bg-gradient-to-b
          from-green-800
          via-green-700
          to-emerald-900
          shadow-[0_0_60px_rgba(0,0,0,0.4)]
          transition-transform duration-500 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="absolute right-12 top-1/2 h-32 w-32 rounded-full bg-pink-400/20 blur-2xl" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-8 py-8">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-white/60">
              Explore
            </p>

            <h2 className="font-fraunces text-3xl text-white">
              ELC
            </h2>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="
              flex h-12 w-12 items-center justify-center
              rounded-full
              bg-white/10
              text-2xl
              text-white
              transition-all
              hover:bg-white/20
              cursor-pointer
            "
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex flex-1 flex-col px-6 py-4">
          {menuItems.map((item, index) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              onClick={() => setOpen(false)}
              className={`
                group flex items-center justify-between
                rounded-2xl
                px-5 py-4
                text-xl
                font-medium
                text-white
                transition-all duration-300
                hover:translate-x-2
                hover:bg-white/10
                ${open
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"}
              `}
              style={{
                transitionDelay: `${index * 70}ms`,
              }}
            >
              <span>{item.title}</span>

              <span
                className="
                  opacity-40
                  transition-all
                  duration-300
                  group-hover:translate-x-2
                  group-hover:opacity-100
                "
              >
                →
              </span>
            </Link>
          ))}
        </nav>

        <div className="relative z-10 p-6">
          <div
            className="
              rounded-3xl
              bg-yellow-400
              p-6
              text-green-900
              shadow-xl
            "
          >
            <h3 className="mb-2 text-xl font-bold">
              Ready to Play?
            </h3>

            <p className="mb-4 text-sm leading-relaxed">
              Discover activities, adventures and ideas for little explorers.
            </p>

            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="
                inline-flex items-center gap-2
                rounded-full
                bg-green-900
                px-5 py-3
                text-sm
                font-semibold
                text-white
                transition-transform
                hover:scale-105
              "
            >
              Start Exploring →
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}