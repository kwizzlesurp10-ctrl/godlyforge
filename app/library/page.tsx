"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useGodlyStore } from "@/lib/store";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LibraryPage() {
  const { library, removeFromLibrary } = useGodlyStore();
  const [flippedId, setFlippedId] = useState<string | null>(null);

  if (library.length === 0) {
    return (
      <EmptyState
        title="Your Library is Empty"
        description="Generate your first GODLY product and it will appear here. Start building something amazing."
        illustration="library"
        action={
          <Link href="/build">
            <Button className="bg-gradient-to-r from-amber-500 to-cyan-500">
              Start Forging →
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-5xl font-bold">Your Library</h1>
          <p className="text-xl text-zinc-400 mt-2">{library.length} premium products ready to sell</p>
        </div>
        <Link href="/build">
          <Button className="bg-white text-black hover:bg-amber-400">+ New Product</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {library.map((product) => {
          const isFlipped = flippedId === product.id;
          
          return (
            <div 
              key={product.id} 
              className="relative h-[420px] cursor-pointer perspective-1000"
              onClick={() => setFlippedId(isFlipped ? null : product.id)}
            >
              <motion.div
                className="relative w-full h-full preserve-3d transition-transform duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front of card */}
                <div 
                  className="absolute inset-0 bg-zinc-900 border border-amber-500/20 rounded-3xl p-8 backface-hidden flex flex-col"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-5xl mb-6 opacity-80">{product.type.includes("Prompt") ? "✨" : "📦"}</div>
                  
                  <h3 className="text-2xl font-bold leading-tight mb-3 line-clamp-2">
                    {product.title}
                  </h3>
                  
                  <p className="text-sm text-zinc-400 line-clamp-3 flex-1">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-6 flex items-center justify-between text-xs">
                    <div className="text-emerald-400">{product.priceSuggestion}</div>
                    <div className="text-amber-400">Click to flip →</div>
                  </div>
                </div>

                {/* Back of card */}
                <div 
                  className="absolute inset-0 bg-zinc-950 border border-cyan-500/30 rounded-3xl p-8 backface-hidden flex flex-col"
                  style={{ 
                    backfaceVisibility: "hidden", 
                    transform: "rotateY(180deg)" 
                  }}
                >
                  <div className="text-xs uppercase tracking-[2px] text-cyan-400 mb-4">LAUNCH READY</div>
                  
                  <div className="space-y-4 text-sm flex-1">
                    <div>
                      <div className="text-zinc-400">Niche</div>
                      <div className="font-medium">{product.niche}</div>
                    </div>
                    <div>
                      <div className="text-zinc-400">Type</div>
                      <div className="font-medium">{product.type}</div>
                    </div>
                    <div>
                      <div className="text-zinc-400">Price Suggestion</div>
                      <div className="font-medium text-emerald-400">{product.priceSuggestion}</div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Export logic
                      }}
                    >
                      Export
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-red-500/90 hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromLibrary(product.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}