import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/header";
import { ToasterClient } from "@/components/ToaterClient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daly Games - Descubra jogos incriveis",
  description: "Mais de 10mil jogos separados e organizados",
  keywords: ["games", "jogos", "steam"],
  openGraph: {
    images: [`${process.env.PROJECT_URL}/preview.png`]
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
        index: true,
        follow: true,
        noimageindex: true
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <Header />
        <ToasterClient />
        {children}
      </body>
    </html>
  );
}
