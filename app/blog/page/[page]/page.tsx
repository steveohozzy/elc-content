import { getPosts } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "@/components/pagination";

type Props = {
  params: Promise<{
    page: string;
  }>;
};

export default async function BlogPaginatedPage({ params }: Props) {
  const { page } = await params;

  const pageNumber = Number(page);

  if (!pageNumber || pageNumber < 1) {
    notFound();
  }

  const { posts, hasNextPage } = await getPosts(pageNumber);

  // If page 1 has no posts → invalid route
  if (pageNumber === 1 && posts.length === 0) {
    notFound();
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 max-w-7xl px-8">
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
                <div
                  className="font-heading text-xl font-semibold text-foreground"
                  dangerouslySetInnerHTML={{
                    __html: post.title,
                  }}
                />
              </div>
            </article>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={pageNumber}
        hasNextPage={hasNextPage}
      />
    </>
  );
}