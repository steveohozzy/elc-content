"use client";

import { useEffect, useRef, useState } from "react";
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

export default function FeaturedProductsCarousel({
  products,
}: {
  products: { node: ProductNode }[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  // ---------------- MEASURE ----------------
  const measure = () => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const first = track.children[0] as HTMLElement;
    if (!first) return;

    const cardWidth = first.getBoundingClientRect().width;
    const gap = 24;

    const containerWidth = container.clientWidth;
    const visible = Math.floor(containerWidth / (cardWidth + gap));

    setStep(cardWidth + gap);
    setVisibleCount(Math.max(1, visible));
  };

  useEffect(() => {
    measure();

    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(container);

    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [products]);

  const maxIndex = Math.max(products.length - visibleCount, 0);

  // ---------------- MOVE ----------------
  const moveTo = (i: number) => {
    const track = trackRef.current;
    if (!track || !step) return;

    const clamped = Math.max(0, Math.min(i, maxIndex));

    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(-${clamped * step}px)`;

    setIndex(clamped);
  };

  const next = () => {
    moveTo(index >= maxIndex ? 0 : index + 1);
  };

  const prev = () => {
    moveTo(index <= 0 ? maxIndex : index - 1);
  };

  // ---------------- SWIPE ----------------
  const startX = useRef(0);
  const currentX = useRef(0);
  const dragging = useRef(false);

  const SWIPE_THRESHOLD = 40;

  const onStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;

    startX.current =
      "touches" in e ? e.touches[0].clientX : e.clientX;

    const track = trackRef.current;
    if (track) track.style.transition = "none";
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging.current || !step) return;

    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = x - startX.current;

    currentX.current = x;

    const track = trackRef.current;
    if (!track) return;

    // subtle follow movement (feels nice, not full drag)
    track.style.transform = `translateX(calc(-${
      index * step
    }px + ${diff * 0.25}px))`;
  };

  const onEnd = () => {
    if (!dragging.current) return;

    dragging.current = false;

    const diff = currentX.current - startX.current;

    const track = trackRef.current;
    if (track) track.style.transition = "transform 0.4s ease";

    if (diff > SWIPE_THRESHOLD) {
      prev();
    } else if (diff < -SWIPE_THRESHOLD) {
      next();
    } else {
      // snap back
      moveTo(index);
    }
  };

  // ---------------- RENDER ----------------
  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* LEFT */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow cursor-pointer"
      >
        ←
      </button>

      {/* RIGHT */}
      <button
        onClick={next}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow cursor-pointer"
      >
        →
      </button>

      {/* TRACK */}
      <div
        ref={trackRef}
        className="flex gap-6 will-change-transform select-none"
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
        style={{ userSelect: "none" }}
        onDragStart={(e) => e.preventDefault()}
      >
        {products.map(({ node }) => (
          <Link
            key={node.id}
            href={`/products/${node.handle}`}
            className="
              group
              w-[260px]
              shrink-0
              overflow-hidden
              rounded-xl
              border border-gray-200
              bg-white
              transition
              hover:shadow-lg
            "
          >
            {/* IMAGE */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Image
                src={node.images.edges[0]?.node.url}
                width={600}
                height={600}
                alt={node.title}
                draggable={false}
                className="
                  absolute inset-0
                  h-full w-full object-cover
                  transition duration-500
                  group-hover:scale-110
                  group-hover:opacity-0
                "
                sizes="(max-width: 768px) 50vw, 25vw"
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

            {/* TEXT */}
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
    </div>
  );
}