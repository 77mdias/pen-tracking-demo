import type { Metadata } from "next";
import { Inter, Manrope, Montserrat, Open_Sans } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PenFlow77 — Smart Pen Premium Demo",
  description: "A premium smart pen hero experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${montserrat.variable} ${openSans.variable} h-full antialiased`}>
      <body className="font-inter min-h-full flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
