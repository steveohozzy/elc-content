import Link from "next/link";

type Props = {
  data: {
    title?: string;
    categoriesCollection?: {
      items: {
        title?: string;
        subtitle?: string;
        link?: string;
      }[];
    };
  };
};

export default function FeaturedCategories({
  data,
}: Props) {
  const categories =
    data.categoriesCollection?.items ?? [];

  return (
    <section className="mx-auto mt-4 max-w-7xl px-4">
      {data.title && (
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-12 bg-gray-300" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            {data.title}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((cat, i) => (
          <Link
            key={i}
            href={cat.link ?? "#"}
            className="group relative overflow-hidden rounded-2xl border bg-black text-white"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />

            <div className="p-6">
              <p className="text-lg font-bold uppercase tracking-wide">
                {cat.title}
              </p>

              <p className="mt-2 text-xs text-white/60">
                {cat.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}