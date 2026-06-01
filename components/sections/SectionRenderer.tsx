import HeroSection from "./Hero";
import TextSection from "./Text";
import CTASection from "./CTA";
import ShopifyCollectionSection from "./ShopifyCollectionSection";
import type { Document } from "@contentful/rich-text-types";

/* ---------------------------
   TYPES
---------------------------- */

type HeroSectionData = {
  __typename: "HeroSection";
  headline?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: { url: string };
};

type TextSectionData = {
  __typename: "TextSection";
  content?: {
    json: Document;
  };
};

type CTASectionData = {
  __typename: "CtaSection";
  text?: string;
  buttonText?: string;
  buttonLink?: string;
};

type ShopifyCollectionSectionData = {
  __typename: "ShopifyCollectionSection";
  collectionId: string;
};

type Section = HeroSectionData | TextSectionData | CTASectionData | ShopifyCollectionSectionData;
/* ---------------------------
   RENDERER
---------------------------- */

export default function SectionRenderer({
  sections,
}: {
  sections: Section[];
}) {
  return (
    <>
      {sections?.map((section, i) => {
        switch (section.__typename) {
          case "HeroSection":
            return <HeroSection key={i} data={section} />;

          case "TextSection":
            return <TextSection key={i} data={section} />;

          case "CtaSection":
            return <CTASection key={i} data={section} />;

          case "ShopifyCollectionSection":
            return (
              <ShopifyCollectionSection
                key={i}
                data={section}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}