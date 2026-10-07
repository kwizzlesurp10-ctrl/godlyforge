"use client";
import { useMemo, useState } from "react";
import { useGodlyStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { ProductType } from "@/lib/types";

const TYPES: ProductType[] = [
  "AI Prompt Pack",
  "Notion Template",
  "Ebook / Guide",
  "Digital Planner",
  "Micro-Course",
  "Design Asset Kit",
];

function ideaTitle(niche: string, type: ProductType, i: number): string {
  const n = niche.trim() || "your niche";
  const twists = ["Operator OS", "Launch Kit", "Field Manual"];
  return `${n} ${type} — ${twists[i % twists.length]}`;
}

export default function IdeasPage() {
  const setNicheInput = useGodlyStore((s) => s.setNicheInput);
  const setSelectedType = useGodlyStore((s) => s.setSelectedType);
  const [niche, setNiche] = useState("");
  const [type, setType] = useState<ProductType>("AI Prompt Pack");
  const [generated, setGenerated] = useState(false);

  const ideas = useMemo(() => {
    if (!generated) return [];
    return [0, 1, 2].map((i) => ({
      id: String(i),
      title: ideaTitle(niche, type, i),
      niche: niche.trim() || "Productivity",
      type,
    }));
  }, [generated, niche, type]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Idea Generator</h1>
        <p className="text-xl text-zinc-400">Local titles only. No live market feed.</p>
      </div>

      <div className="bg-zinc-900 border border-amber-500/20 rounded-3xl p-10 mb-10">
        <label className="block text-sm text-zinc-400 mb-2" htmlFor="idea-niche">
          Niche
        </label>
        <input
          id="idea-niche"
          value={niche}
          onChange={(e) => {
            setNiche(e.target.value);
            setGenerated(false);
          }}
          placeholder="wedding planning"
          className="w-full mb-6 rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
        />
        <div className="flex flex-wrap gap-2 mb-6">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setType(t);
                setGenerated(false);
              }}
              className={`rounded-full px-3 py-1 text-sm border ${
                type === t ? "border-amber-400 text-amber-400" : "border-zinc-700 text-zinc-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <Button
          className="bg-gradient-to-r from-amber-500 to-cyan-500"
          onClick={() => setGenerated(true)}
        >
          Generate ideas
        </Button>
      </div>

      {!generated ? (
        <p className="text-center text-zinc-500">No ideas on the anvil yet.</p>
      ) : (
        <div className="grid gap-4">
          {ideas.map((idea) => (
            <Card key={idea.id} className="p-6 bg-zinc-900">
              <h2 className="text-xl font-semibold mb-4">{idea.title}</h2>
              <Link href="/build">
                <Button
                  variant="outline"
                  onClick={() => {
                    setNicheInput(idea.niche);
                    setSelectedType(idea.type);
                  }}
                >
                  Forge This
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
