"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Download, Share2, Heart } from "lucide-react";
import { GeneratedProduct } from "@/lib/types";
import { toast } from "sonner";

interface ResultsViewProps {
  product: GeneratedProduct;
  onBack: () => void;
}

export function ResultsView({ product, onBack }: ResultsViewProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleExport = async (format: "pdf" | "markdown" | "json") => {
    setIsExporting(true);
    
    // Simulate export processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Trigger beautiful confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0.1 }
      });
    }, 250);

    setIsExporting(false);
    setShowConfetti(true);
    
    toast.success(`Exported as ${format.toUpperCase()}! 🎉`, {
      description: "Your premium product is ready to sell on Gumroad.",
      duration: 4000,
    });

    // Auto-hide confetti celebration
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={onBack}>
          ← Back to Builder
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleExport("markdown")}>
            <Download className="w-4 h-4 mr-2" /> Markdown
          </Button>
          <Button onClick={() => handleExport("pdf")} className="bg-gradient-to-r from-amber-500 to-cyan-500">
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="text-6xl">🎉</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-zinc-900 border border-amber-500/20 rounded-3xl p-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-cyan-400 flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">{product.title}</h1>
            <p className="text-amber-400 mt-1">{product.tagline}</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: product.fullContent.replace(/\n/g, '<br/>') }} />
        </div>

        <div className="mt-10 pt-8 border-t border-zinc-800">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Heart className="text-red-500" /> Launch Checklist
          </h3>
          <ul className="space-y-3 text-sm">
            {product.launchTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">✓</div>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}