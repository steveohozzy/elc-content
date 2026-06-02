import { notFound } from "next/navigation";
import SectionRenderer from "@/components/sections/SectionRenderer";
import { contentfulFetch } from "@/lib/contentful";
import { GET_PAGE } from "@/lib/queries";

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