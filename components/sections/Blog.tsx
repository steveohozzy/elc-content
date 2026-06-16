import Image from "next/image";
import Link from "next/link";


type Post = {
  id: number;
  title: string;
  slug: string;
  tag: string;
  image?: {
    url?: string;
  };
  readLength?: string;
};

type Props = {
  data?: {
    title?: string;
    tagline?: string;
    blogPostsCollection?: {
      items?: Post[];
    };
  };
};
export function Blog({ data }: Props) {
  const panels = data?.blogPostsCollection?.items ?? [];
  return (
    <section id="blog" className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:py-28">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">{data?.tagline || "The journal"}</span>
          <h2 className="mt-3 text-balance font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            {data?.title || "Ideas, stories &amp; gentle guidance"}
          </h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          Read the journal <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {panels.map((p, i) => (
          <article
            key={i}
            className="group overflow-hidden rounded-[2rem] border border-border bg-card transition-shadow hover:shadow-xl"
          >
            <Link href={`/blog/${p.slug}`}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={p.image?.url || "/images/heritage.png"}
                alt={p.title || "Blog image"}
                width={600}
                height={450}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                {p.tag}
              </span>
            </div>
            <div className="flex flex-col p-6">
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground">{p.title}</h3>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">{p.readLength} read</span>
                <span className="flex size-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </span>
              </div>
            </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
