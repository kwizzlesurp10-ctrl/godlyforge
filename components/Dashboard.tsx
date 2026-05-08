"use client";
import { useGodlyStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Dashboard() {
  const { generateProduct, isGenerating } = useGodlyStore();

  const trends = [
    { title: "AI Prompt Packs 2026", niche: "AI Workflow", sales: "+412 this week" },
    { title: "Notion Second Brain OS", niche: "Productivity", sales: "+289 this week" },
    { title: "Niche Digital Planners", niche: "Freelancing", sales: "+167 this week" },
  ];

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

        <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
          <Flame className="text-orange-500" /> Trending on Gumroad Right Now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trends.map((trend, index) => (
            <Card key={index} className="p-8 bg-zinc-900 border border-amber-500/20 hover:border-amber-400 transition-colors">
              <h3 className="text-2xl font-medium">{trend.title}</h3>
              <p className="text-emerald-400 text-sm mt-2">{trend.sales}</p>
              <Button variant="outline" className="mt-6" onClick={() => {
                useGodlyStore.setState({ nicheInput: trend.niche });
                window.location.href = "/build";
              }}>
                Forge This <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}