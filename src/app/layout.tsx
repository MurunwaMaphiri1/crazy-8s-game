import type { Metadata } from "next";
import { Geist, Geist_Mono, Saira, Galindo } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const markinLT = localFont({
  src: '../../public/fonts/Markin-LT-Ultra-Bold.ttf',
  variable: "--font-markin-lt"
})

const galindo = Galindo({
  variable: "--font-galindo",
  subsets: ["latin"],
  weight: "400"
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crazy Eights",
  description: "A quick and competitive card game where matching suits and ranks keeps the game moving, and playing an eight lets you flip the rules in your favor.",
};

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: "500"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${galindo.variable}antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
