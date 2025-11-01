// client/content/types.ts
export type ArticleFull = {
    slug: string;             // e.g. "fake-rolex-dubai"
    title: string;
    description: string;
    heroImage?: string;
    author?: string;
    publishedAtISO?: string;  // "2025-10-30" (ISO preferred)
    readingTime?: string;     // e.g., "8 min read"
    keywords?: string[];
    // The React body to render inside the article page:
    Body: React.FC;
  };
