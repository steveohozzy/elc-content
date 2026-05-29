import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { shopifyFetch } from "@/lib/shopify";
import { GET_COLLECTIONS } from "@/lib/queries";
import "./globals.css";

type CollectionNode = {
  id: string;
  title: string;
  handle: string;
};

type CollectionEdge = {
  node: CollectionNode;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await shopifyFetch(GET_COLLECTIONS);

  const rawCollections =
  (data?.data?.collections?.edges ?? []) as CollectionEdge[];

  const collections = rawCollections.filter(
    ({ node }) =>
      node.handle !== "frontpage" &&
      node.title.toLowerCase() !== "home"
  );

  return (
    <html lang="en">
      <body>
        <Header collections={collections} />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}