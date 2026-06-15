import type { Document, Node } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

type StoryCallout = {
  title?: string;
  highlight?: string;
};

type StoryData = {
  title?: string;
  tagline?: string;
  imageStampText?: string;
  flip?: boolean;
  blurb?: {
    json?: Document;
  };
  image?: {
    url?: string;
  };
  calloutsCollection?: {
    items?: StoryCallout[];
  };
};

export function Story({ data }: { data?: StoryData }) {
  const callouts = data?.calloutsCollection?.items ?? [];
    const options = {
    renderNode: {
      paragraph: (_node: Node, children: React.ReactNode) => (
        <p className="mb-4 last:mb-0">{children}</p>
      ),
    },
  };

  return (
    <section id="story" className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:py-28">
      <div className={`grid items-center gap-12 lg:grid-cols-2`}>

        {/* IMAGE */}
        <div className={`relative ${data?.flip ? "order-1 lg:order-2" : "order-2 lg:order-1"}`}>
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-lg">
            <Image
              src={data?.image?.url || "/images/heritage.png"}
              alt={data?.title || "Story image"}
              width={800}
              height={700}
              className="h-full w-full object-cover"
            />
          </div>

          {data?.imageStampText && (
          <div className="absolute -right-4 -top-4 flex size-24 rotate-6 flex-col items-center justify-center rounded-full bg-primary text-center text-primary-foreground shadow-lg">
            <span className="font-heading text-2xl font-bold leading-none">
              {data?.imageStampText?.split(" ")?.[0] || "Est."}
            </span>
            <span className="font-heading text-xl font-bold leading-none">
              {data?.imageStampText?.split(" ")?.[1] || "1974"}
            </span>
          </div>
          )}
        </div>

        {/* CONTENT */}
        <div className={`${data?.flip ? "order-2 lg:order-1" : "order-1 lg:order-2"}`}>
          {data?.tagline && (
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {data?.tagline || "Our story"}
          </span>
          )}

          <h2 className="mt-3 text-balance font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            {data?.title || "A half-century of helping children grow"}
          </h2>

          <div className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {data?.blurb?.json &&
              documentToReactComponents(data.blurb.json, options)}
          </div>

          <div className="mt-4 space-y-4 text-pretty leading-relaxed text-muted-foreground">
            {data?.blurb?.json
              ? ""
              : "We’re not just a name on a box. We’re part of family stories, rainy afternoons, first words and big imaginations."}
          </div>

          {callouts.length > 0 && (
          <ul className="mt-8 space-y-4">
            {callouts.map((m, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-0.5 shrink-0 rounded-full bg-accent px-3 py-1 font-heading text-sm font-bold text-accent-foreground">
                  {m.highlight}
                </span>
                <span className="leading-relaxed text-foreground/80">
                  {m.title}
                </span>
              </li>
            ))}
          </ul>
          )}

        </div>
      </div>
    </section>
  );
}