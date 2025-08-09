import type { Metadata } from "next";
import { BackgroundDecorations } from "@/components/ui/background-decorations";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/ui/navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SegFault",
  description: "Where Impossible is Just an Error Code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RSPLGWDSCF"
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RSPLGWDSCF');
          `}
        </Script>
      </head>
      <body className={inter.variable}>
        <BackgroundDecorations />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
