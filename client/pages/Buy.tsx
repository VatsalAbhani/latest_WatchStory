
//Buy.tsx
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import BuyPageFilter, {
  BrandKey,
  SortOption,
  BRANDS,
} from "@/components/BuyPageFilter";
import { FEATURED } from "@/lib/data";
import { useEffect, useState, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "@/components/Seo";
import SplitText from "gsap/SplitText";
// Assuming 'Product' is a type from your project
type Product = (typeof FEATURED)[0]; 


gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.registerPlugin(ScrollTrigger);

// Define the shape of your filter state
interface FilterState {
  searchQuery: string;
  sortOption: string; // e.g., 'price-asc', 'price-desc', 'name-asc'
}


const WHATSAPP_ICON_SRC = "/whatsapp-icon.png";


// / --- WHATSAPP LINK COMPONENT (ANIMATION REMOVED) ---
function WhatsAppLink() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const originalTextRef = useRef<HTMLSpanElement>(null);
  const hoverTextRef = useRef<HTMLSpanElement>(null);
  const splitRefs = useRef<{ original?: SplitText; hover?: SplitText }>({});

  const text = "Chat With Us on WhatsApp";

// Setup SplitText on mount (copied from MenuLink, running here)
useEffect(() => {
  if (originalTextRef.current && hoverTextRef.current) {
    const originalSplit = new SplitText(originalTextRef.current, { type: "chars" });
    const hoverSplit = new SplitText(hoverTextRef.current, { type: "chars" });
    
    splitRefs.current = { original: originalSplit, hover: hoverSplit };

    gsap.set(hoverSplit.chars, { y: "100%" }); // Hover text hidden below
    gsap.set(originalSplit.chars, { y: "0%" }); // Original text visible

    return () => {
      originalSplit.revert();
      hoverSplit.revert();
    };
  }
}, [text]);

// HandleMouseEnter logic (copied from MenuLink, running on outer <a>)
const handleMouseEnter = () => {
  const { original, hover } = splitRefs.current;
  if (!original || !hover) return;

  // Animate underline
  const underline = linkRef.current?.querySelector('.underline');
  if (underline) {
    gsap.set(underline, { transformOrigin: "left center" });
    gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
  }
  
  gsap.to(original.chars, {
    y: "-100%",
    stagger: 0.01,
    duration: 0.3,
    ease: "sine.in",
  });

  gsap.to(hover.chars, {
    y: "0%",
    stagger: 0.01,
    duration: 0.4,
    ease: "sine.out",
  });
};

// HandleMouseLeave logic (copied from MenuLink, running on outer <a>)
const handleMouseLeave = () => {
  const { original, hover } = splitRefs.current;
  if (!original || !hover) return;
  
  // Animate underline
  const underline = linkRef.current?.querySelector('.underline');
  if (underline) {
    gsap.set(underline, { transformOrigin: "right center" });
    gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.in" });
  }

  gsap.to(original.chars, {
    y: "0%",
    stagger: 0.01,
    duration: 0.3,
    ease: "sine.out",
  });

  gsap.to(hover.chars, {
    y: "100%",
    stagger: 0.01,
    duration: 0.3,
    ease: "sine.in",
  });
};

return (
  <a 
    ref={linkRef}
    href="https://wa.me/971569602690" // Example Dubai number
    target="_blank" 
    rel="noreferrer" 
    // The entire <a> tag is the unified hover trigger
    className="inline-flex items-center gap-2 text-sm ws-button-secondary py-2 px-4 relative group/whatsapp"
    onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave}
  >
    <img 
      src={WHATSAPP_ICON_SRC} 
      alt="WhatsApp" 
      className="w-5 h-5" 
    />
    
    {/* Manually embedded text content for animation */}
    <div className="relative inline-block font-sans text-base font-semibold
 transition-colors">
      <div className="relative h-[1.5em] overflow-hidden grid">
        <span 
          ref={originalTextRef} 
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {text}
        </span>
        <span 
          ref={hoverTextRef} 
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {text}
        </span>
      </div>
      {/* Underline targetting this specific link */}
      <span className="underline absolute bottom-[-2px] left-0 block h-[1px] w-full bg-current scale-x-0"></span>
    </div>
  </a>
);
}







export default function Buy() {
  // 1. STATE FOR FILTERS
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    sortOption: "none",
  });

  // 2. HANDLERS TO UPDATE FILTERS
  const handleSearchChange = (query: string) => {
    // This function receives the tag (e.g., "ROLEX") or the input text
    setFilters(prev => ({ 
        ...prev, 
        searchQuery: query // Updates the state, which re-renders BuyPageFilter with the new value
    }));
  };

  const handleSortChange = (option: string) => {
    setFilters(prev => ({ 
        ...prev, 
        sortOption: option
    }));
  };

  const handleFilterChange = (key: string, value: string) => {
    // General filter handler for future use
    setFilters(prev => ({ 
        ...prev, 
        [key]: value
    }));
  };

  // 3. FILTERING AND SORTING LOGIC (Using useMemo for performance)
  const filteredProducts = useMemo(() => {
    let products = [...FEATURED];
    
    // a. Filtering by Search Query (Case-insensitive match on brand or model)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      products = products.filter(p => 
        p.brand.toLowerCase().includes(query) || 
        p.model.toLowerCase().includes(query)
      );
    }

    // b. Sorting
    switch (filters.sortOption) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        products.sort((a, b) => a.model.localeCompare(b.model));
        break;
      // Add other sort cases as needed
    }

    return products;
  }, [filters]); // Re-run logic whenever filters change

  // GSAP SCROLL EFFECT (Updated to depend on filteredProducts)
  useEffect(() => {
    document.title = "Shop Authentic Luxury Watches | Rolex, AP, Patek, RM — WatchStory";

    const createdTriggers: ScrollTrigger[] = []; // <-- FIX: Initialize array to track only local triggers

    // Kill any existing triggers REMOVED: ScrollTrigger.getAll().forEach(t => t.kill());

    // Collect cards
    const cards = gsap.utils.toArray(".watch-card-parallax");

    // Skip animation if no cards exist (e.g., when filtered list is empty)
    if (cards.length === 0) return () => {}; // Return empty cleanup if no cards

    // Parameters
    const baseOffset = 20; // initial vertical offset
    const waveDelay = 0.15; // delay increment per card
    const duration = 0.8;
    const ease = "power2.out";

    // Create individual ScrollTriggers for a wave effect
    cards.forEach((card, i) => {
      const tween = gsap.fromTo(
        card as gsap.DOMTarget,
        { y: baseOffset, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          ease,
          // Staggered delay for the wave effect
          delay: i * waveDelay, 
          scrollTrigger: {
            trigger: card as gsap.DOMTarget,
            start: `top 90%`, 
            end: `bottom top`,
            toggleActions: "play none none none",
          },
        }
      );
      // FIX: Capture the ScrollTrigger instance attached to the tween
      if (tween.scrollTrigger) {
        createdTriggers.push(tween.scrollTrigger);
      }
    });

    return () => {
      // FIX: Only kill the triggers created by this component instance
      createdTriggers.forEach(t => t.kill());
    };
  // Re-run effect when filteredProducts changes to apply animation to new cards
  }, [filteredProducts]); 

  return (
    <Layout>
            <Seo
        title="Buy Authentic Luxury Watches in Dubai"
        description="Shop authenticated Rolex, AP, and Patek Philippe watches available for immediate sale in Dubai. Includes 12-month warranty."
        canonical="/buy"
      />


{/* 
<Helmet>
  <script type="application/ld+json">{JSON.stringify({
    "@context":"https://schema.org",
    "@type":"CollectionPage",
    "name":"Buy Luxury Watches",
    "mainEntity":{
      "@type":"ItemList",
      "itemListElement": products.map((p, i)=>({
        "@type":"ListItem",
        "position": i+1,
        "url": `https://www.watchstory.ae/watch/${p.slug}`
      }))
    }
  })}</script>
</Helmet> */}






      {/* 1. Hero/Title Section */}
      <section className="ws-container mt-24 pt-16 pb-0 md:pb-8 bg-background">
        <p className="text-sm text-offwhite/60 font-medium tracking-widest mb-2">DISCOVER</p>

        {/* MODIFIED H1/H2 BLOCK: Explicitly mention commercial keywords */}
        <h1 className="font-title font-normal text-4xl sm:text-5xl max-w-6xl">
          Find your perfect luxury watch
        </h1>

        
        <h2 className="font-sans font-light text-base text-offwhite/80 mt-2 max-w-4xl">
          Rolex, Audemars Piguet (AP), Patek Philippe, and Richard Mille (RM) models available in Dubai.
        </h2>
        {/* END MODIFIED H1/H2 BLOCK */}
        <p className=" font-thin mt-3 mb-8 max-w-xl">Every watch is fully authenticated and comes complete with our 12 month warranty</p>
      </section>

{/* MODIFIED SECTION: Temporarily Display "Coming Soon" Message and Call to Action */}
<section className="ws-container py-16 text-center bg-gray-100/80 rounded-lg my-8 shadow-2xl">
      <h2 className="font-title text-3xl sm:text-4xl text-white mb-4">
        We're Curating Our Collection!!
      </h2>
      <p className="font-sans text-lg text-offwhite/80 max-w-3xl mx-auto mb-6">
        Our complete selection of luxury watches will be available here soon. We're carefully updating our online catalogue to ensure an exceptional browsing experience.
      </p>
      
      {/* Emphasize the WhatsApp Call to Action */}
      <p className="font-sans text-xl !text-yellow-900 font-semibold max-w-4xl mx-auto mb-8">
        Meanwhile, if you have a specific <strong className="!text-yellow-900">Rolex, AP, RM, Cartier or Patek Philippe</strong> model on your mind to buy, 
        please connect with us on <strong className="!text-yellow-900">WHATSAPP</strong> for immediate assistance and availability.
      </p>
      
      {/* You should replace #LINK_TO_WHATSAPP with your actual WhatsApp link */}
      {/* <a 
        href="https://wa.me/971569602690"
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block px-8 py-3 bg-green-500 text-white font-bold rounded-lg text-lg hover:bg-green-600 transition duration-300 shadow-xl"
      >
        Chat With Us on WhatsApp
      </a> */}


<WhatsAppLink /> 
    </section>
    {/* END MODIFIED SECTION */}

{/* Product Search and Display ------------------------------------------

      <section className="ws-container">
        <BuyPageFilter 
          searchQuery={filters.searchQuery}
          sortOption={filters.sortOption}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
          productCount={filteredProducts.length}
        />
      </section>

     
      <section className="ws-container pb-16">  
        <div className="grid md:grid-cols-3 gap-6 mt-8 watch-grid-container">
          {filteredProducts.length > 0 ? (
            // RENDER THE FILTERED LIST
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className="watch-card-parallax transform-none hover:transform-none"
              >
                <ProductCard product={p} />
              </div>
            ))
          ) : (
            <p className="text-offwhite/70 col-span-full text-center py-10">
              No watches found matching your criteria. Try adjusting your filters.
            </p>
          )}
        </div>
      </section>

 */}

      
    </Layout>
  );
}





























// -----------------------------------------         updated buy page with watches and details


// // Buy.tsx
// import { useMemo, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import Layout from "@/components/Layout";
// import Seo from "@/components/Seo";
// import MagneticButton from "@/components/MagneticButton";
// import BuyPageFilter, {
//   BRANDS,
//   BrandKey,
//   SortOption,
// } from "@/components/BuyPageFilter";
// import { FEATURED, Product } from "@/lib/data";

// const WHATSAPP_NUMBER = "971569602690";
// const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
// const WHATSAPP_ICON_SRC = "/whatsapp-icon.png";

// // Helper to normalise strings for comparisons
// const normalize = (value?: string | null) =>
//   (value ?? "").toLowerCase().trim();




// // List of primary brands we explicitly support in filters
// const MAIN_BRANDS = [
//   "rolex",
//   "audemars piguet",
//   "richard mille",
//   "patek philippe",
//   "cartier",
//   "omega",
// ].map((b) => b.toLowerCase());

// export default function Buy() {
//   const [selectedBrand, setSelectedBrand] = useState<BrandKey>("all");
//   const [sortOption, setSortOption] = useState<SortOption>("latest");

//   const products = FEATURED as Product[];
//   const hasAnyWatches = products && products.length > 0;

//   const filteredAndSortedProducts = useMemo(() => {
//     if (!products || products.length === 0) return [];

//     let list = [...products];

//     // --- BRAND FILTER ---
//     if (selectedBrand !== "all") {
//       list = list.filter((product) => {
//         const brand = normalize(product.brand);

//         if (!brand) return false;

//         if (selectedBrand === "other") {
//           return !MAIN_BRANDS.includes(brand);
//         }

//         const selectedLabel = BRANDS.find(
//           (b) => b.key === selectedBrand
//         )?.label;

//         if (!selectedLabel) return true;

//         return brand === normalize(selectedLabel);
//       });
//     }

//     // --- SORTING ---
//     list.sort((a, b) => {
//       const priceA = Number((a as any).price) || 0;
//       const priceB = Number((b as any).price) || 0;
//       const yearA = Number((a as any).year) || 0;
//       const yearB = Number((b as any).year) || 0;

//       switch (sortOption) {
//         case "price-asc":
//           return priceA - priceB;
//         case "price-desc":
//           return priceB - priceA;
//         case "latest":
//         default: {
//           // Prefer newer year if available
//           if (yearA && yearB && yearA !== yearB) {
//             return yearB - yearA;
//           }
//           // Fallback: keep original order
//           const indexA = products.indexOf(a);
//           const indexB = products.indexOf(b);
//           return indexA - indexB;
//         }
//       }
//     });

//     return list;
//   }, [products, selectedBrand, sortOption]);

//   const showCuratingMessage =
//     !hasAnyWatches || filteredAndSortedProducts.length === 0;

//   return (
//     <Layout>
//       <Seo
//         title="Buy Luxury Watches in Dubai | WatchStory"
//         description="Explore curated pre-owned Rolex, Audemars Piguet, Patek Philippe, Richard Mille, Cartier, Omega and more at WatchStory, Dubai."
//       />

//       <main className="mt-24 min-h-screen bg-background">
//         <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
//           {/* Page heading */}
//           <header className="mb-6 sm:mb-8">
//             <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.28em] text-muted-foreground mb-2">
//               Available Watches
//             </p>
//             <h1 className="font-title text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
//               Curated timepieces for serious collectors
//             </h1>
//             <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">
//               Every watch listed here is inspected, authenticated and matched
//               against current Dubai market data. Browse by brand, sort by price
//               or recency, and reach out on WhatsApp when you&apos;re ready to
//               discuss a piece.
//             </p>
//           </header>

//           {/* Filters */}
//           <div className="mb-6 sm:mb-8">
//             <BuyPageFilter
//               selectedBrand={selectedBrand}
//               sortOption={sortOption}
//               onBrandChange={setSelectedBrand}
//               onSortChange={setSortOption}
//             />
//           </div>

//           {/* Listing / Curating state */}
//           {showCuratingMessage ? (
//             <div className="border border-border/40 rounded-2xl bg-card/50 backdrop-blur-sm px-6 py-10 sm:px-8 sm:py-12 text-center">
//               <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-3">
//                 Curating Our Collection
//               </p>
//               <h2 className="font-title text-xl sm:text-2xl md:text-3xl mb-3">
//                 Our first releases are being hand-picked.
//               </h2>
//               <p className="max-w-xl mx-auto text-sm sm:text-base text-muted-foreground mb-6">
//                 We are currently curating a small, high-conviction selection of
//                 Rolex, Audemars Piguet, Patek Philippe, Richard Mille, Cartier
//                 and other notable houses. If you&apos;d like early access to
//                 pieces before they go live, send us a message on WhatsApp.
//               </p>
//               <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
//                 <MagneticButton
//                   href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent(
//                     "Hi WatchStory, I would like to know which watches you currently have available."
//                   )}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   variant="primary"
//                   className="min-w-[220px] text-sm sm:text-base font-semibold"
//                 >
//                   Inquire on WhatsApp
//                 </MagneticButton>
//                 <Link
//                   to="/sell"
//                   className="text-xs sm:text-sm text-muted-foreground underline-offset-4 hover:underline"
//                 >
//                   Looking to sell instead? Start with a free offer.
//                 </Link>
//               </div>
//             </div>
//           ) : (
//             // <div className="space-y-4 sm:space-y-5">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
//               {filteredAndSortedProducts.map((product) => (
//                 <BuyWatchCard
//                   key={(product as any).slug ?? (product as any).id}
//                   watch={product}
//                 />
//               ))}
//             </div>
//           )}
//         </section>
//       </main>
//     </Layout>
//   );
// }



// // === WATCH CARD COMPONENT WITH IMAGE SLIDER, SWIPE + PROGRESS ===

// interface BuyWatchCardProps {
//   watch: Product;
// }

// function BuyWatchCard({ watch }: BuyWatchCardProps) {
//   const imagesAny = (watch as any).images as | { urls?: string[] } | undefined;
//   const imageUrls = imagesAny?.urls?.length ? imagesAny.urls : ["/placeholder-watch.jpg"];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const touchStartX = useRef<number | null>(null);

//   const nextImage = () => {
//     if (imageUrls.length <= 1) return;
//     setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
//   };

//   const prevImage = () => {
//     if (imageUrls.length <= 1) return;
//     setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
//   };

//   const handleTouchStart = (e: any) => {
//     const touch = e.touches?.[0];
//     if (!touch) return;
//     touchStartX.current = touch.clientX;
//   };

//   const handleTouchEnd = (e: any) => {
//     if (touchStartX.current === null) return;
//     const touch = e.changedTouches?.[0];
//     if (!touch) return;

//     const deltaX = touch.clientX - touchStartX.current;
//     const threshold = 40; // minimum swipe distance in px

//     if (deltaX > threshold) {
//       prevImage();
//     } else if (deltaX < -threshold) {
//       nextImage();
//     }

//     touchStartX.current = null;
//   };

//   const whatsappUrl = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(
//     `Hi WatchStory, I'm interested in the ${watch.brand} ${watch.model} (${watch.ref}), year ${watch.year}. Is it still available?`
//   )}`;

//   const detailsPath = `/watch/${(watch as any).slug}`;

//   // Meta line
//   const metaPieces: string[] = [];
//   if (watch.year) metaPieces.push(`${watch.year}`);
//   if ((watch as any).size) metaPieces.push(`${(watch as any).size} mm`);

//   const hasBox = Boolean((watch as any).box);
//   const hasPapers = Boolean((watch as any).certificate);

//   if (hasBox && hasPapers) metaPieces.push("Full set");
//   else if (hasBox) metaPieces.push("Box");
//   else if (hasPapers) metaPieces.push("Papers");

//   if ((watch as any).condition) metaPieces.push(String((watch as any).condition));

//   const metaLine = metaPieces.length > 0 ? metaPieces.join(" · ") : null;

//   return (
//     <article className="group relative overflow-hidden  bg-gradient-to-br from-background/95 to-card/90 shadow-sm transition-all duration-500 hover:shadow-lg">
//       {/* Subtle golden glow line */}
//       <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

//       <div className="flex flex-col xl:flex-row">
//         {/* LEFT: IMAGE SECTION WITH SLIDER */}
//         <div className="xl:w-[58%] relative flex flex-col">
//           <div
//             className="aspect-[4/5] w-full overflow-hidden bg-muted/30 relative"
//             onTouchStart={handleTouchStart}
//             onTouchEnd={handleTouchEnd}
//           >
//             {/* MAIN IMAGE */}
//             <img
//               key={imageUrls[currentIndex]}
//               src={imageUrls[currentIndex]}
//               alt={`${watch.brand} ${watch.model} ${watch.ref}`}
//               className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04]"
//               loading="lazy"
//             />

//             {/* Curated badge inside the image (same style as before) */}
//             {/* <div className="absolute bottom-2 left-2 flex items-center gap-2">
//               <span className="inline-block h-px w-6 bg-primary/80 rounded-full" />
//               <p className="text-[0.65rem] uppercase tracking-[0.22em] text-primary">
//                 Curated by WatchStory
//               </p>
//             </div> */}

//             {/* LEFT ARROW – no bg / no border */}
//             {imageUrls.length > 1 && (
//               <button
//                 type="button"
//                 onClick={prevImage}
//                 aria-label="Previous image"
//                 className="
//                   absolute left-3 top-1/2 -translate-y-1/2
//                   h-8 w-8 flex items-center justify-center
//                   text-primary text-2xl
//                   opacity-100 sm:opacity-0 sm:group-hover:opacity-100
//                   transition-opacity duration-300
//                 "
//               >
//                 ‹
//               </button>
//             )}

//             {/* RIGHT ARROW – no bg / no border */}
//             {imageUrls.length > 1 && (
//               <button
//                 type="button"
//                 onClick={nextImage}
//                 aria-label="Next image"
//                 className="
//                   absolute right-3 top-1/2 -translate-y-1/2
//                   h-8 w-8 flex items-center justify-center
//                   text-primary text-2xl
//                   opacity-100 sm:opacity-0 sm:group-hover:opacity-100
//                   transition-opacity duration-300
//                 "
//               >
//                 ›
//               </button>
//             )}

//             {/* DESKTOP THUMBNAILS ON HOVER (BOTTOM RIGHT) */}
//             {imageUrls.length > 1 && (
//               <div
//                 className="
//                   hidden sm:flex
//                   absolute bottom-2 right-2
//                   gap-1 bg-background/70 backdrop-blur-sm
//                   px-2 py-1 rounded-full border border-border/40 shadow-sm
//                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
//                 "
//               >
//                 {imageUrls.map((url, index) => (
//                   <button
//                     key={url + index}
//                     type="button"
//                     onMouseEnter={() => setCurrentIndex(index)}
//                     className={`
//                       h-7 w-7 rounded-md overflow-hidden border
//                       ${
//                         index === currentIndex
//                           ? "border-primary/70"
//                           : "border-border/40 opacity-70"
//                       }
//                     `}
//                   >
//                     <img
//                       src={url}
//                       alt=""
//                       className="h-full w-full object-cover"
//                       loading="lazy"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* SMALL PROGRESS LINE UNDER IMAGE */}
//           {imageUrls.length > 1 && (
//             <div className="mt-1 h-[2px] w-full bg-border/30 overflow-hidden">
//               <div
//                 className="h-full bg-primary transition-all duration-300"
//                 style={{
//                   width: `${((currentIndex + 1) / imageUrls.length) * 100}%`,
//                 }}
//               />
//             </div>
//           )}
//         </div>

//         {/* RIGHT: TEXT DETAILS */}
//         <div className="sm:w-[58%] p-4 sm:p-5 flex flex-col justify-between gap-3">
//           <div>
//             <p className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground mb-1">
//               {watch.brand}
//             </p>

//             <h2 className="font-title text-base sm:text-lg md:text-xl font-semibold leading-snug">
//               {watch.model}
//             </h2>

//             {watch.ref && (
//               <p className="text-[0.7rem] text-muted-foreground mt-0.5">
//                 Ref. {watch.ref}
//               </p>
//             )}

//             {metaLine && (
//               <p className="text-[0.7rem] text-muted-foreground mt-1">
//                 {metaLine}
//               </p>
//             )}
//           </div>

//           {/* Divider + Price on Request + CTAs */}
//           <div className="pt-3 border-t border-border/30 flex flex-col gap-3">
//             <p className="text-[0.8rem] font-medium tracking-wide">
//               Price on Request
//             </p>

//             <div className="grid grid-cols-2  items-center">
//   <MagneticButton
//     href={whatsappUrl}
//     target="_blank"
//     rel="noopener noreferrer"
//     variant="primary"
//     className="w-full min-w-0 text-center text-[0.68rem] sm:text-[0.72rem] lg:text-[0.90rem] font-semibold leading-tight"
//   contentClassName="!px-3 !py-2 sm:!px-4 sm:!py-2.5"
//   > 
//     Inquire     <span><img 
//       src={WHATSAPP_ICON_SRC} 
//       alt="WhatsApp" 
//       className=" inline-block w-4  h-4 mb-1" 
//     /></span>
//   </MagneticButton>

//   <MagneticButton
//     href={detailsPath}
//     variant="secondary"
//     className="w-full min-w-0 text-center text-[0.68rem] sm:text-[0.72rem] lg:text-[0.90rem] font-semibold leading-tight"
//     contentClassName="!px-3 !py-2 sm:!px-4 sm:!py-2.5"
//       >
//     {/* <span className="xl:hidden">View</span> */}
//     <span className="hidden xl:inline">Details</span>
//   </MagneticButton>
// </div>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

