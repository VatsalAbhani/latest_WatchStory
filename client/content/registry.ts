// client/content/registry.ts
import type { ArticleFull } from "./types.ts";

// EAGER glob so the registry is available synchronously
const modules = import.meta.glob("./articles/*.tsx", { eager: true }) as Record<string, any>;

export const ARTICLE_REGISTRY: Record<string, ArticleFull> = {};

for (const path in modules) {
  const mod = modules[path];
  // each article file default-exports an ArticleFull object
  const article = mod.default as ArticleFull;
  ARTICLE_REGISTRY[article.slug] = article;
}
