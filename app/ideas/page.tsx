"use client";
import { useGodlyStore } from "@/lib/store";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IdeasPage() {
  const { generateProduct } = useGodlyStore();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Idea Generator</h1>
        <p className="text-xl text-zinc-400">Get high-signal product ideas tailored to your niche</p>
      </div>

      <div className="bg-zinc-900 border border-amber-500/20 rounded-3xl p-10 text-center">
        <div className="text-6xl mb-6">💡</div>
        <h2 className="text-3xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-zinc-400 max-w-md mx-auto mb-8">
          The smart idea generator is being forged. For now, use the Quick Start on the Dashboard or go straight to the Builder.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/build">
            <Button className="bg-gradient-to-r from-amber-500 to-cyan-500">Go to Builder</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}