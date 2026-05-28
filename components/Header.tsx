"use client";

import { useState } from "react";
import Link from "next/link";
import CartIcon from "./CartIcon";
import SearchPreview from "./SearchPreview";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4">
          {/* DESKTOP */}
          <div className="hidden items-center justify-between md:flex">
            {/* LEFT */}
            <div className="flex items-center gap-10">
              {/* LOGO */}
              <Link
                href="/"
                className="group flex items-center gap-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-black to-gray-700 text-white shadow-md transition group-hover:scale-105">
                  M
                </div>

                <span className="text-xl font-extrabold tracking-tight">
                  My Store
                </span>
              </Link>

              {/* NAV */}
              <nav className="flex items-center gap-8">
                <Link
                  href="/collections/hydrogen"
                  className="relative text-sm font-medium text-gray-700 transition hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
                >
                  Hydrogen
                </Link>

                <Link
                  href="/collections/automated-collection"
                  className="relative text-sm font-medium text-gray-700 transition hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
                >
                  Automated
                </Link>
              </nav>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <SearchPreview />

              <div className="transition hover:scale-105">
                <CartIcon />
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden">
            {/* TOP BAR */}
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setMobileMenuOpen(true)
                }
                className="text-2xl"
              >
                ☰
              </button>

              {/* LOGO */}
              <Link
                href="/"
                className="flex items-center gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-black to-gray-700 text-sm font-bold text-white">
                  M
                </div>
                <span className="text-lg font-bold">
                  My Store
                </span>
              </Link>

              <div className="transition hover:scale-105">
                <CartIcon />
              </div>
            </div>

            {/* SEARCH */}
            <SearchPreview />
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-50 transition ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() =>
            setMobileMenuOpen(false)
          }
        />

        {/* DRAWER */}
        <div
          className={`absolute left-0 top-0 h-full w-80 bg-white p-6 shadow-xl transition-transform duration-300 ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          {/* HEADER */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold">
              Menu
            </h2>

            <button
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="text-2xl"
            >
              ✕
            </button>
          </div>

          {/* SEARCH */}
          <form action="/search" className="mb-6">
            <input
              type="text"
              name="q"
              placeholder="Search..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </form>

          {/* NAV */}
          <nav className="flex flex-col gap-5">
            <Link
              href="/collections/hydrogen"
              className="text-lg font-medium text-gray-800 transition hover:translate-x-1 hover:text-black"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Hydrogen
            </Link>

            <Link
              href="/collections/automated-collection"
              className="text-lg font-medium text-gray-800 transition hover:translate-x-1 hover:text-black"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Automated
            </Link>

            <CartIcon onClick={() => setMobileMenuOpen(false)} />
          </nav>
        </div>
      </div>
    </>
  );
}