"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";
import { GeneratedProduct } from "@/lib/types";
import { toast } from "sonner";

interface GumroadPreviewModalProps {
  product: GeneratedProduct;
  isOpen: boolean;
  onClose: () => void;
}

export function GumroadPreviewModal({ product, isOpen, onClose }: GumroadPreviewModalProps) {
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    await new Promise(resolve => setTimeout(resolve, 1400));
    
    confetti({ particleCount: 300, spread: 120, origin: { y: 0.5 } });
    
    setTimeout(() => {
      toast.success("🎉 Product published to Gumroad!", {
        description: "Your product is now live and available for sale.",
        duration: 5000,
      });
      setIsPublishing(false);
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-6" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-2xl overflow-hidden"
      >
        {/* Gumroad-style header */}
        <div className="bg-black px-8 py-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF90E8] rounded-full flex items-center justify-center text-black font-bold text-sm">G</div>
            <div>
              <div className="font-semibold text-white">Gumroad</div>
              <div className="text-[10px] text-zinc-500 -mt-0.5">Creator Dashboard</div>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white"><X size={20} /></button>
        </div>

        <div className="p-8">
          <div className="text-xs uppercase tracking-[1px] text-zinc-500 mb-2">NEW PRODUCT</div>
          <h2 className="text-3xl font-bold text-white mb-6 pr-8">{product.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column - Preview */}
            <div>
              <div className="text-xs text-zinc-400 mb-2">THUMBNAIL PREVIEW</div>
              <div className="aspect-video bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#FFD700_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-30" />
                <div className="text-center">
                  <div className="text-6xl mb-3">{product.type.includes("Prompt") ? "✨" : "📦"}</div>
                  <div className="text-sm text-zinc-400">Auto-generated thumbnail</div>
                  <div className="text-[10px] text-amber-400 mt-1">(Uses your prompt in Midjourney)</div>
                </div>
              </div>
            </div>

            {/* Right column - Details */}
            <div className="space-y-6">
              <div>
                <div className="text-xs text-zinc-400">DESCRIPTION</div>
                <div className="text-sm text-zinc-300 mt-1 line-clamp-4">{product.description}</div>
              </div>

              <div className="flex gap-6">
                <div>
                  <div className="text-xs text-zinc-400">PRICE</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">${product.priceSuggestion?.replace('$', '') || '37'}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-400">CURRENCY</div>
                  <div className="text-lg font-medium mt-1">USD</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800 flex gap-4">
            <Button 
              onClick={handlePublish} 
              disabled={isPublishing}
              className="flex-1 h-12 bg-[#FF90E8] hover:bg-[#FF90E8]/90 text-black font-semibold"
            >
              {isPublishing ? "Publishing to Gumroad..." : "Publish Product"}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1 h-12">
              Cancel
            </Button>
          </div>

          <div className="text-center text-[10px] text-zinc-500 mt-4">
            This is a realistic preview. In production this would connect to the real Gumroad API.
          </div>
        </div>
      </motion.div>
    </div>
  );
}