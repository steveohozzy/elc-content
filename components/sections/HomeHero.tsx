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
    <section className="relative overflow-hidden bg-black py-24 md:py-36">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <Image
            src={
              data?.backgroundImage?.url
                ? `${data?.backgroundImage.url}`
                : "https://images.unsplash.com/photo-1590461283969-47fedf408cfd?fm=jpg&q=60&w=3000&auto=format&fit=crop"
            }
            alt={data?.backgroundImage?.title || "Hero image"}
            width={1920}
            height={1080}
            priority
            className="h-full w-full object-cover opacity-60"
            quality={75}
          />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center">

          {/* TAG */}
          <div className="mb-6 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.35em] text-white backdrop-blur-md">
            {data?.tagline || "Winter 2026 Collection"}
          </div>

          {/* TITLE */}
          <h1 className="max-w-6xl text-5xl font-black uppercase leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {data?.title || "Ride Beyond"}
            <span className="block text-white/60">
              {data?.titleAccent || "The Limits"}
            </span>  
          </h1>

          {/* SUBTITLE */}
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-gray-300 md:text-xl">
            {data?.subtitle ||
              "Premium snowboards, outerwear, and mountain gear built for riders chasing powder, park laps, and alpine adventure."}
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link
              href={data?.ctaPrimaryLink || "/collections/hydrogen"}
              className="rounded-full border border-white bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition duration-300 hover:scale-105 hover:bg-white/10 hover:text-white hover:border-white/30 hover:border"
            >
              {data?.ctaPrimaryText || "Shop Now"}
            </Link>

            <Link
              href={data?.ctaSecondaryLink || "/collections/automated-collection"}
              className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-black hover:scale-105"
            >
              {data?.ctaSecondaryText || "Explore"}
            </Link>

          </div>
        </div>

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black to-transparent" />
      </section>
  );
}