import Image from "next/image";
import Link from "next/link";

type LifestyleBannerSectionData = {
  title?: string;
  blurb?: string;

  backgroundImage?: {
    url: string;
    title?: string;
  };

  ctaText?: string;
  ctaLink?: string;

};

export default function LifestyleBannerSection({
  data,
}: {
  data: LifestyleBannerSectionData;
}) {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-3xl bg-black">

        <Image
          src={
            data?.backgroundImage?.url
              ? `${data.backgroundImage.url}`
              : "https://images.unsplash.com/photo-1590461283969-47fedf408cfd?fm=jpg&q=60&w=3000&auto=format&fit=crop"
          }
          alt={data?.backgroundImage?.title || "Hero image"}
          width={1920}
          height={1080}
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="h-[300px] w-full object-cover opacity-60 md:h-[420px]"
        />

        <div className="absolute inset-0 flex flex-col justify-center p-10 text-white">
          <h3 className="text-3xl font-black md:text-5xl">
            {data?.title || "Built for the mountain"}
          </h3>

          <p className="mt-4 max-w-xl text-sm text-white/70 md:text-base">
            {data?.blurb || "Performance snow gear designed for riders who push conditions, terrain, and limits."}
          </p>

          <Link
            href={data?.ctaLink || "/collections/hydrogen"}
            className="mt-6 w-fit rounded-full border border-white bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition duration-300 hover:scale-105 hover:bg-black/40 hover:text-white hover:border-white/30"
          >
            {data?.ctaText || "Shop Collection"}
          </Link>
        </div>
      </div>
    </section>
  );
}
