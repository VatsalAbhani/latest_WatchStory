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
};

export const FEATURED: Product[] = [
  {
    id: "p1",
    brand: "Rolex",
    model: "Submariner Date",
    ref: "126610LN",
    year: 2022,
    price: 13450,
    currency: "USD",
    availability: "in_stock",
    story: "An honest diver with full set and service history.",
    images: {
      urls: ["/placeholder.svg", "/public/WatchBackground.png", "/placeholder.svg"], // UPDATED: Multi-image array
    },
    slug: "rolex-submariner-126610ln",
  },
  {
    id: "p2",
    brand: "Audemars Piguet",
    model: "Royal Oak",
    ref: "15510ST",
    year: 2021,
    price: 48200,
    currency: "USD",
    availability: "in_stock",
    story: "Iconic tapisserie in superb condition.",
    images: { urls: ["/placeholder.svg", "/public/WatchBackground.png"] }, // UPDATED
    slug: "ap-royal-oak-15510st",
  },
  {
    id: "p3",
    brand: "Patek Philippe",
    model: "Nautilus",
    ref: "5711/1A",
    year: 2018,
    price: 118000,
    currency: "USD",
    availability: "reserved",
    story: "Thin as a whisper, presence like a bell.",
    images: { urls: ["/placeholder.svg", "/public/WatchBackground.png"] }, // UPDATED
    slug: "patek-nautilus-5711",
  },
  // --- Start of new watch added ---
  {
    id: "p4",
    brand: "Cartier",
    model: "Tank Must",
    ref: "WSTA0059",
    year: 2023,
    price: 3600,
    currency: "USD",
    availability: "in_stock",
    story: "A modern classic with elegant proportions and a quick-change strap system.",
    images: { urls: ["/placeholder.svg", "/public/WatchBackground.png"] },
    slug: "cartier-tank-must-wsta0059",
  },
  // --- End of new watch added ---

    // --- Start of new watch added ---
    {
      id: "p4",
      brand: "Cartier",
      model: "Tank Must",
      ref: "WSTA0059",
      year: 2023,
      price: 3600,
      currency: "USD",
      availability: "in_stock",
      story: "A modern classic with elegant proportions and a quick-change strap system.",
      images: { urls: ["/placeholder.svg", "/public/WatchBackground.png"] },
      slug: "cartier-tank-must-wsta0059",
    },
    // --- End of new watch added ---

      // --- Start of new watch added ---
  {
    id: "p4",
    brand: "Cartier",
    model: "Tank Must",
    ref: "WSTA0059",
    year: 2023,
    price: 3600,
    currency: "USD",
    availability: "in_stock",
    story: "A modern classic with elegant proportions and a quick-change strap system.",
    images: { urls: ["/placeholder.svg", "/public/WatchBackground.png"] },
    slug: "cartier-tank-must-wsta0059",
  },
  // --- End of new watch added ---

        // --- Start of new watch added ---
        {
          id: "p4",
          brand: "Cartier",
          model: "Tank Must",
          ref: "WSTA0059",
          year: 2023,
          price: 3600,
          currency: "USD",
          availability: "in_stock",
          story: "A modern classic with elegant proportions and a quick-change strap system.",
          images: { urls: ["/placeholder.svg", "/public/WatchBackground.png"] },
          slug: "cartier-tank-must-wsta0059",
        },
        // --- End of new watch added ---


              // --- Start of new watch added ---
  {
    id: "p4",
    brand: "Cartier",
    model: "Tank Must",
    ref: "WSTA0059",
    year: 2023,
    price: 3600,
    currency: "USD",
    availability: "in_stock",
    story: "A modern classic with elegant proportions and a quick-change strap system.",
    images: { urls: ["/placeholder.svg", "/public/WatchBackground.png"] },
    slug: "cartier-tank-must-wsta0059",
  },
  // --- End of new watch added ---


        // --- Start of new watch added ---
        {
          id: "p4",
          brand: "Cartier",
          model: "Tank Must",
          ref: "WSTA0059",
          year: 2023,
          price: 3600,
          currency: "USD",
          availability: "in_stock",
          story: "A modern classic with elegant proportions and a quick-change strap system.",
          images: { urls: ["/placeholder.svg", "/public/WatchBackground.png"] },
          slug: "cartier-tank-must-wsta0059",
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
  },
  {
    id: "a2",
    title: "Audemars Piguet: The Royal Oak Story",
    brandTags: ["AP"],
    heroImage: "/placeholder.svg",
    excerpt: "Design, desirability, and detail.",
    slug: "ap-royal-oak-story",
    publishedAt: "2024-05-20",
  },
  {
    id: "a3",
    title: "Richard Mille Authentication Guide",
    brandTags: ["RM"],
    heroImage: "/placeholder.svg",
    excerpt: "Materials and movement tell the truth.",
    slug: "richard-mille-authentication-guide",
    publishedAt: "2024-05-10",
  },
];
