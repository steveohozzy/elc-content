import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Geist, Fraunces } from 'next/font/google'
import "./globals.css";

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <html lang="en" className={`${geistSans.variable} ${fraunces.variable}`}>
      <body>
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}