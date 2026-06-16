import { notFound } from "next/navigation";
import Image from "next/image";
import SectionRenderer from "@/components/sections/SectionRenderer";
import { getBlogPost } from "@/lib/getBlogPost";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

type RichTextNode = {
  data?: {
    target?: {
      sys?: {
        id?: string;
      };
    };
  };
};

type ContentfulAsset = {
  sys: {
    id: string;
  };
  url: string;
  title?: string;
  description?: string;
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = await getBlogPost(slug);

  const assets =
    page.pageContent?.links?.assets?.block ?? [];

  const assetMap: Record<string, ContentfulAsset> = Object.fromEntries(
    assets.map((a: ContentfulAsset) => [a.sys.id, a])
  );

  const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: RichTextNode) => {
      const id = node?.data?.target?.sys?.id;
      if (!id) return null;

      const asset = assetMap[id];

      if (!asset?.url) return null;

      const url = asset.url.startsWith("http")
        ? asset.url
        : `https:${asset.url}`;

      return (
        <Image
          src={url}
          alt={asset?.description || ""}
          className="my-10 w-full rounded-3xl shadow-lg"
          width={600}
          height={450}
        />
      );
    },
  },
};

  if (!page) {
    notFound();
  }

  return (
    <>
      <SectionRenderer
        sections={page.sectionsCollection?.items ?? []}
      />
      <div
        className="
    mx-auto max-w-4xl items-center gap-10 px-4 pb-16 pt-10 md:px-8 lg:gap-12 lg:pb-24 lg:pt-16
    [&_h2]:text-primary
    [&_h2]:text-3xl
    [&_h2]:font-heading
    [&_h2]:mt-8
    [&_h2]:mb-4

    [&_h3]:text-primary
    [&_h3]:text-2xl
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
    [&_li]:leading-8
    [&_li]:list-disc
    [&_li]:list-inside

    [&_li>p]:m-0
    [&_li>p]:inline

    [&_p]:text-foreground
    [&_p]:leading-8

    [&_a]:text-primary
    [&_a]:font-medium
    [&_a]:no-underline
    hover:[&_a]:underline

    [&_.blog-cat-link]:hidden
  "
      >
      {page.pageContent?.json &&
          documentToReactComponents(page.pageContent.json, options)}
      </div>
    </>
  );
}