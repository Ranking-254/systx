import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "next-themes"; // [1] Import this

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SYSTX // DIGITAL_INFRASTRUCTURE",
  description: "High-performance software systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // [2] Remove hardcoded "dark" class and add suppressHydrationWarning
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-black dark:text-white flex flex-col min-h-screen transition-colors duration-300`}>
        {/* [3] Wrap with ThemeProvider */}
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <main className="pt-20 flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}