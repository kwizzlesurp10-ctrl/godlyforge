import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GeneratedProduct, ProductType } from "./types";

interface GodlyStore {
  selectedType: ProductType;
  nicheInput: string;
  isGenerating: boolean;
  engineError: string | null;
  generatedProduct: GeneratedProduct | null;
  savedProducts: GeneratedProduct[];
  setSelectedType: (type: ProductType) => void;
  setNicheInput: (niche: string) => void;
  generateProduct: () => Promise<void>;
  saveToLibrary: (product: GeneratedProduct) => void;
  removeFromLibrary: (productId: string) => void;
  reset: () => void;
}

export const useGodlyStore = create<GodlyStore>()(
  persist(
    (set, get) => ({
      selectedType: "AI Prompt Pack",
      nicheInput: "",
      isGenerating: false,
      engineError: null,
      generatedProduct: null,
      savedProducts: [],

      setSelectedType: (type) => set({ selectedType: type }),
      setNicheInput: (niche) => set({ nicheInput: niche }),

      generateProduct: async () => {
        const { selectedType, nicheInput } = get();
        set({ isGenerating: true, engineError: null });
        try {
          const res = await fetch("/api/engine/forge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: selectedType, niche: nicheInput }),
          });
          const data = (await res.json()) as GeneratedProduct & { error?: string };
          if (!res.ok) {
            set({ engineError: data.error || `Engine failed (${res.status})`, isGenerating: false });
            return;
          }
          set({
            generatedProduct: { ...data, createdAt: new Date(data.createdAt) },
            isGenerating: false,
          });
        } catch {
          set({ engineError: "Engine unavailable. No fake product.", isGenerating: false });
        }
      },

      saveToLibrary: (product) => {
        const current = get().savedProducts;
        set({ savedProducts: [product, ...current] });
      },

      removeFromLibrary: (productId) => {
        set({
          savedProducts: get().savedProducts.filter((product) => product.id !== productId),
        });
      },

      reset: () => set({ generatedProduct: null, isGenerating: false, engineError: null }),
    }),
    {
      name: "godlyforge-storage",
      partialize: (state) => ({ savedProducts: state.savedProducts }),
    },
  ),
);
