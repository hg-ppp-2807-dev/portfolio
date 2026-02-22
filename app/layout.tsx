import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pritam Priyabrata Palai - Portfolio",
  description:
    "Full-Stack Developer & 3D Enthusiast. Explore my projects and skills in this immersive 3D portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}