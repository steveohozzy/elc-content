import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contentfulFetch } from "@/lib/contentful";
import { GET_PAGE } from "@/lib/queries";
import SectionRenderer from "@/components/sections/SectionRenderer";
import { getCmsPage } from "@/lib/getCmsPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const page = await getCmsPage(slug);

  if (!page) {
    return {
      title: "Page not found",
    };
  }

  return {
    title: page?.title || "Summit Snow Supply",
    description: page?.metaDescription || "Snowboard gear and performance apparel",
  };
}

async function getPage(slug: string) {
  const data = await contentfulFetch(GET_PAGE, {
    slug,
  });

  return data?.data?.pageCollection?.items?.[0] ?? null;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = await getPage(slug);

  if (!page) {
    return notFound();
  }

  return (
    <main>
      <SectionRenderer
        sections={page.sectionsCollection?.items ?? []}
      />
    </main>
  );
}