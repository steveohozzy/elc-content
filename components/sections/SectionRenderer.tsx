import HomeHeroSection from "./HomeHero";
import HeroSection from "./Hero";
import LifestyleBannerSection from "./LifestyleBanner";
import TextSection from "./Text";
import CTASection from "./CTA";
import SectionIntroSection from "./SectionIntro";
import ShopifyCollectionSection from "./ShopifyCollectionSection";
import FeaturedCategoriesSection from "./FeaturedCategories";
import type { Document } from "@contentful/rich-text-types";
import TrustStrip from "./TrustStrip";

/* ---------------------------
   TYPES
---------------------------- */

type HomepageHeroData = {
  __typename: "HomepageHero";
  tagline?: string;
  title?: string;
  titleAccent?: string;
  subtitle?: string;

  backgroundImage?: {
    url: string;
    title?: string;
  };

  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;

  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
};

type HeroSectionData = {
  __typename: "HeroSection";
  headline?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: { url: string };
};

type SectionIntroData = {
  __typename: "SectionIntro";
  title?: string;
  subtitle?: string;
  blurb?: string;
};

type LifestyleBannerData = {
  __typename: "LifestyleBanner";
  title?: string;
  blurb?: string;

  backgroundImage?: {
    url: string;
    title?: string;
  };

  ctaText?: string;
  ctaLink?: string;
};

type FeaturedCategoriesData = {
  __typename: "FeaturedCategoriesSection";
  title?: string;

  categoriesCollection?: {
    items: {
      title?: string;
      subtitle?: string;
      link?: string;
    }[];
  };
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

type TrustStripData = {
  __typename: "TrustStripSection";
  title?: string;

  itemsCollection?: {
    items: {
      text: string;
    }[];
  };
};

type Section = HomepageHeroData | HeroSectionData | TextSectionData | CTASectionData | ShopifyCollectionSectionData | LifestyleBannerData | SectionIntroData | FeaturedCategoriesData | TrustStripData;

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
        console.log(section.__typename);
        switch (section.__typename) {
          case "HomepageHero":
            return <HomeHeroSection key={i} data={section} />;

          case "HeroSection":
            return <HeroSection key={i} data={section} />;

          case "SectionIntro":
            return <SectionIntroSection key={i} data={section} />;

          case "LifestyleBanner":
            return <LifestyleBannerSection key={i} data={section} />;

          case "FeaturedCategoriesSection":
            return <FeaturedCategoriesSection key={i} data={section} />;

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

          case "TrustStripSection":
            return <TrustStrip key={i} data={section} />;

          default:
            return null;
        }
      })}
    </>
  );
}