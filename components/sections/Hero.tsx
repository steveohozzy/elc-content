import Image from "next/image";
import Link from "next/link";

type HeroSectionData = {
  headline?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: {
    url: string;
  };
};

export default function HeroSection({
  data,
}: {
  data: HeroSectionData;
}) {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-28">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src={
            data.image?.url ||
            "https://images.unsplash.com/photo-1590461283969-47fedf408cfd?fm=jpg&q=60&w=3000&auto=format&fit=crop"
          }
          alt={data.headline || "Hero image"}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
          quality={75}
        />
      </div>

      {/* SOFTER OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">

        {/* HEADLINE */}
        {data.headline && (
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {data.headline}
          </h1>
        )}

        {/* SUBHEADING */}
        {data.subheading && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
            {data.subheading}
          </p>
        )}

        {/* BUTTON */}
        {data.buttonText && data.buttonLink && (
          <Link
            href={data.buttonLink}
            className="mt-10 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-black"
          >
            {data.buttonText}
          </Link>
        )}
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}