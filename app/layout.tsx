import type { Metadata } from "next";
import { StoreContextProvider } from "./_context/storeContext";
import ApiLayout from "./_layout/apiLayout";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import "./_styles/globals.css";

export const metadata: Metadata = {
  title: "PWA NextJS",
  description: "It's a simple progressive web application made with NextJS",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "imvinojanv",
      url: "https://www.linkedin.com/in/imvinojanv/",
    },
  ],
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon.png" },
    { rel: "icon", url: "icons/icon.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreContextProvider>
          <ApiLayout>{children}</ApiLayout>
        </StoreContextProvider>
      </body>
    </html>
  );
}
