"use client";

import Image from "next/image";
import { useState, useRef } from "react";

type MediaNode =
  | {
      __typename: "MediaImage";
      image?: { url: string; altText?: string };
    }
  | {
      __typename: "Video";
      sources?: { url: string; mimeType: string }[];
    }
  | {
      __typename: "ExternalVideo";
      embeddedUrl: string;
    };

type MediaEdge = { node: MediaNode };

// ----------------------------
// Shopify image size helper
// ----------------------------
const getShopifyImage = (url: string, width: number) => {
  if (!url) return "";

  try {
    const u = new URL(url);
    u.searchParams.set("width", width.toString());
    return u.toString();
  } catch {
    return url;
  }
};

const cleanYoutubeUrl = (url?: string) => {
  if (!url) return "";

  try {
    const u = new URL(url);

    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }

    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }

    return url;
  } catch {
    return url;
  }
};

export default function ProductMediaGallery({
  media,
}: {
  media?: { edges?: MediaEdge[] };
}) {
  const items = media?.edges ?? [];
  const [active, setActive] = useState(0);
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const trackRef = useRef<HTMLDivElement | null>(null);

  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  const goTo = (i: number) => {
    if (i < 0) return setActive(items.length - 1);
    if (i >= items.length) return setActive(0);
    setActive(i);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;

    startX.current = e.clientX;
    currentX.current = e.clientX;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    currentX.current = e.clientX;

    const diff = currentX.current - startX.current;

    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(calc(${
        -active * 100
      }% + ${diff}px))`;
    }
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;

    const diff = currentX.current - startX.current;
    isDragging.current = false;

    if (trackRef.current) {
      trackRef.current.style.transition = "transform 300ms ease";
    }

    if (diff < -60) goTo(active + 1);
    else if (diff > 60) goTo(active - 1);
    else goTo(active);
  };

  if (!items.length) {
    return (
      <div className="aspect-square flex items-center justify-center border bg-gray-100">
        No media
      </div>
    );
  }

  const renderMedia = (item: MediaNode, i?: number) => {
    switch (item.__typename) {
      case "MediaImage": {
        const src = item.image?.url || "";

        return (
          <Image
            src={src}
            alt={item.image?.altText || ""}
            width={1200}
            height={1200}
            sizes="(min-width: 768px) 50vw, 100vw"
            draggable={false}
            className="h-full w-full object-cover"
          />
        );
      }

      case "Video":
        return (
          <video controls className="h-full w-full object-cover">
            <source
              src={item.sources?.[0]?.url}
              type={item.sources?.[0]?.mimeType}
            />
          </video>
        );

      case "ExternalVideo":
        return (
          <iframe
            src={cleanYoutubeUrl(item.embeddedUrl)}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );

      default:
        return null;
    }
  };

  const isVideoSlide = (index: number) =>
    items[index]?.node.__typename !== "MediaImage";

  return (
    <div className="space-y-4">

      {/* ================= DESKTOP GRID ================= */}
      <div className="hidden md:grid grid-cols-2">
        {items.map((item, i) => {
          const node = item.node;

          const isImage = node.__typename === "MediaImage";

          const src =
            node.__typename === "MediaImage"
              ? node.image?.url || ""
              : "";

          const zoomSrc = getShopifyImage(src, 1600);
          const gridSrc = getShopifyImage(src, 600);

          return (
            <div
              key={i}
              className="aspect-[4/5] overflow-hidden relative cursor-zoom-in"
              onMouseMove={(e) => {
                if (!isImage) return;

                const rect = e.currentTarget.getBoundingClientRect();

                setZoomPos({
                  x: ((e.clientX - rect.left) / rect.width) * 100,
                  y: ((e.clientY - rect.top) / rect.height) * 100,
                });
              }}
              onMouseEnter={() => {
                if (isImage) setZoomedIndex(i);
              }}
              onMouseLeave={() => {
                setZoomedIndex(null);
              }}
            >
              {isImage ? (
                <div
                  className="h-full w-full transition-transform duration-200"
                  style={{
                    transform:
                      zoomedIndex === i ? "scale(2)" : "scale(1)",
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  }}
                >
                  <Image
                    src={zoomedIndex === i ? zoomSrc : gridSrc}
                    alt={item.node.image?.altText || ""}
                    width={1600}
                    height={2000}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                renderMedia(item.node)
              )}
            </div>
          );
        })}
      </div>

      {/* ================= MOBILE CAROUSEL ================= */}
      <div className="md:hidden">
        <div
          className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-white select-none"
          style={{ touchAction: "pan-y" }}
        >
          <div
            ref={trackRef}
            className="flex h-full w-full transition-transform duration-300"
            style={{
              transform: `translateX(-${active * 100}%)`,
            }}
          >
            {items.map((item, i) => (
              <div key={i} className="min-w-full h-full flex-shrink-0">
                {renderMedia(item.node, i)}
              </div>
            ))}
          </div>

          {!isVideoSlide(active) && (
            <div
              className="absolute inset-0 z-10"
              style={{ touchAction: "none" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            />
          )}

          <button
            onClick={() => goTo(active - 1)}
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
            aria-label="Previous slide"
          >
            ‹
          </button>

          <button
            onClick={() => goTo(active + 1)}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </div>

    </div>
  );
}