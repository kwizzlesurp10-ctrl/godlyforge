import { generateText } from "ai";
import { NextResponse } from "next/server";
import type { GeneratedProduct, ProductType } from "@/lib/types";

export const maxDuration = 60;

const TYPES: ProductType[] = [
  "AI Prompt Pack",
  "Notion Template",
  "Ebook / Guide",
  "Digital Planner",
  "Micro-Course",
  "Design Asset Kit",
];

const hits = new Map<string, { n: number; t: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;

function limited(ip: string): boolean {
  const now = Date.now();
  const cur = hits.get(ip);
  if (!cur || now - cur.t > WINDOW_MS) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  if (cur.n >= MAX) return true;
  cur.n += 1;
  return false;
}

function parseProduct(text: string, type: ProductType, niche: string): GeneratedProduct {
  const raw = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const data = JSON.parse(raw) as Record<string, unknown>;
  const str = (k: string) => (typeof data[k] === "string" ? data[k] : "");
  const tips = Array.isArray(data.launchTips)
    ? data.launchTips.filter((x): x is string => typeof x === "string").slice(0, 8)
    : [];
  return {
    id: crypto.randomUUID(),
    type,
    niche,
    title: str("title") || `${niche} ${type}`,
    tagline: str("tagline") || "Forged by GODLY engine",
    description: str("description"),
    fullContent: str("fullContent"),
    salesPageCopy: str("salesPageCopy"),
    priceSuggestion: str("priceSuggestion") || "$29–$49",
    thumbnailPrompt: str("thumbnailPrompt"),
    launchTips: tips,
    createdAt: new Date(),
  };
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  let body: { type?: string; niche?: string };
  try {
    body = (await req.json()) as { type?: string; niche?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = body.type as ProductType;
  const niche = (body.niche || "").trim().slice(0, 120);
  if (!TYPES.includes(type) || niche.length < 2) {
    return NextResponse.json({ error: "Need product type and niche" }, { status: 400 });
  }

  const model = process.env.GODLY_MODEL || "openai/gpt-4o-mini";
  const prompt = `You are the GODLY product engine. Return ONLY JSON, no markdown.
Keys: title, tagline, description, fullContent, salesPageCopy, priceSuggestion, thumbnailPrompt, launchTips (string array).
Product type: ${type}
Niche: ${niche}
Rules: no fake sales counts, no fake testimonials, no "1800+ buyers". Copy must be usable. fullContent must be substantial (prompts, outline, or kit list for that type).`;

  try {
    const { text } = await generateText({ model, prompt });
    const product = parseProduct(text, type, niche);
    if (!product.fullContent || !product.salesPageCopy) {
      return NextResponse.json({ error: "Engine returned incomplete product" }, { status: 502 });
    }
    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Engine unavailable. No fake product." },
      { status: 503 },
    );
  }
}
