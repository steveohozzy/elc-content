export async function contentfulFetch(query, variables = {}) {
  console.log("SPACE:", process.env.CONTENTFUL_SPACE_ID);

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  const data = await response.json();

  console.dir(data, { depth: null });

  return data;
}
