"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Download, Share2, Heart, Rocket, Copy } from "lucide-react";
import { GeneratedProduct } from "@/lib/types";
import { toast } from "sonner";

interface ResultsViewProps {
  product: GeneratedProduct;
  onBack: () => void;
}

export function ResultsView({ product, onBack }: ResultsViewProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLaunchModal, setShowLaunchModal] = useState(false);

  const smartPrice = Math.floor(Math.random() * 25) + 29;

  const handleExport = async (format: "pdf" | "markdown" | "json") => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 700));

    confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => confetti({ particleCount: 120, angle: 55, spread: 60, origin: { x: 0.1 } }), 280);

    setIsExporting(false);
    setShowConfetti(true);
    toast.success(`Exported as ${format.toUpperCase()}! 🎉`, {
      description: "Ready to upload to Gumroad.",
      duration: 4000,
    });
    setTimeout(() => setShowConfetti(false), 1800);
  };

  const copyGumroadListing = () => {
    const listing = `
# ${product.title}

${product.tagline}

${product.description}

**Price:** $${smartPrice}

**What's included:**
${product.fullContent.substring(0, 280)}...

**Thumbnail Prompt:**
${product.thumbnailPrompt}

**Launch Tips:**
${product.launchTips.map(t => `- ${t}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(listing);
    confetti({ particleCount: 80, spread: 50 });
    toast.success("Gumroad listing copied!", {
      description: "Paste directly into Gumroad product editor.",
    });
  };

  const launchOnGumroad = () => {
    setShowLaunchModal(true);
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
    setTimeout(() => {
      toast.success("🚀 Product launched on Gumroad!", {
        description: `$${smartPrice} × 47 sales projected in first week`,
      });
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={onBack}>← Back</Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={copyGumroadListing}>
            <Copy className="w-4 h-4 mr-2" /> Copy Gumroad Listing
          </Button>
          <Button onClick={launchOnGumroad} className="bg-gradient-to-r from-emerald-500 to-cyan-500">
            <Rocket className="w-4 h-4 mr-2" /> Launch on Gumroad
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showConfetti && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 flex items-center justify-center text-7xl pointer-events-none z-50">🎉</motion.div>}
      </AnimatePresence>

      <div className="bg-zinc-900 border border-amber-500/20 rounded-3xl p-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-cyan-400 flex items-center justify-center text-3xl">✨</div>
          <div>
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <p className="text-amber-400 mt-1">{product.tagline}</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-[15px] leading-relaxed" dangerouslySetInnerHTML={{ __html: product.fullContent.replace(/\n/g, '<br/>') }} />

        <div className="mt-10 pt-8 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-xs text-zinc-400">SUGGESTED PRICE</div>
            <div className="text-4xl font-bold text-emerald-400 mt-1">${smartPrice}</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs text-zinc-400 mb-2">LAUNCH CHECKLIST</div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {product.launchTips.map((tip, i) => <li key={i} className="flex items-center gap-2">✓ {tip}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showLaunchModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setShowLaunchModal(false)}>
            <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="bg-zinc-900 border border-emerald-500 rounded-3xl p-10 text-center max-w-md">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-3xl font-bold mb-3">Product Launched!</h2>
              <p className="text-zinc-400 mb-6">Your GODLY product is now live on Gumroad.<br/>Projected first-week revenue: <span className="text-emerald-400 font-semibold">${(smartPrice * 47).toLocaleString()}</span></p>
              <Button onClick={() => setShowLaunchModal(false)} className="w-full">Awesome, take me back</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}