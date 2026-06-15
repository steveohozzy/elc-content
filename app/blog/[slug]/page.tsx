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
  className="
    prose prose-lg max-w-none

    prose-headings:font-heading
    prose-h2:text-4xl
    prose-h2:mt-14
    prose-h2:mb-6

    prose-h3:text-3xl
    prose-h3:mt-10
    prose-h3:mb-4

    prose-h4:text-2xl
    prose-h4:mt-8
    prose-h4:mb-3

    prose-p:text-foreground/80
    prose-p:leading-8

    prose-a:text-primary
    prose-a:font-medium
    prose-a:no-underline
    hover:prose-a:underline

    prose-ul:space-y-3
    prose-li:leading-7

    prose-img:rounded-3xl
    prose-img:shadow-lg

    [&_.section-products]:my-16

    [&_.author-info-sm]:mb-10
    [&_.author-info-sm]:flex
    [&_.author-info-sm]:items-center
    [&_.author-info-sm]:gap-4

    [&_.author-info-sm-details]:rounded-2xl
    [&_.author-info-sm-details]:border
    [&_.author-info-sm-details]:bg-muted/50
    [&_.author-info-sm-details]:px-5
    [&_.author-info-sm-details]:py-3

    [&_.author-info-sm-details_p]:m-0
    [&_.author-info-sm-details_p]:text-sm
    [&_.author-info-sm-details_p]:uppercase
    [&_.author-info-sm-details_p]:tracking-wider

    [&_.share-icons]:my-12
    [&_.share-icons]:border-t
    [&_.share-icons]:pt-8

    [&_.blog-share]:mt-4
    [&_.blog-share]:flex
    [&_.blog-share]:gap-3

    [&_.share-icon]:flex
    [&_.share-icon]:size-10
    [&_.share-icon]:items-center
    [&_.share-icon]:justify-center
    [&_.share-icon]:rounded-full
    [&_.share-icon]:bg-muted
    [&_.share-icon]:transition-colors
    [&_.share-icon:hover]:bg-primary
    [&_.share-icon:hover]:text-primary-foreground

    [&_.blog-cat-link]:my-12
    [&_.blog-cat-link]:rounded-3xl
    [&_.blog-cat-link]:bg-primary
    [&_.blog-cat-link]:p-8
    [&_.blog-cat-link]:text-primary-foreground

    [&_.blog-cat-link_h4]:m-0
    [&_.blog-cat-link_a]:text-primary-foreground

    [&_.author-info]:mt-16
    [&_.author-info]:rounded-3xl
    [&_.author-info]:border
    [&_.author-info]:bg-card
    [&_.author-info]:p-8

    [&_.author-info_h2]:mt-0
    [&_.author-info_h2]:mb-6

    [&_.author-info_h4]:mb-2
    [&_.author-info_h4]:font-heading
    [&_.author-info_h4]:text-2xl

    [&_.author-link_a]:font-medium
    [&_.author-link_a]:text-primary

    [&_.products]:not-prose
    [&_.row-products]:grid
    [&_.row-products]:grid-cols-2
    [&_.row-products]:gap-6
    md:[&_.row-products]:grid-cols-4

    [&_.card-product]:overflow-hidden
    [&_.card-product]:rounded-2xl
    [&_.card-product]:border
    [&_.card-product]:bg-card
    [&_.card-product]:transition-shadow
    hover:[&_.card-product]:shadow-lg

    [&_.card-image_img]:aspect-square
    [&_.card-image_img]:w-full
    [&_.card-image_img]:object-cover

    [&_.card-content]:p-4

    [&_.btn-success]:mt-4
    [&_.btn-success]:inline-flex
    [&_.btn-success]:rounded-full
    [&_.btn-success]:bg-primary
    [&_.btn-success]:px-4
    [&_.btn-success]:py-2
    [&_.btn-success]:text-primary-foreground
    [&_.btn-success]:no-underline
    [&_h2]:text-primary
    [&_h2]:text-2xl
    [&_h2]:font-heading
    [&_h2]:mt-8
    [&_h2]:mb-4

    [&_h3]:text-primary
    [&_h3]:text-xl
    [&_h3]:font-heading
    [&_h3]:mt-8
    [&_h3]:mb-4

    [&_h4]:text-primary
    [&_h4]:text-xl
    [&_h4]:font-heading
    [&_h4]:mt-8
    [&_h4]:mb-4

    [&_ul]:space-y-4
    [&_li]:leading-8
    [&_li]:list-disc
    [&_li]:list-inside

    [&_p]:text-primary
    [&_p]:text-sm
    [&_p]:leading-8

    [&_a]:text-primary
    [&_a]:font-medium
    [&_a]:no-underline
    hover:[&_a]:underline

    [&_.blog-cat-link]:hidden
  "
  dangerouslySetInnerHTML={{
    __html: post.contentHtml,
  }}
/>
    </article>
  );
}