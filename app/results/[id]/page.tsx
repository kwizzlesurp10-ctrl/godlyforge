"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ResultsView } from "@/components/ResultsView";
import { GeneratedProduct } from "@/lib/types";
import { useGodlyStore } from "@/lib/store";

export default function ResultsPage() {
  const params = useParams();
  const { library } = useGodlyStore();
  const [product, setProduct] = useState<GeneratedProduct | null>(null);

  useEffect(() => {
    const found = library.find(p => p.id === params.id);
    if (found) {
      setProduct(found);
    }
  }, [params.id, library]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-semibold">Product not found</h1>
          <p className="text-zinc-400 mt-2">This product may have been deleted or the link is invalid.</p>
        </div>
      </div>
    );
  }

  return <ResultsView product={product} onBack={() => window.history.back()} />;
}