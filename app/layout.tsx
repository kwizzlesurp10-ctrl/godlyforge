import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";
import { MobileNav } from "@/components/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GodlyForge — Build Gumroad Products in Minutes",
  description: "The GODLY web studio for creators. Turn any idea into premium digital products ready to sell on Gumroad.",
  openGraph: {
    title: "GodlyForge — Build Gumroad Products in Minutes",
    description: "GODLY multi-stage engine • Instant sales-page copy • One-click exports",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <MobileNav />
            <main className="flex-1 pt-16 md:pt-0">{children}</main>
          </div>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}