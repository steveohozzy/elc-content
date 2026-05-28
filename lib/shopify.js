export async function shopifyFetch(query, variables = {}) {
  const response = await fetch(
    `https://${process.env.SHOPIFY_DOMAIN}/api/2025-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  return response.json();
}