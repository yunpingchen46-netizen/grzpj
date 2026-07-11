import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-text",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CLM — AI × Design Studio",
  description:
    "探索人工智能与视觉设计的交汇点 — AI 赋能的全栈创意工作室，从策略到执行，从代码到视觉。",
  icons: {
    icon: "/seo/favicon.ico",
    apple: "/seo/apple-touch-icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/seo/favicon-32x32.webp" sizes="32x32" />
        <link rel="icon" href="/seo/favicon-16x16.webp" sizes="16x16" />
      </head>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
