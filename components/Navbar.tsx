"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Flame, Hammer } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/ideas", label: "Ideas" },
  { href: "/build", label: "Build" },
  { href: "/library", label: "Library" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-amber-500/10 px-8 py-4">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Hammer className="w-8 h-8 text-amber-400" />
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">
            GodlyForge
          </Link>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-amber-400 transition-colors",
                pathname === link.href && "text-amber-400 font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-cyan-500 hover:scale-105 transition-all">
          <Link href="/build">Start Forging →</Link>
        </Button>
      </div>
    </nav>
  );
}