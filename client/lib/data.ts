// client/lib/data.ts

export type Product = {
  id: string;
  brand: string;
  model: string;
  ref: string;
  year: number;
  price: number;
  currency: string;
  availability: "in_stock" | "reserved" | "sold";
  story: string;
  images: { urls: string[] }; // UPDATED: Changed to an array of URLs
  slug: string;
  bgColor: string;
  textColor: string;
};

export const FEATURED: Product[] = [
  {
    id: "p1",
    brand: "Rolex",
    model: "Datejust 41",
    ref: "126334",
    year: 2022,
    price: 13450,
    currency: "USD",
    availability: "in_stock",
    story: "Authenticated Rolex Datejust 41 (Ref: 126334) for sale in Dubai. Complete set and backed by our 12-month warranty.",
    images: {
      urls: ["/Rolex/datejust/rolex-datejust.avif",
        "/Rolex/datejust/rolex-datejust-img2.webp",
        "/Rolex/datejust/rolex-datejust-img3.webp"], // UPDATED: Multi-image array
    },
    slug: "rolex-datejust-41-126334",


    bgColor: 'bg-stone-200', // Light, subtle stone grey
    textColor: 'text-offwhite', // High-contrast black text
  },
  {
    id: "p2",
    brand: "Rolex",
    model: "Lady-Datejust",
    ref: "279174",
    year: 2021,
    price: 48200,
    currency: "USD",
    availability: "in_stock",
    story: "Rare Rolex Lady-Datejust with diamond-set dial. Certified pre-owned and available for immediate sale in Dubai.",
    images: {
      urls: ["/Rolex/ladydatejust/rolex-ladydatejust.png",
        "/Rolex/ladydatejust/rolex-ladydatejust-img2.webp",
        "/Rolex/ladydatejust/rolex-ladydatejust-img3.avif"], // UPDATED: Multi-image array
    },
    slug: "rolex-lady-datejust-279174",

    bgColor: 'bg-zinc-900',  // Deep, dark charcoal
    textColor: 'text-white', // Bright white text

  },
  {
    id: "p3",
    brand: "Rolex",
    model: "GMT-Master II",
    ref: "126720VTNR",
    year: 2018,
    price: 118000,
    currency: "USD",
    availability: "in_stock",
    story: "The iconic left-handed Rolex GMT-Master II 'Sprite' (VTNR). Fully authenticated luxury watch for sale in Dubai.",
    images: {
      urls: ["/Rolex/gmt-master/rolex-gmt-master2.png",
        "/Rolex/gmt-master/rolex-gmt-master2-img2.webp",
        "/Rolex/gmt-master/rolex-gmt-master2-img3.jpg"], // UPDATED: Multi-image array
    },
    slug: "rolex-gmt-master-ii-126720VTNR",

    bgColor: 'bg-stone-200', // Light, subtle stone grey
    textColor: 'text-black', // High-contrast black text
  },
  // --- Start of new watch added ---
  {
    id: "p4",
    brand: "Patek Philippe",
    model: "Aquanaut 5167R-001",
    ref: "5167R-001",
    year: 2023,
    price: 3600,
    currency: "USD",
    availability: "in_stock",
    story: "A stunning Patek Philippe Aquanaut in rose gold (5167R-001). Fully inspected and available for sale in the UAE.",
    images: {
      urls: ["/Patek/patek-aquanaut.png",
        "/Patek/patek-aquanaut-img2.avif",
        "/Patek/patek-aquanaut-img3.webp",
        "/Patek/patek-aquanaut-img4.webp"], // UPDATED: Multi-image array
    },
    slug: "patek-philippe-aquanaut-5167R-001",

    bgColor: 'bg-stone-200', // Light, subtle stone grey
    textColor: 'text-black', // High-contrast black text
  },
  // --- End of new watch added ---

  // --- Start of new watch added ---
  {
    id: "p5",
    brand: "Audemars Piguet",
    model: "Royal Oak Selfwinding",
    ref: "15510ST.OO.1320ST.06",
    year: 2023,
    price: 3600,
    currency: "USD",
    availability: "in_stock",
    story: "Audemars Piguet Royal Oak Selfwinding: the stainless steel icon. Fully authenticated, superb condition, ready for collection in Dubai.",
    images: {
      urls: ["/AP/AP-royal.png",
        "/AP/ap-royal-img2.avif",
        "/AP/ap-royal-img3.webp"], // UPDATED: Multi-image array
    },
    slug: "audemars-piguet-royal-oak-selfwinding",

    bgColor: 'bg-stone-200', // Light, subtle stone grey
    textColor: 'text-black', // High-contrast black text
  },
  // --- End of new watch added ---









];

export type Article = {
  id: string;
  title: string;
  brandTags: string[];
  heroImage: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  // --- ADDED FIELDS ---
  author?: string; // Add this field
  readingTime?: string; // Add this field
  // --------------------
};

export const POSTS: Article[] = [
  {
    id: "a1",
    title: "Buying a Rolex in Dubai: What Matters",
    brandTags: ["Rolex"],
    heroImage: "/placeholder.svg",
    excerpt: "Market dynamics, authentication, and pricing—explained.",
    slug: "buy-rolex-dubai-guide",
    publishedAt: "2024-06-01",
    author: "WatchStory Team", // Add data here
    readingTime: "5 min read", // Add data here
  },
  {
    id: "a2",
    title: "Audemars Piguet: The Royal Oak Story",
    brandTags: ["AP"],
    heroImage: "/AP/ap-royal-img2.avif", // Use a valid image path if available
    excerpt: "Design, desirability, and detail. Why Genta's original design remains an icon.",
    slug: "ap-royal-oak-story",
    publishedAt: "2024-05-20",
    author: "Gérald Dubois",
    readingTime: "8 min read",
  },
  {
    id: "a3",
    title: "Richard Mille Authentication Guide",
    brandTags: ["RM"],
    heroImage: "/placeholder.svg",
    excerpt: "Materials and movement tell the truth. Our specialists' tips for verifying genuine Mille.",
    slug: "richard-mille-authentication-guide",
    publishedAt: "2024-05-10",
    author: "WatchStory Team",
    readingTime: "4 min read",
  },
  {
    id: "a4",
    title: "Understanding Patek Philippe Reference Numbers",
    brandTags: ["Patek Philippe"],
    heroImage: "/Patek/nautilus/patek-nautilus-lady.avif",
    excerpt: "A deep dive into Patek's complex numbering system to help you identify rare models.",
    slug: "patek-reference-guide",
    publishedAt: "2024-04-15",
    author: "WatchStory Research",
    readingTime: "6 min read",
  },
];

// --- NEW FUNCTION: Simulates an API call to fetch latest posts ---

/**
 * Simulates an asynchronous API call to fetch the latest blog posts.
 * In a real application, this would be a network fetch call.
 * @param count The number of posts to return.
 */
export function fetchLatestPosts(count: number = 3): Promise<Article[]> {
  return new Promise((resolve) => {
    // Simulate network delay of 500ms
    setTimeout(() => {
      resolve(POSTS.slice(0, count)); 
    }, 500); 
  });
}
