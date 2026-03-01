import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import Nprogress from "@/components/nprogress";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SaaSFlow - Workflow Automation Platform for Teams",
    template: "%s | SaaSFlow",
  },
  description: "SaaSFlow helps teams automate workflows, collaborate seamlessly, and scale their business. Join 10,000+ teams saving 20+ hours per week with intelligent automation.",
  keywords: [
    "workflow automation",
    "team collaboration",
    "productivity tools",
    "SaaS platform",
    "business automation",
    "project management",
    "task automation",
  ],
  authors: [{ name: "SaaSFlow" }],
  creator: "SaaSFlow",
  publisher: "SaaSFlow",
  metadataBase: new URL("https://saasflow.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saasflow.com",
    siteName: "SaaSFlow",
    title: "SaaSFlow - Workflow Automation Platform for Teams",
    description: "Automate workflows, collaborate seamlessly, and scale your business. Join 10,000+ teams already saving time with SaaSFlow.",
    images: [
      {
        url: "/pwa-512x512.png",
        width: 1200,
        height: 630,
        alt: "SaaSFlow - Workflow Automation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaSFlow - Workflow Automation Platform",
    description: "Automate workflows, collaborate seamlessly, and scale your business. Join 10,000+ teams already saving time with SaaSFlow.",
    images: ["/pwa-512x512.png"],
    creator: "@saasflow",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} flex min-h-screen flex-col`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Nprogress />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
