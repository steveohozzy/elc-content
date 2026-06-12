import Image from "next/image";
import { getPost } from "@/lib/wordpress";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPost(slug);

  return (
    <article className="mx-auto max-w-4xl px-4 py-20">
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={630}
          className="mb-10 h-auto w-full rounded-3xl object-cover"
        />
      )}

      <h1 className="mb-8 text-4xl font-bold">
        {post.title}
      </h1>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: post.contentHtml,
        }}
      />
    </article>
  );
}