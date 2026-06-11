'use client'
import { useEffect, useRef, useState } from "react";

type Panel = {
  title?: string;
  link?: string;
  backgroundImage?: { url?: string };
};

type ValidPanel = {
  title: string;
};

type Props = {
  data: {
    marqueeItemsCollection?: {
      items: Panel[];
    };
  };
};
export function Marquee({ data }: Props) {
  const panels: ValidPanel[] =
    (data.marqueeItemsCollection?.items ?? []).filter(
      (p): p is ValidPanel =>
        !!p?.title
    );

    const trackRef = useRef<HTMLDivElement>(null);
    const [distance, setDistance] = useState(0);

    const looped = [...panels, ...panels];

    useEffect(() => {
      if (!trackRef.current) return;

      // measure half the scroll width (because we duplicated content)
      const fullWidth = trackRef.current.scrollWidth;
      setDistance(fullWidth / 2);
    }, [panels.length]);
  return (
     <div className="border-y border-border bg-foreground py-4 text-background overflow-hidden">
      <div
        className="flex w-max items-center gap-8"
        style={{
          "--marquee-distance": `${distance}px`,
          animation: distance > 0 ? "marquee 28s linear infinite" : "none",
        } as React.CSSProperties}
        ref={trackRef}
      >
        {looped.map((panel, i) => (
          <span key={i} className="flex items-center gap-8 shrink-0">
            <span className="font-heading text-xl font-medium md:text-2xl">
              {panel.title}
            </span>
            <span className="text-accent" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}