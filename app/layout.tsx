import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}