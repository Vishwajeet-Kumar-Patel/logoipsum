import type { Metadata } from "next";
import { Figtree, Lexend, Comfortaa } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CreatorHub – For The Next Gen Creators",
  description:
    "Join a new wave of creators building income, influence, and impact.",
};

import Footer from "../src/components/Footer";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${lexend.variable} ${comfortaa.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-[var(--font-figtree)]">
        <Toaster position="bottom-right" />
        <div className="flex-1 shrink-0">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
