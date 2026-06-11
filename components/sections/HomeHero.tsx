import Image from "next/image";
import Link from "next/link";

type HomeHeroSectionData = {
  tagline?: string;
  title?: string;
  titleAccent?: string;
  subtitle?: string;

  backgroundImage?: {
    url: string;
    title?: string;
  };

  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;

  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
};

export default function HomeHeroSection({
  data,
}: {
  data: HomeHeroSectionData;
}) {
  return (
    <>
    <section id="top" className="relative overflow-hidden bg-background">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute -left-10 top-24 size-40 rounded-full bg-accent/60 blur-0" aria-hidden />
      <div className="pointer-events-none absolute right-10 top-10 size-24 rounded-full bg-secondary/40" aria-hidden />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 md:px-8 lg:grid-cols-2 lg:gap-12 lg:pb-24 lg:pt-16">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            {data?.tagline || "tagline"}
          </span>

          <h1 className="mt-6 text-balance font-heading text-5xl font-semibold leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {data?.title || "hero text"}{" "}
            <span className="text-primary">
              {data?.titleAccent || "hero accent"}
            </span>
          </h1>

          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            {data?.subtitle ||
              "subtitle."}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={data?.ctaPrimaryLink || "/"}
              className="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {data?.ctaPrimaryText || "Discover"}
            </Link>
            <Link
              href={data?.ctaSecondaryLink || "/"}
              className="rounded-full border border-foreground/20 px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              {data?.ctaSecondaryText || "Explore"}
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-8">
            {[
              { n: "50+", l: "Years of play" },
              { n: "1974", l: "Founded in the UK" },
              { n: "1000s", l: "Of happy memories" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-heading text-3xl font-semibold text-foreground">{s.n}</dt>
                <dd className="text-sm text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative z-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-xl">
            <Image
              src={
                data?.backgroundImage?.url
                  ? `${data?.backgroundImage.url}`
                  : "https://images.unsplash.com/photo-1590461283969-47fedf408cfd?fm=jpg&q=60&w=3000&auto=format&fit=crop"
              }
              alt={data?.backgroundImage?.title || "Hero image"}
              width={900}
              height={1000}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-secondary px-5 py-4 shadow-lg sm:block">
            <p className="font-heading text-xl font-semibold text-secondary-foreground">Play is learning</p>
            <p className="text-sm text-secondary-foreground/80">and learning is joy</p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}