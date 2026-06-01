import type { Metadata } from "next";
import { Orbitron, Outfit } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GajvakraTech | Next-Gen Software, Mobile Apps & Web Development",
  description: "Futuristic software engineering and design company specializing in premium mobile apps, native Android development, Next.js websites, custom cloud portals, and UI/UX architectures.",
  keywords: ["software development", "app development", "web development", "UI/UX design", "android app", "nextjs", "gajvakratech"],
  authors: [{ name: "GajvakraTech" }],
  openGraph: {
    title: "GajvakraTech | Premium App & Web Engineering",
    description: "Building the future of software with next-gen mobile systems and cinematic web interfaces.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#020208] text-slate-100 select-none selection:bg-neon-blue/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
