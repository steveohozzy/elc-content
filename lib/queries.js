export const GET_HOMEPAGE_HERO = `
{
  homepageHeroCollection(limit: 1) {
    items {
      title
      titleAccent
      subtitle
      tagline
      ctaPrimaryText
      ctaPrimaryLink
      ctaSecondaryText
      ctaSecondaryLink

      backgroundImage {
        url
      }
    }
  }
}
`;

export const GET_PAGE = `
query GetPage($slug: String!) {
  pageCollection(where: { slug: $slug }, limit: 1) {
    items {
      title
      slug

      sectionsCollection(limit: 20) {
        items {
          __typename

          ... on HomepageHero {
            __typename
            title
            titleAccent
            tagline
            subtitle
            ctaPrimaryText
            ctaPrimaryLink
            ctaSecondaryText
            ctaSecondaryLink
            backgroundImage {
              url
            }
            imageStampTitle
            imageStampText
            statsCollection {
              items {
                value
                label
              }
            }
          }

          ... on Marquee {
            __typename
            title

            marqueeItemsCollection {
              items {
                title
              }
            }
          }

          ... on StorySection {
            __typename
            title
            tagline
            imageStampText
            flip
            blurb {
              json
            }
            image {
              url
            }

            calloutsCollection {
              items {
                title
                highlight
              }
            }
          }

          ... on ExpandingPanelsSection {
            __typename
            title
            tagline
            introBlurb

            panelsCollection(limit: 20) {
              items {
                ... on ExpandingPanel {
                  title
                  blurb
                  buttonText
                  link

                  imageMain {
                    url
                  }
                }
              }
            }
          }

          ... on BlogSection {
            __typename
            title
            tagline

            blogPostsCollection(limit: 20) {
              items {
                ... on BlogPanel {
                  title
                  tag
                  readLength
                  slug

                  image {
                    url
                  }
                }
              }
            }
          }

          ... on NewsletterSignUp {
            __typename
            title
            intro
          }
        }
      }
    }     
  }
}
`;

export const GET_BLOG_POST_PAGE = `
query GetBlogPostPage($slug: String!) {
  pageCollection(
    where: {
      slug: $slug
      pageType: "blog"
    }
    limit: 1
  ) {
    items {
      title
      slug
      pageType
      pageContent {
        json
        links {
          assets {
            block {
              sys {
                id
              }
              url
              title
              description
            }
          }
        }
      }
      sectionsCollection(limit: 20) {
        items {
          __typename

          ... on HomepageHero {
            __typename
            title
            titleAccent
            tagline
            subtitle
            ctaPrimaryText
            ctaPrimaryLink
            ctaSecondaryText
            ctaSecondaryLink
            backgroundImage {
              url
            }
            imageStampTitle
            imageStampText
            statsCollection {
              items {
                value
                label
              }
            }
          }

          ... on Marquee {
            __typename
            title

            marqueeItemsCollection {
              items {
                title
              }
            }
          }

          ... on StorySection {
            __typename
            title
            tagline
            imageStampText
            flip
            blurb {
              json
            }
            image {
              url
            }

            calloutsCollection {
              items {
                title
                highlight
              }
            }
          }

          ... on ExpandingPanelsSection {
            __typename
            title
            tagline
            introBlurb

            panelsCollection(limit: 20) {
              items {
                ... on ExpandingPanel {
                  title
                  blurb
                  buttonText
                  link

                  imageMain {
                    url
                  }
                }
              }
            }
          }

          ... on BlogSection {
            __typename
            title
            tagline

            blogPostsCollection(limit: 20) {
              items {
                ... on BlogPanel {
                  title
                  tag
                  readLength
                  slug

                  image {
                    url
                  }
                }
              }
            }
          }

          ... on NewsletterSignUp {
            __typename
            title
            intro
          }
        }
      }
    }
  }
}
`;


export const GET_MENU_PAGES = `
{
  pageCollection(limit: 100) {
    items {
      title
      slug
    }
  }
}
`;