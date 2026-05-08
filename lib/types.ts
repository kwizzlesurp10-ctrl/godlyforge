export type ProductType = 
  | "AI Prompt Pack"
  | "Notion Template"
  | "Ebook / Guide"
  | "Digital Planner"
  | "Micro-Course"
  | "Design Asset Kit";

export interface GeneratedProduct {
  id: string;
  type: ProductType;
  niche: string;
  title: string;
  tagline: string;
  description: string;
  fullContent: string;
  salesPageCopy: string;
  priceSuggestion: string;
  thumbnailPrompt: string;
  launchTips: string[];
  createdAt: Date;
}

export interface ProductIdea {
  id: string;
  title: string;
  niche: string;
  confidence: number;
}