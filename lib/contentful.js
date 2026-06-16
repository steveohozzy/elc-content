export async function contentfulFetch(
  query,
  variables = {}
) {
  console.log("SPACE:", process.env.CONTENTFUL_SPACE_ID);

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },

      // Cache for 1 hour
      next: {
        revalidate: 3600,
      },

      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  const data = await response.json();

  return data;
}

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

export async function getMenuPages() {
  const response = await contentfulFetch(GET_MENU_PAGES);

  return (
    response?.data?.pageCollection?.items?.map((page) => ({
      title: page.title,
      slug: page.slug,
    })) ?? []
  );
}