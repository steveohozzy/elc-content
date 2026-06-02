import SectionRenderer from "@/components/sections/SectionRenderer";
import { getHomePage } from "@/lib/getHomePage";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();

  return {
    title: page?.title || "Summit Snnow Supply",
    description: page?.metaDescription || "The one stop shop for snowboard gear and performance apparel",
  };
}

export default async function Home() {
  const page = await getHomePage();

  if (!page) {
    return <div>Homepage not found</div>;
  }

  return (
    <main>
      <SectionRenderer sections={page.sectionsCollection?.items ?? []} />
    </main>
  );
}