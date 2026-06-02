import Link from "next/link";
import { contentfulFetch } from "@/lib/contentful";
import { GET_FOOTER } from "@/lib/queries";

export default async function Footer() {
  const footerData = await contentfulFetch(GET_FOOTER);

  const footer =
    footerData?.data?.footerCollection?.items?.[0];
  return (
    <footer className="mt-16 border-t border-black/10 bg-black/3">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          
          <Link href="/" className="flex items-center gap-3">

            {/* SMALL LOGO MARK */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-black/5 text-sm font-black uppercase tracking-widest text-black">
              S
            </div>

            {/* TEXT LOGO */}
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black uppercase tracking-[0.2em] text-black">
                Summit
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.45em] text-gray-500">
                Snow Supply
              </span>
            </div>
          </Link>

          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            {footer?.footerBlurb}
          </p>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            {footer?.menu1Title}
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            {footer?.menu1LinksCollection?.items?.map(
              (link: { label: string; url: string }) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className="hover:text-black transition"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            {footer?.menu2Title}
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            {footer?.menu2LinksCollection?.items?.map(
              (link: { label: string; url: string }) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className="hover:text-black transition"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* TRUST */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            {footer?.menu3Title}
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            {footer?.menu3LinksCollection?.items?.map(
              (link: { label: string; url: string }) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className="hover:text-black transition"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-black/10 bg-black/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-gray-500 md:flex-row">

          <p> © {new Date().getFullYear()} {footer?.copyright}</p>

          <div className="flex gap-6">
            {footer?.copyrightBarLinksCollection?.items?.map(
              (link: { label: string; url: string }) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    className="hover:text-black transition"
                  >
                    {link.label}
                  </Link>
              )
            )}
          </div>

        </div>
      </div>

    </footer>
  );
}