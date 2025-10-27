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
  movement?: string;
  // Condition: Used or Brand New or Like New
  condition?: string;
  // inclusion (BOX): Full Inclusions (with box)  or without box
  // inclusions == Box
  box?: boolean;
  dialcolor?: string;
  size?: string;
  material?: string;
  certificate?: boolean;
};



// Featured watches that are displayed on the home page...
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
    condition: 'Brand New',
    dialcolor: 'Blue',
    size: '41mm',
    material: 'Stainless Steel & White Gold',
    certificate: true,
    box: true,
  },
  {
    id: "p2",
    brand: "Rolex",
    model: "Lady-Datejust",
    ref: "278271",
    year: 2021,
    price: 48200,
    currency: "USD",
    availability: "in_stock",
    story: "Rolex Lady-Datejust with diamond-set dial. Certified pre-owned and available for immediate sale in Dubai.",
    images: {
      urls: ["/Rolex/ladydatejust/rolex-ladydatejust.png",
        "/Rolex/ladydatejust/rolex-ladydatejust-img2.webp",
        "/Rolex/ladydatejust/rolex-ladydatejust-img3.avif"], // UPDATED: Multi-image array
    },
    slug: "rolex-lady-datejust-279174",

    bgColor: 'bg-zinc-900',  // Deep, dark charcoal
    textColor: 'text-white', // Bright white text
    condition: 'Brand New',
    dialcolor: 'White Mother of Pearl',
    size: '31mm',
    material: 'Rose Gold & Stainless Steel',
    certificate: true,
    box: true,
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

    condition: 'Brand New',

    dialcolor: 'Black',
    size: '40mm',
    material: 'Stainless Steel & Ceramic',
    certificate: true,
    box: true,
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

    dialcolor: 'Chocolate',
    size: '40mm',
    material: 'Rose Gold',
    certificate: true,
    box: true,
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

    dialcolor: 'Blue',
    size: '41mm',
    material: 'Stainless Steel',
    certificate: true,
    box: true,
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
  // --- NEW: Add optional external URL property ---
  externalUrl?: string;
  // ----------------------------------------------
};

export const POSTS: Article[] = [
 // --- NEW: External Blog Post Entry ---
 {
  id: "a1",
  title: "Financial Times: Gen Z fuels fast-growing second-hand watch market",
  brandTags: ["Gen Z"],
  heroImage: "/blog-imgs/blog-a1.avif", // Use a generic image for now
  excerpt: "Tips from a former dealer on what to look for and what to ask when buying from a vintage specialist.",
  slug: "", // Leave blank or remove as it won't use a local route
  publishedAt: "Nov 14 2024",
  author: "Robin Swithinbank",
  readingTime: "5 Min Read",
  externalUrl: "https://www.ft.com/content/a831b315-886f-4b59-91a5-96fe352289ad",
},

// --- NEW: External Blog Post Entry ---
{
  id: "a2",
  title: "How To Deal With Vintage Watch Dealers: Five Tips",
  brandTags: ["Vintage", "Guide"],
  heroImage: "/blog-imgs/blog-a2.jpg", // Use a generic image for now
  excerpt: "Tips from a former dealer on what to look for and what to ask when buying from a vintage specialist.",
  slug: "", // Leave blank or remove as it won't use a local route
  publishedAt: "2024-10-16",
  author: "Fratello Watches",
  readingTime: "7 min read",
  externalUrl: "https://www.fratellowatches.com/how-to-deal-with-vintage-watch-dealers-five-tips-from-a-former-dealer-himself/",
},



// --- NEW: External Blog Post Entry ---
{
  id: "a3",
  title: "The Story of The Audemars Piguet Star Wheel",
  brandTags: ["AP", "Story"],
  heroImage: "/blog-imgs/blog-a3.webp", // Use a generic image for now
  excerpt: "Tips from a former dealer on what to look for and what to ask when buying from a vintage specialist.",
  slug: "", // Leave blank or remove as it won't use a local route
  publishedAt: "May 2022",
  author: "Raj Chaudhuri",
  readingTime: "26 Min Read",
  externalUrl: "https://www.acollectedman.com/blogs/journal/story-of-the-audemars-piguet-star-wheel",
},


// --- NEW: External Blog Post Entry ---
{
  id: "a4",
  title: "Collectability: Five Patek Philippe Watches for Under $5,000",
  brandTags: ["Patek Philippe"],
  heroImage: "/blog-imgs/blog-a4.jpg", // Use a generic image for now
  excerpt: "Tips from a former dealer on what to look for and what to ask when buying from a vintage specialist.",
  slug: "", // Leave blank or remove as it won't use a local route
  publishedAt: "May 2022",
  author: "Collectability",
  readingTime: "5:58 Min Video",
  externalUrl: "https://www.youtube.com/watch?v=odHOm869EwQ",
},

// --- NEW: External Blog Post Entry ---
{
  id: "a5",
  title: "Hodinkee: How the multi-million dollar sale of a single watch is helping save the planet.",
  brandTags: ["Patek Philippe"],
  heroImage: "/blog-imgs/blog-a5.avif", // Use a generic image for now
  excerpt: "Tips from a former dealer on what to look for and what to ask when buying from a vintage specialist.",
  slug: "", // Leave blank or remove as it won't use a local route
  publishedAt: "May 2022",
  author: "Logan Baker",
  readingTime: "10 Min Read",
  externalUrl: "https://www.hodinkee.com/articles/tiffany-blue-patek-philippe-nautilus-5711-phillips-zach-nature-conservancy",
},



  {
    id: "a6",
    title: "Must-Know Luxury Watch Brands",
    brandTags: ["Rolex, Patek Philippe, AP"],
    heroImage: "/blog-imgs/blog-a6.webp",
    excerpt: "The Top 10+ Must-Know Luxury Watch Brands: The Mother of All Lists",
    slug: "",
    publishedAt: "2022",
    author: "PrestigeTime", // Add data here
    readingTime: "10 min read", // Add data here
    externalUrl: "https://www.prestigetime.com/blog/must-know-luxury-watch-brands.html",
    
  },
  {
    id: "a7",
    title: "Rolex: Excellence in the Making",
    brandTags: ["Rolex"],
    heroImage: "/blog-imgs/blog-a7.avif", // Use a valid image path if available
    excerpt: "Watchmaking Skill, Excellent Workmanship",
    slug: "",
    publishedAt: "",
    author: "Rolex Team",
    readingTime: "15 min read",
    externalUrl: "https://www.rolex.com/ar/watchmaking/excellence-in-the-making",
    
  },
  {
    id: "a8",
    title: "AP TALKS THE ROYAL OAK RD#5",
    brandTags: ["AP"],
    heroImage: "/blog-imgs/blog-a8.avif",
    excerpt: "The Royal Oak “Jumbo” Extra-Thin Selfwinding Flying Tourbillon Chronograph",
    slug: "",
    publishedAt: "2025-10-01",
    author: "Audemars Piguet Team",
    readingTime: "10 min read",
    externalUrl: "https://www.audemarspiguet.com/com/en/news/savoir-faire/aptalks-the-royal-oak-rd5.html",
    
  },
  {
    id: "a9",
    title: "Patek Philippe: Taking care of your watch, Watch Care Recommendations",
    brandTags: ["Patek Philippe"],
    heroImage: "/blog-imgs/blog-a9.avif",
    excerpt: "Taking care of your watch, Watch Care Recommendations",
    slug: "",
    publishedAt: "",
    author: "Patek Philippe Team",
    readingTime: "15 min read",
    externalUrl: "https://www.patek.com/en/service/taking-care-of-your-watch/watch-care-recommendations",
    
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
