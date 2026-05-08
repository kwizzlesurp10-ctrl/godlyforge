"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
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
    <>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        className="md:hidden fixed top-4 left-4 z-50"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </Button>

      {open ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-[min(100%,320px)] flex-col gap-8 border-r border-amber-500/10 bg-zinc-950 p-6 pt-20 shadow-xl">
            <div className="flex items-center gap-3 px-4">
              <Hammer className="h-8 w-8 text-amber-400" />
              <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                GodlyForge
              </span>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-lg font-medium transition-colors ${
                  pathname === link.href ? "bg-amber-500/10 text-amber-400" : "hover:bg-zinc-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mx-4 bg-gradient-to-r from-amber-500 to-cyan-500">
              <Link href="/build" onClick={() => setOpen(false)}>
                Start Forging →
              </Link>
            </Button>
          </aside>
        </div>
      ) : null}
    </>
  );
}
