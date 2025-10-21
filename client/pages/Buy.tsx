
//Buy.tsx
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import BuyPageFilter from "@/components/BuyPageFilter";
import { FEATURED } from "@/lib/data";
import { useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "@/components/Seo";
// Assuming 'Product' is a type from your project
type Product = (typeof FEATURED)[0]; 


gsap.registerPlugin(ScrollTrigger);

// Define the shape of your filter state
interface FilterState {
  searchQuery: string;
  sortOption: string; // e.g., 'price-asc', 'price-desc', 'name-asc'
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
        title="Buy Authentic Luxury Watches"
        description="Shop authenticated Rolex, AP, and Patek Philippe watches available for immediate sale in Dubai. Includes 12-month warranty."
        canonical="/buy"
      />
      {/* 1. Hero/Title Section */}
      <section className="ws-container pt-16 pb-0 md:pb-8 bg-background">
        <h4 className="text-sm text-offwhite/60 font-medium tracking-widest mb-2">DISCOVER</h4>

        {/* MODIFIED H1/H2 BLOCK: Explicitly mention commercial keywords */}
        <h1 className="font-title text-4xl sm:text-5xl max-w-6xl">
          Find your perfect luxury watch
        </h1>

        
        <h2 className="font-sans text-base text-offwhite/80 mt-2 max-w-4xl">
          Rolex, Audemars Piguet (AP), Patek Philippe, and Richard Mille (RM) models available in Dubai.
        </h2>
        {/* END MODIFIED H1/H2 BLOCK */}
        <p className="text-offwhite/70 mt-3 mb-8 max-w-xl">Every watch is fully authenticated and comes complete with our 12 month warranty</p>
      </section>

{/* MODIFIED SECTION: Temporarily Display "Coming Soon" Message and Call to Action */}
<section className="ws-container py-16 text-center bg-gray-100/80 rounded-lg my-8 shadow-2xl">
      <h2 className="font-title text-3xl sm:text-4xl text-white mb-4">
        We're Curating Our Collection! 🛠️
      </h2>
      <p className="font-sans text-lg text-offwhite/80 max-w-3xl mx-auto mb-6">
        The full inventory of luxury watches will be displayed here soon. We're working hard to update our online catalogue.
      </p>
      
      {/* Emphasize the WhatsApp Call to Action */}
      <p className="font-sans text-xl !text-yellow-900 font-semibold max-w-4xl mx-auto mb-8">
        Meanwhile, if you have a specific **Rolex, AP, RM, Cartier or Patek Philippe** model on your mind to buy, please connect with us on **WHATSAPP** for immediate assistance and availability.
      </p>
      
      {/* You should replace #LINK_TO_WHATSAPP with your actual WhatsApp link */}
      <a 
        href="https://wa.me/971545056156"
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block px-8 py-3 bg-green-500 text-white font-bold rounded-lg text-lg hover:bg-green-600 transition duration-300 shadow-xl"
      >
        Chat With Us on WhatsApp
      </a>
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