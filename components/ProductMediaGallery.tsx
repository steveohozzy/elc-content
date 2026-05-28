"use client";

import { useState } from "react";
import Image from "next/image";



type MediaNode =
  | {
      __typename: "MediaImage";
      image?: {
        url: string;
        altText?: string;
      };
    }
  | {
      __typename: "Video";
      sources?: {
        url: string;
        mimeType: string;
      }[];
    }
  | {
      __typename: "ExternalVideo";
      embeddedUrl: string;
    };

type MediaEdge = {
  node: MediaNode;
};
const cleanYoutubeUrl = (url?: string) => {
  if (!url) return "";

  try {
    const u = new URL(url);

    // watch?v=
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }

    // youtu.be short links
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
  media?: {
    edges?: MediaEdge[];
  };
}) {
  const items = media?.edges ?? [];
  const [active, setActive] = useState(0);

  const activeItem = items[active]?.node;

  const renderMedia = (item?: MediaNode) => {
    if (!item) return null;

    switch (item.__typename) {
      case "MediaImage":
        return item.image?.url ? (
          <Image
            src={item.image.url}
            alt={item.image.altText || "Product image"}
            width={900}
            height={900}
            className="h-full w-full object-cover"
            priority
          />
        ) : null;

      case "Video":
        return item.sources?.[0]?.url ? (
          <video controls className="h-full w-full object-cover">
            <source
              src={item.sources[0].url}
              type={item.sources[0].mimeType}
            />
          </video>
        ) : null;

      case "ExternalVideo":
        const embedUrl = cleanYoutubeUrl(item.embeddedUrl);

        return (
          <iframe
            src={embedUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );

      default:
        return null;
    }
  };

  if (!items.length) {
    return (
      <div className="aspect-square rounded-2xl border bg-gray-100 flex items-center justify-center text-gray-400">
        No media found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* MAIN MEDIA */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm aspect-square">
        {renderMedia(activeItem)}
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`cursor-pointer h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border transition ${
              i === active ? "border-black" : "border-gray-200"
            }`}
          >
            {item.node.__typename === "MediaImage" ? (
              item.node.image?.url ? (
                <Image
                  src={item.node.image.url}
                  alt=""
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              ) : null
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-black text-white text-xs">
                ▶
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}