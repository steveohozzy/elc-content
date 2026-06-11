"use client";

import { useState } from "react";
import Image from "next/image";


type Panel = {
  title?: string;
  blurb?: string;
  buttonText?: string;
  link?: string;

  imageMain?: {
    url?: string;
  };
};

type Props = {
  data?: {
    title?: string;
    tagline?: string;
    introBlurb?: string;
    panelsCollection?: {
      items?: Panel[];
    };
  };
};

export function ExpandingPanels({ data }: Props) {
  const panels = data?.panelsCollection?.items ?? [];
  const [active, setActive] = useState<number | null>(null)
  return (
    <>
      <section id="play" className="bg-muted/60 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">{data?.tagline || "Why play matters"}</span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              {data?.title || "Play isn't a break from learning. It is learning."}
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {data?.introBlurb || "Every game, every giggle, every tower that tumbles down — it&apos;s all building the foundations of a curious, capable child. Explore the four pillars of play."}
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {panels.map((p, i) => {
              const isActive = active === i;

              return (
                <button
                  key={p.title ?? i}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className={`group flex flex-col items-start rounded-3xl border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "scale-[1.02] border-transparent bg-card shadow-xl"
                      : "border-border bg-card/40 hover:bg-card"
                  }`}
                >
                  <span
                      className={`flex size-12 items-center justify-center rounded-2xl p-2 ${
                        i === 0
                          ? "bg-secondary"
                          : i === 1
                          ? "bg-primary/70"
                          : i === 2
                          ? "bg-accent"
                          : "bg-chart-4"
                      }`}
                    >
                    {p.imageMain?.url && (
                      <Image
                        src={p.imageMain.url}
                        alt={p.title ?? ""}
                        width={60}
                        height={60}
                        className="object-cover"
                      />
                    )}
                  </span>

                  <div className="mt-5 font-heading text-xl font-semibold text-foreground">
                    {p.title}
                  </div>

                  <p
                    className={`mt-2 text-sm leading-relaxed text-muted-foreground transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    {p.blurb}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}