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
  const measure = () => {
    if (!trackRef.current) return;
    setDistance(trackRef.current.scrollWidth / 2);
  };

  measure();

  document.fonts?.ready.then(measure);

  window.addEventListener("resize", measure);
  return () => window.removeEventListener("resize", measure);
  
}, []);
  return (
    
     <div className="border-y border-border bg-foreground py-4 text-background overflow-hidden">
      <div
  key={distance}
  ref={trackRef}
  className="flex w-max items-center will-change-transform"
  style={{
    "--marquee-distance": `${distance}px`,
    animation:
      distance > 0
        ? "marquee 40s linear infinite"
        : "none",
  } as React.CSSProperties}
>
        {looped.map((panel, i) => (
          <span key={i} className="flex items-center shrink-0 pr-8">
            <span className="font-heading text-xl font-medium md:text-2xl">
              {panel.title}
            </span>
            <span className="text-accent pl-8" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}