"use client";
import { useGodlyStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { SwarmWidget } from "@/components/swarm/SwarmWidget";

const starters = [
  { title: "AI Prompt Packs", niche: "AI Workflow" },
  { title: "Notion Second Brain OS", niche: "Productivity" },
  { title: "Niche Digital Planners", niche: "Freelancing" },
];

export function Dashboard() {
  const savedProducts = useGodlyStore((s) => s.savedProducts);
  const setNicheInput = useGodlyStore((s) => s.setNicheInput);
  const productCount = savedProducts.length;

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">
              GodlyForge
            </h1>
            <p className="text-xl text-zinc-400 mt-2">Build sellable products. Sell on autopilot.</p>
          </div>
          <Link href="/build">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-cyan-500 hover:scale-105 transition-all">
              Start Forging →
            </Button>
          </Link>
        </div>

        <SwarmWidget className="mb-12" />

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-emerald-400" />
            <h2 className="text-3xl font-semibold">Your GODLY Empire</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-zinc-900 border border-emerald-500/20">
              <div className="text-emerald-400 text-sm">TOTAL EARNED</div>
              <div className="text-4xl font-bold mt-2">$0</div>
              <div className="text-xs text-zinc-400 mt-1">Gumroad not connected</div>
            </Card>
            <Card className="p-6 bg-zinc-900 border border-amber-500/20">
              <div className="text-amber-400 text-sm">PRODUCTS IN LIBRARY</div>
              <div className="text-4xl font-bold mt-2">{productCount}</div>
              <div className="text-xs text-zinc-400 mt-1">this browser only</div>
            </Card>
            <Card className="p-6 bg-zinc-900 border border-cyan-500/20">
              <div className="text-cyan-400 text-sm">AVG CONVERSION</div>
              <div className="text-4xl font-bold mt-2">—</div>
              <div className="text-xs text-zinc-400 mt-1">no sales data yet</div>
            </Card>
            <Card className="p-6 bg-zinc-900 border border-purple-500/20">
              <div className="text-purple-400 text-sm">TOP PRODUCT</div>
              <div className="text-xl font-bold mt-2 line-clamp-1">
                {savedProducts[0]?.title ?? "None yet"}
              </div>
              <div className="text-xs text-zinc-400 mt-1">forge first product to fill this</div>
            </Card>
          </div>

          <Card className="p-8 bg-zinc-900 border border-zinc-800">
            <div className="font-semibold">Revenue by Product</div>
            <p className="text-sm text-zinc-400 mt-2">
              No Gumroad sync. This panel stays empty until a real store connects.
            </p>
          </Card>
        </div>

        <h2 className="text-3xl font-semibold mb-2 flex items-center gap-3">
          <Flame className="text-orange-500" /> Starting niches
        </h2>
        <p className="text-sm text-zinc-400 mb-6">Editorially curated. Not live Gumroad ranks.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {starters.map((trend) => (
            <Card
              key={trend.title}
              className="p-8 bg-zinc-900 border border-amber-500/20 hover:border-amber-400 transition-colors"
            >
              <h3 className="text-2xl font-medium">{trend.title}</h3>
              <p className="text-zinc-400 text-sm mt-2">{trend.niche}</p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setNicheInput(trend.niche);
                  window.location.href = "/build";
                }}
              >
                Forge This <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
