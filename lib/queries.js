export const GET_PRODUCTS = `
{
  products(first: 10) {
    edges {
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
  }
}
`;

export const GET_COLLECTION_PRODUCTS = `
query GetCollectionProducts(
  $handle: String!
) {
  collection(handle: $handle) {
    id
    title

    products(first: 50) {
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
    }
  }
}
`;

export const SEARCH_PRODUCTS = `
query SearchProducts($query: String!) {
  products(
    first: 20
    query: $query
  ) {
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
