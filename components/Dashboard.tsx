"use client";
import { useGodlyStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame, ArrowRight, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Dashboard() {
  const { generateProduct, isGenerating } = useGodlyStore();

  const trends = [
    { title: "AI Prompt Packs 2026", niche: "AI Workflow", sales: "+412 this week" },
    { title: "Notion Second Brain OS", niche: "Productivity", sales: "+289 this week" },
    { title: "Niche Digital Planners", niche: "Freelancing", sales: "+167 this week" },
  ];

  const analytics = {
    totalEarned: 12480,
    thisMonth: 3740,
    productsLive: 7,
    avgConversion: 18.4,
    topProducts: [
      { name: "AI Productivity OS", revenue: 4820, sales: 124 },
      { name: "Founder Notion System", revenue: 3190, sales: 87 },
      { name: "Freelance Prompt Pack", revenue: 2740, sales: 92 },
    ],
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">GodlyForge</h1>
            <p className="text-xl text-zinc-400 mt-2">Build sellable products. Sell on autopilot.</p>
          </div>
          <Link href="/build">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-cyan-500 hover:scale-105 transition-all">
              Start Forging →
            </Button>
          </Link>
        </div>

        {/* Analytics Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-emerald-400" />
            <h2 className="text-3xl font-semibold">Your GODLY Empire</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-zinc-900 border border-emerald-500/20">
              <div className="text-emerald-400 text-sm">TOTAL EARNED</div>
              <div className="text-4xl font-bold mt-2">${analytics.totalEarned.toLocaleString()}</div>
              <div className="text-xs text-emerald-400 mt-1">+${analytics.thisMonth} this month</div>
            </Card>
            <Card className="p-6 bg-zinc-900 border border-amber-500/20">
              <div className="text-amber-400 text-sm">PRODUCTS LIVE</div>
              <div className="text-4xl font-bold mt-2">{analytics.productsLive}</div>
              <div className="text-xs text-zinc-400 mt-1">on Gumroad</div>
            </Card>
            <Card className="p-6 bg-zinc-900 border border-cyan-500/20">
              <div className="text-cyan-400 text-sm">AVG CONVERSION</div>
              <div className="text-4xl font-bold mt-2">{analytics.avgConversion}%</div>
              <div className="text-xs text-zinc-400 mt-1">industry avg: 9.2%</div>
            </Card>
            <Card className="p-6 bg-zinc-900 border border-purple-500/20">
              <div className="text-purple-400 text-sm">TOP PRODUCT</div>
              <div className="text-xl font-bold mt-2 line-clamp-1">{analytics.topProducts[0].name}</div>
              <div className="text-xs text-emerald-400 mt-1">${analytics.topProducts[0].revenue} revenue</div>
            </Card>
          </div>

          {/* Revenue Breakdown */}
          <Card className="p-8 bg-zinc-900 border border-zinc-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="font-semibold">Revenue by Product</div>
                <div className="text-sm text-zinc-400">Last 30 days</div>
              </div>
              <div className="text-emerald-400 text-sm">+34% vs last month</div>
            </div>

            <div className="space-y-6">
              {analytics.topProducts.map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span>{p.name}</span>
                    <span className="font-mono text-emerald-400">${p.revenue}</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-amber-400 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${(p.revenue / 5000) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{p.sales} sales</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Trending */}
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