import { getPosts } from "@/lib/wordpress";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "@/components/pagination";
import SectionRenderer from "@/components/sections/SectionRenderer";
import { getBlogPage } from "@/lib/getBlog";

export default async function BlogPage() {
  const { posts, hasNextPage } = await getPosts(1, 12);

   const page = await getBlogPage();

  if (!page) {
    return <div>Homepage not found</div>;
  }

  return (
    <>
      <SectionRenderer sections={page.sectionsCollection?.items ?? []} />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 max-w-7xl px-8">
        {posts.map((post) => (
          <Link
            key={post.id}
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
        currentPage={1}
        hasNextPage={hasNextPage}
      />
    </>
  );
}