import Link from "next/link";
import Image from "next/image";
import SectionRenderer from "@/components/sections/SectionRenderer";
import { getBlogPage } from "@/lib/getBlog";

type Section = {
  __typename?: string;
  blogPostsCollection?: {
    items?: Post[];
  };
};

type Post = {
  slug?: string;
  title?: string;
  tag?: string;
  image?: {
    url?: string;
  };
};

export default async function BlogPage() {
  const page = await getBlogPage();

  if (!page) {
    return <div>Blog page not found</div>;
  }
  

  const blogSection = page.sectionsCollection?.items?.find(
    (section: Section) => section.__typename === "BlogSection"
  );

  const posts = blogSection?.blogPostsCollection?.items ?? [];

  const filteredSections =
    page.sectionsCollection?.items?.filter(
      (section: Section) => section.__typename !== "BlogSection"
    ) ?? [];

  return (
    <>
      <SectionRenderer sections={filteredSections} />

      <div className="mx-auto grid max-w-7xl gap-6 px-8 md:grid-cols-2 xl:grid-cols-4">
        {posts.map((post: Post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group"
          >
            <article className="h-full overflow-hidden rounded-[2rem] border border-border bg-card transition-shadow hover:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image?.url || "/images/heritage.png"}
                  alt={post.title || "Blog image"}
                  width={600}
                  height={450}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {post.tag && (
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                    {post.tag}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  {post.title}
                </h2>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}