import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

type TextSectionData = {
  content?: {
    json: Document;
  };
};

export default function TextSection({
  data,
}: {
  data: TextSectionData;
}) {
  return (
    <section className="prose mx-auto py-10">
      {data.content?.json &&
        documentToReactComponents(data.content.json)}
    </section>
  );
}