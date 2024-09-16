import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";
import ReactQueryProvider from "./_providers/reactQueryProvider";

import "./_styles/globals.css";

const geistSans = localFont({
  src: "./_fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./_fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PWA NextJS",
  description: "It's a simple progressive web application made with NextJS",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  authors: [
    {
      name: "aZ",
      url: "https://github.com/61-5a/",
    },
  ],
  icons: {
    icon: [
      { url: "/icons/logo/icon.png" },
      { url: "/icons/logo/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: ["/icons/shortcut-icon.png"],
    apple: [
      { url: "/icons/logo/apple-icon.png" },
      { url: "/icons/logo/apple-icon-x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/logo/apple-icon-x180.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/logo/apple-icon-x167.png", sizes: "167x167", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/icons/logo/apple-touch-icon-precomposed.png",
      },
      {
        rel: "apple-touch-icon",
        url: "/icons/logo/icon-128.png",
      },
      {
        rel: "icon",
        url: "/icons/logo/icon-128.png",
      },
    ],
  },
  itunes: {
    appId: "myAppStoreID",
    appArgument: "myAppArgument",
  },
  appleWebApp: {
    title: "Apple Web App",
    statusBarStyle: "black-translucent",
    startupImage: [
      "/icons/logo/apple-touch-startup-image-768x1004.png",
      {
        url: "/icons/logo/apple-touch-startup-image-1536x2008.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
      {
        url: "/icons/logo/apple-touch-startup-image-2048x2048.png",
        media: "(device-width: 2048px) and (device-height: 2732px)",
      },
    ],
  },
};

//       <link rel="apple-touch-icon" href="touch-icon-iphone.png" />
//       <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad.png" />
//       <link rel="apple-touch-icon" sizes="180x180" href="touch-icon-iphone-retina.png" />
//       <link rel="apple-touch-icon" sizes="167x167" href="touch-icon-ipad-retina.png" />

//       <meta name="apple-mobile-web-app-capable" content="yes" />
//       <link href="/apple_splash_2048.png" sizes="2048x2732" rel="apple-touch-startup-image" />
//       <link href="/apple_splash_1668.png" sizes="1668x2224" rel="apple-touch-startup-image" />
//       <link href="/apple_splash_1536.png" sizes="1536x2048" rel="apple-touch-startup-image" />
//       <link href="/apple_splash_1125.png" sizes="1125x2436" rel="apple-touch-startup-image" />
//       <link href="/apple_splash_1242.png" sizes="1242x2208" rel="apple-touch-startup-image" />
//       <link href="/apple_splash_750.png" sizes="750x1334" rel="apple-touch-startup-image" />
//       <link href="/apple_splash_640.png" sizes="640x1136" rel="apple-touch-startup-image" />

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
