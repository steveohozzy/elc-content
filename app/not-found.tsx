import Link from "next/link";
import { contentfulFetch } from "@/lib/contentful";
import { GET_ERROR_PAGE } from "@/lib/queries";

export default async function NotFound() {
  const data = await contentfulFetch(GET_ERROR_PAGE);

  const page = data?.data?.errorPageCollection?.items?.[0];

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black text-white overflow-hidden">

      {/* background image */}
      {page?.backgroundImage?.url && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${page.backgroundImage.url})` }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black" />

      <div className="relative z-10 mx-auto max-w-xl px-6 text-center">

        <h1 className="text-7xl font-black tracking-tight">
          {page?.title || "404"}
        </h1>

        <h2 className="mt-4 text-xl font-semibold uppercase tracking-[0.3em] text-white/80">
          {page?.subtitle || "You dropped off the trail"}
        </h2>

        <p className="mt-6 text-sm text-white/60 leading-relaxed">
          {page?.message ||
            "This route doesn’t exist or has been moved in the mountains."}
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">

          <Link
            href={page?.ctaPrimaryLink || "/"}
            className="rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-wider text-black transition hover:scale-105"
          >
            {page?.ctaPrimaryText || "Back to Base"}
          </Link>

          {page?.ctaSecondaryText && (
            <Link
              href={page.ctaSecondaryLink || "/collections"}
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white hover:text-black"
            >
              {page.ctaSecondaryText}
            </Link>
          )}

        </div>
      </div>
    </div>
  );
}