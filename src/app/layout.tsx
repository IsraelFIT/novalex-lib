import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/layout/nav-bar";
import MainWrapper from "@/components/layout/main-wrapper";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "NovaLex",
  description:
    "World's first and best Interstellar library - bringing lifelines one read at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        {/* Main Meta Tags */}
        <meta name="title" content="NovaLex" />
        <meta
          name="description"
          content="The official Web Application for NovaLex Library"
        />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content="NovaLex Library" />
        <meta
          property="og:description"
          content="The official Web Application for NovaLex Library"
        />
        <meta property="og:image" content="https://yourwebsite.com/logo.png" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:title" content="NovaLex Library" />
        <meta
          name="twitter:description"
          content="The official Web Application for NovaLex Library"
        />
        <meta name="twitter:image" content="https://yourwebsite.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/icon.png" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          <MainWrapper>{children}</MainWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
