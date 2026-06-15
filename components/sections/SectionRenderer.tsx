import { Blog } from "./Blog";
import { ExpandingPanels } from "./ExpandingPanels";
import HomeHeroSection from "./HomeHero";
import { Marquee } from "./Marquee";
import { Newsletter } from "./Newsletter";
import { Story } from "./Story";
import type { Document } from "@contentful/rich-text-types";

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

type MarqueeData = {
  __typename: "Marquee";
  title?: string;
  marqueeItemsCollection?: {
    items: {
      title?: string;
      image?: {
        url?: string;
      };
    }[];
  };
};

type StoryData = {
  __typename: "StorySection";
  title?: string;
  tagline?: string;
  imageStampText?: string;
  blurb?: {
    json?: Document;
  };
  image?: {
    url?: string;
  };
  calloutsCollection?: {
    items: {
      title?: string;
      highlight?: string;
    }[];
  };
};

type ExpandingPanelsData = {
  __typename: "ExpandingPanelsSection";
  title?: string;
  tagline?: string;
  introBlurb?: string;
  panelsCollection?: {
    items: {
      title: string;
      blurb?: string;
      buttonText?: string;
      link?: string;

      imageMain?: {
        url: string;
      };

    }[];
  };
};

type BlogData = {
  __typename: "BlogSection";
  title?: string;
  tagline?: string;
  blogPostsCollection?: {
    items: {
      title: string;
      tag: string;
      readLength: string;

      image?: {
        url: string;
      };
    }[];
  };
};

type NewsletterSignUpData = {
  __typename: "NewsletterSignUp";
  title?: string;
  intro?: string;
};


type Section = HomepageHeroData | MarqueeData | StoryData | ExpandingPanelsData | BlogData | NewsletterSignUpData;

export default function SectionRenderer({
  sections,
}: {
  sections: Section[];
}) {
  if (!sections?.length) return null;

  return (
    <>

      {sections.map((section, i) => {
          switch (section.__typename) {
            case "HomepageHero":
              return <HomeHeroSection key={i} data={section} />;

            case "Marquee":
              return <Marquee key={i} data={section} />;

            case "StorySection":
              return <Story key={i} data={section} />;

            case "ExpandingPanelsSection":
              return (
                <ExpandingPanels
                  key={i}
                  data={section}
                />
              );

              case "BlogSection":
                return <Blog key={i} data={section} />;

              case "NewsletterSignUp":
                return <Newsletter key={i} data={section} />;

            default:
              return null;
          }
        })}
    </>
  );
}