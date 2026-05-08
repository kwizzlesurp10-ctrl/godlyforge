"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useGodlyStore } from "@/lib/store";
import { ProductType } from "@/lib/types";
import { ResultsView } from "./ResultsView";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";

const productTypes: { type: ProductType; icon: string; desc: string }[] = [
  { type: "AI Prompt Pack", icon: "✨", desc: "25+ high-signal prompts" },
  { type: "Notion Template", icon: "📋", desc: "Complete second brain" },
  { type: "Ebook / Guide", icon: "📖", desc: "8-chapter professional guide" },
  { type: "Digital Planner", icon: "📅", desc: "Interactive productivity system" },
  { type: "Micro-Course", icon: "🎓", desc: "5-lesson premium course" },
  { type: "Design Asset Kit", icon: "🎨", desc: "UI kit + 3D assets" },
];

export function ProductBuilder() {
  const { 
    selectedType, 
    setSelectedType, 
    nicheInput, 
    setNicheInput, 
    generateProduct, 
    isGenerating, 
    generatedProduct 
  } = useGodlyStore();

  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Researching niche", "Building outline", "Crafting content", "Writing sales copy", "Final polish"];

  const handleGenerate = async () => {
    if (!nicheInput || !selectedType) return;
    
    setCurrentStep(0);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 420);

    await generateProduct();
    clearInterval(interval);
    setCurrentStep(steps.length);
  };

  if (generatedProduct) {
    return <ResultsView product={generatedProduct} onBack={() => useGodlyStore.getState().reset()} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm mb-4">
          <Sparkles className="w-4 h-4" /> GODLY Engine v2.1
        </div>
        <h1 className="text-5xl font-bold mb-3">What are we building today?</h1>
        <p className="text-xl text-zinc-400">Choose a product type and enter your niche</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {productTypes.map((item) => (
          <motion.button
            key={item.type}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => setSelectedType(item.type)}
            className={`p-6 rounded-2xl border text-left transition-all ${selectedType === item.type 
              ? "border-amber-500 bg-amber-500/5" 
              : "border-zinc-800 hover:border-zinc-700"}`}
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <div className="font-semibold text-xl mb-1">{item.type}</div>
            <div className="text-sm text-zinc-400">{item.desc}</div>
          </motion.button>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <label className="block text-sm font-medium text-zinc-400 mb-2">YOUR NICHE</label>
        <input
          type="text"
          placeholder="e.g. AI Productivity, Notion for Founders, Freelance Design..."
          className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-6 py-4 text-xl placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
          value={nicheInput}
          onChange={(e) => setNicheInput(e.target.value)}
        />

        <Button 
          onClick={handleGenerate}
          disabled={!nicheInput || !selectedType || isGenerating}
          size="lg"
          className="w-full mt-6 h-14 text-lg bg-gradient-to-r from-amber-500 to-cyan-500 disabled:opacity-50"
        >
          {isGenerating ? (
            <span className="flex items-center gap-3">
              <Loader2 className="animate-spin" /> {steps[currentStep]}
            </span>
          ) : (
            <>Generate with GODLY Engine <ArrowRight className="ml-2" /></>
          )}
        </Button>

        <AnimatePresence>
          {isGenerating && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4"
            >
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-400 to-cyan-400"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <p className="text-center text-xs text-zinc-500 mt-2">This usually takes 8–12 seconds</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}