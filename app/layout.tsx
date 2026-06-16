import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMenuPages } from "@/lib/contentful";

import { Geist, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = await getMenuPages();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://elc-content.vercel.app" />
        <link rel="dns-prefetch" href="https://elc-content.vercel.app" />
      </head>

      <body>
        <Header menuItems={menuItems} />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}