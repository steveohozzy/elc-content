import Image from "next/image";
import Link from "next/link";
import { getLatestPosts, type BlogPost } from "@/lib/wordpress";

export async function Blog({
  data,
}: {
  data?: {
    title?: string;
    tagline?: string;
  };
}) {
  const posts: BlogPost[] = [
  {
    id: "1",
    title: "Test Post",
    slug: "test-post",
    link: "/",
    tag: "Test",
  },
];

  return (
    <section
      id="blog"
      className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:py-28"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {data?.tagline || "The journal"}
          </span>

          <h2 className="mt-3 text-balance font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            {data?.title || "Ideas, stories & gentle guidance"}
          </h2>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          Read the journal
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {posts.map((post, i) => (
          <Link
            key={i}
            href={`/blog/${post.slug}`}
            className="group"
          >
            <article className="h-full overflow-hidden rounded-[2rem] border border-border bg-card transition-shadow hover:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image || "/images/heritage.png"}
                  alt={post.title}
                  width={600}
                  height={450}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                  {post.tag}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 p-6">
                <div>
                  <div
                    className="font-heading text-xl font-semibold text-foreground"
                    dangerouslySetInnerHTML={{
                      __html: post.title,
                    }}
                  />
                </div>
                <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}