import type { Metadata, Viewport } from "next";
import { Baloo_2, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./home/background.css";
import "./home/modal.css";
import "./online/online-background.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const baloo2 = Baloo_2({
  variable: "--font-party-title",
  subsets: ["latin"],
  preload: false,
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Parkour Arena",
  description: "A browser-native 3D battle royale. One course, one life, last one standing.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Parkour Arena",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/parkour-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/parkour-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  applicationName: "Parkour Arena",
  keywords: ["game", "multiplayer", "interactive"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    title: "Parkour Arena",
    description: "A browser-native 3D battle royale. One course, one life, last one standing.",
    images: [
      {
        url: "/icons/parkour-512.png",
        width: 512,
        height: 512,
        alt: "Parkour Arena icon",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#050912",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason instanceof TypeError && e.reason.message && e.reason.message.includes('NetworkError')) {
                  e.preventDefault();
                }
              });
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${baloo2.variable} antialiased`}
        style={{ background: "#060816", margin: 0, padding: 0 }}
      >
        <div className="app-canvas-bg" aria-hidden="true" />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
