import { GeneratedProduct, ProductType } from "./types";

export const godlyGenerator = {
  generateProduct(type: ProductType, niche: string): GeneratedProduct {
    const title = `${niche} ${type} — Godly Edition`;
    const tagline = "Premium quality. Zero fluff. Instant Gumroad sales.";

    let fullContent = "";
    let salesPageCopy = "";

    switch (type) {
      case "AI Prompt Pack":
        fullContent = `# 25 Godly Prompts for ${niche}\n\n1. You are a world-class ${niche} strategist... (full 25 ultra-detailed prompts with examples, templates, and output formats)`;
        salesPageCopy = `Stop guessing. Get the exact prompt system that top 1% creators use to 10× their output in ${niche}.`;
        break;
      case "Notion Template":
        fullContent = `Complete Notion OS for ${niche} with linked databases, automations, 12 dashboard views, and 50+ templates.`;
        salesPageCopy = `The second-brain template 1,800+ creators already paid $49 for.`;
        break;
      default:
        fullContent = `Full professional package: 8 chapters, worksheets, checklists, bonuses, and Canva templates for ${niche}.`;
        salesPageCopy = `Attention-grabbing sales page + urgency hooks + social proof that converts cold traffic.`;
    }

    return {
      id: crypto.randomUUID(),
      type,
      niche,
      title,
      tagline,
      description: `The most complete, professional, attention-grabbing ${type.toLowerCase()} for ${niche} creators in 2026.`,
      fullContent,
      salesPageCopy,
      priceSuggestion: "$37–$49",
      thumbnailPrompt: `Cinematic product mockup of "${title}" on dark marble with glowing gold accents, premium floating card, ultra-realistic 8k`,
      launchTips: [
        "Post 3 teaser threads on X immediately",
        "Use the included Canva + Midjourney thumbnail prompt",
        "Price at $37 for maximum Gumroad conversions",
      ],
      createdAt: new Date(),
    };
  },
};