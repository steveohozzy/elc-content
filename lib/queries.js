export const GET_PRODUCTS = `
query GetProducts($first: Int!, $after: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
  products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
    edges {
      cursor
      node {
        id
        title
        handle
        description

        images(first: 2) {
          edges {
            node {
              url
            }
          }
        }

        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }

    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export const GET_COLLECTION_PRODUCTS = `
query GetCollectionProducts(
  $handle: String!,
  $first: Int = 10,
  $after: String
) {
  collection(handle: $handle) {
    id
    title

    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          handle

          images(first: 2) {
            edges {
              node {
                url
              }
            }
          }

          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }

      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;

export const SEARCH_PRODUCTS = `
query SearchProducts(
  $query: String!,
  $first: Int!,
  $after: String
) {
  products(
    query: $query,
    first: $first,
    after: $after
  ) {
    edges {
      cursor
      node {
        id
        title
        handle

        images(first: 2) {
          edges {
            node {
              url
            }
          }
        }

        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }

    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export const GET_PRODUCT = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle

      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }

      media(first: 10) {
        edges {
          node {
            __typename

            ... on MediaImage {
              image {
                url
                altText
              }
            }

            ... on Video {
              sources {
                url
                mimeType
              }
            }

            ... on ExternalVideo {
              embeddedUrl
            }
          }
        }
      }

      variants(first: 1) {
        edges {
          node {
            id
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CART = `
mutation {
  cartCreate {
    cart {
      id
      checkoutUrl
      totalQuantity
    }
  }
}
`;

export const ADD_TO_CART = `
mutation AddToCart(
  $cartId: ID!
  $variantId: ID!
  $quantity: Int!
) {
  cartLinesAdd(
    cartId: $cartId
    lines: [
      {
        merchandiseId: $variantId
        quantity: $quantity
      }
    ]
  ) {
    cart {
      id
      checkoutUrl
      totalQuantity
    }
  }
}
`;

export const GET_CART = `
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    checkoutUrl
    totalQuantity

    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }

    lines(first: 50) {
      edges {
        node {
          id
          quantity

          merchandise {
            ... on ProductVariant {
              id

              price {
                amount
                currencyCode
              }

              image {
                url
              }

              product {
                title
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_COLLECTIONS = `
{
  collections(first: 10) {
    edges {
      node {
        id
        title
        handle
      }
    }
  }
}
`;

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

export const GET_HOMEPAGE_LIFESTYLE = `
{
  lifestyleBannerCollection(limit: 1) {
    items {
      title
      blurb
      ctaText
      ctaLink

      backgroundImage {
        url
      }
    }
  }
}
`;

export const GET_SECTION = `
query GetSection($sectionKey: String!) {
  sectionIntroCollection(
    limit: 1
    where: {
      sectionKeys_contains_some: [$sectionKey]
    }
  ) {
    items {
      title
      subtitle
      blurb
    }
  }
}
`;

export const GET_FOOTER = `
{
  footerCollection(limit: 1) {
    items {
      menu1Title
      menu2Title
      menu3Title
      copyright
      footerBlurb

      menu1LinksCollection {
        items {
          ... on FooterMenuLink {
            label
            url
          }
        }
      }

      menu2LinksCollection {
        items {
          ... on FooterMenuLink {
            label
            url
          }
        }
      }

      menu3LinksCollection {
        items {
          ... on FooterMenuLink {
            label
            url
          }
        }
      }

      copyrightBarLinksCollection {
        items {
          ... on CopyrightMenuLink {
            label
            url
          }
        }
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

      sectionsCollection {
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
          }

          ... on HeroSection {
            headline
            subheading
            buttonText
            buttonLink
            image {
              url
            }
          }

          ... on SectionIntro {
            __typename
            title
            subtitle
            blurb
          }

          ... on LifestyleBanner {
            __typename
            title
            blurb
            ctaText
            ctaLink
            backgroundImage {
              url
            }
          }

          ... on FeaturedCategoriesSection {
            __typename
            title

            categoriesCollection {
              items {
                title
                subtitle
                link
              }
            }
          }

          ... on TextSection {
            content {
              json
            }
          }

          ... on CtaSection {
            text
            buttonText
            buttonLink
          }

          ... on ShopifyCollectionSection {
            __typename
            collectionId
          }

          ... on TrustStripSection {
            __typename
            title

            itemsCollection {
              items {
                text
              }
            }
          }
        }
      }
    }
  }
}
`;