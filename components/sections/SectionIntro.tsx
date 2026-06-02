type SectionIntroSectionData = {
  title?: string;
  subtitle?: string;
  blurb?: string;
};

export default function LifestyleBannerSection({
  data,
}: {
  data: SectionIntroSectionData;
}) {
  return (
    <div className="mx-auto mt-16 max-w-7xl px-4">

      {/* SMALL LABEL */}
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-12 bg-gray-300" />

        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
          {data?.subtitle || "Featured Collection"}
        </span>
      </div>

      {/* TITLE */}
      <div className="relative inline-block overflow-hidden">
        <h2 className="relative text-4xl font-black uppercase tracking-tight text-black md:text-6xl">
          {data?.title || "Snow Ready Gear"}
        </h2>

        {/* SHIMMER */}
        <div
          className="
            absolute inset-0
            -translate-x-full
            animate-[shimmer_5s_infinite]
            bg-gradient-to-r
            from-transparent
            via-white/70
            to-transparent
          "
        />
      </div>

      {/* SUBTEXT */}
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
        {data?.blurb ||
          "Performance-driven snowboards, technical outerwear and cold-weather essentials built for mountain life."}
      </p>
    </div>
  );
}


