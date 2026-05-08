"use client";
import { useGodlyStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductType } from "@/lib/types";
import { ArrowRight, Sparkles } from "lucide-react";

const productTypes: ProductType[] = [
  "AI Prompt Pack",
  "Notion Template",
  "Ebook / Guide",
  "Digital Planner",
  "Micro-Course",
  "Design Asset Kit",
];

export function ProductBuilder() {
  const { selectedType, setSelectedType, nicheInput, setNicheInput, generateProduct, isGenerating, generatedProduct } = useGodlyStore();

  const handleGenerate = async () => {
    await generateProduct();
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          GODLY Product Builder
        </h1>
        <p className="text-xl text-zinc-400">Choose your weapon. Enter the niche. Watch the magic happen.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {productTypes.map((type) => (
          <Card
            key={type}
            className={`p-8 cursor-pointer transition-all border-2 ${selectedType === type ? "border-amber-400 bg-amber-500/10" : "border-zinc-800 hover:border-amber-500/50"}`}
            onClick={() => setSelectedType(type)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-2">{type}</h3>
                <p className="text-zinc-400 text-sm">High-converting, premium quality</p>
              </div>
              {selectedType === type && <Sparkles className="text-amber-400 w-6 h-6" />}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter your niche (e.g. AI Workflow, Freelance Design, Solopreneur Productivity)"
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-amber-400"
          value={nicheInput}
          onChange={(e) => setNicheInput(e.target.value)}
        />
        <Button
          size="lg"
          onClick={handleGenerate}
          disabled={isGenerating || !nicheInput.trim()}
          className="bg-gradient-to-r from-amber-500 to-cyan-500 hover:scale-105 transition-all disabled:opacity-50"
        >
          {isGenerating ? "Forging..." : "Generate GODLY Product"} <ArrowRight className="ml-2" />
        </Button>
      </div>

      {generatedProduct && (
        <Card className="p-8 border border-amber-500/30 bg-zinc-900">
          <h2 className="text-3xl font-bold mb-4 text-amber-400">{generatedProduct.title}</h2>
          <p className="text-xl text-zinc-300 mb-6">{generatedProduct.tagline}</p>
          
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm bg-black/50 p-6 rounded-xl overflow-auto">
              {generatedProduct.fullContent}
            </pre>
          </div>

          <div className="mt-8 flex gap-4">
            <Button onClick={() => window.location.href = `/results/${generatedProduct.id}`}>
              View Full Sales Page Preview
            </Button>
            <Button variant="outline" onClick={() => useGodlyStore.getState().saveToLibrary(generatedProduct)}>
              Save to Library
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}