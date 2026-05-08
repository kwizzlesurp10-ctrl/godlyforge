import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GeneratedProduct, ProductType } from "./types";
import { godlyGenerator } from "./godlyGenerator";

interface GodlyStore {
  selectedType: ProductType;
  nicheInput: string;
  isGenerating: boolean;
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
      generatedProduct: null,
      savedProducts: [],

      setSelectedType: (type) => set({ selectedType: type }),
      setNicheInput: (niche) => set({ nicheInput: niche }),

      generateProduct: async () => {
        set({ isGenerating: true });
        await new Promise((resolve) => setTimeout(resolve, 1400));
        const product = godlyGenerator.generateProduct(
          get().selectedType,
          get().nicheInput || "Productivity"
        );
        set({ generatedProduct: product, isGenerating: false });
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

      reset: () => set({ generatedProduct: null, isGenerating: false }),
    }),
    {
      name: "godlyforge-storage",
      partialize: (state) => ({ savedProducts: state.savedProducts }),
    }
  )
);