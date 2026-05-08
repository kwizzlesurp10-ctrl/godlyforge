"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Hammer } from "lucide-react";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/ideas", label: "Ideas" },
  { href: "/build", label: "Build" },
  { href: "/library", label: "Library" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-zinc-950 border-amber-500/10">
        <div className="flex flex-col gap-8 pt-8">
          <div className="flex items-center gap-3 px-4">
            <Hammer className="w-8 h-8 text-amber-400" />
            <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">GodlyForge</span>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 text-lg font-medium rounded-xl transition-colors ${pathname === link.href ? "bg-amber-500/10 text-amber-400" : "hover:bg-zinc-900"}`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="mx-4 bg-gradient-to-r from-amber-500 to-cyan-500" onClick={() => setOpen(false)}>
            <Link href="/build">Start Forging →</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}