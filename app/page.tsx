import { contentfulFetch } from "@/lib/contentful";
import { GET_PAGE } from "@/lib/queries";
import SectionRenderer from "@/components/sections/SectionRenderer";

export default async function Home() {
  const data = await contentfulFetch(GET_PAGE, {
    slug: "home",
  });

  const page =
    data?.data?.pageCollection?.items?.[0];

  if (!page) {
    return <div>Homepage not found</div>;
  }

  return (
    <main>
      <SectionRenderer
        sections={page.sectionsCollection?.items ?? []}
      />
    </main>
  );
}