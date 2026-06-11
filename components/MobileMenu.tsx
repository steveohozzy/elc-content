"use client";

import { useState } from "react";

export default function MobileMenu({
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* MENU BUTTON */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="
          flex h-11 w-11 items-center justify-center
          rounded-2xl border border-white/10
          bg-white/5 text-white backdrop-blur-xl
          transition duration-300
          hover:border-white/20 hover:bg-white/10 hover:scale-105
          md:hidden
        "
      >
        ☰
      </button>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 z-50 transition duration-300 ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* DRAWER */}
        <div
          className={`
            absolute left-0 top-0 h-screen w-full max-w-sm
            overflow-hidden border-r border-white/10
            bg-gradient-to-br from-black via-zinc-950 to-black
            shadow-2xl transition-transform duration-300
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* SHEEN */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.06)_45%,transparent_100%)] opacity-60" />

          {/* INNER */}
          <div className="relative z-10 flex h-full flex-col p-6">

            {/* TOP */}
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-white">
                  Summit
                </h2>
                <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-gray-500">
                  Snow Supply
                </p>
              </div>

              {/* ✅ ONLY RENDER WHEN OPEN */}
              {mobileMenuOpen && (
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-2xl border border-white/10
                    bg-white/5 text-white backdrop-blur-xl
                    transition duration-300
                    hover:border-white/20 hover:bg-white/10 hover:rotate-90
                  "
                >
                  ✕
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}