// index.tsx
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async"; 
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import { FEATURED, Article, fetchLatestPosts } from "@/lib/data"; 
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import StaggeredCyclingHeading from "@/components/StaggeredCyclingHeading"; // <-- ADDED
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/MagneticButton";
import JournalSection from "@/components/JournalSection";
import HorizontalWatchShowcase from "@/components/HorizontalWatchShowcase";
import TestHorizontalScroll from "@/components/TestHorizontalScroll";
import BrandsShowcase from "@/components/BrandsShowcase";
import Seo from "@/components/Seo";
import { useIsMobile } from "@/hooks/use-mobile";



//

import DriftingWatches from "@/components/DriftingWatches"; // <-- NEW IMPORT

//

gsap.registerPlugin(ScrollTrigger);


// 1. DEFINE BACKGROUND IMAGES (using your original and new ones)
const DESKTOP_IMAGES = [
  '/bg_1.png', // Your original static image
  '/bg_2.png',           // New image 1
  '/bg_3.png',           // New image 2
];

const MOBILE_IMAGES = [
  '/bg-mobile-1.png', // New mobile-optimized image 1
  '/bg-mobile-2.png', // New mobile-optimized image 2
  '/bg-mobile-3.png', // New mobile-optimized image 3
];

// 2. SIMPLE BACKGROUND CAROUSEL COMPONENT
interface SimpleBackgroundCarouselProps {
  images: string[];
  intervalMs?: number;
}

function SimpleBackgroundCarousel({ images, intervalMs = 5000 }: SimpleBackgroundCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [images.length, intervalMs]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-30 overflow-hidden">
      {/* Simple fade transition between images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Luxury Watch Background ${index + 1}`}
            className="w-full h-full mt-16 sm:mt-0 object-contain sm:object-cover object-center inset-0 -z-30"
            // w-full h-full object-cover md:object-cover object-center inset-0 -z-30
          />
        </div>
      ))}
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 z-10" />
    </div>
  );
}
























// Brands we trust (iamges or logos)
// Add this data (you can move to your data file later)
const TRUSTED_BRANDS = [
  {
    id: '1',
    name: 'Rolex',
    logoUrl: '/rolex-logo.svg',
    description: "A crown for every achievement. Swiss luxury watchmaking since 1905.",
    established: '1905',
    country: 'Switzerland'
  },
  {
    id: '2',
    name: 'Patek Philippe',
    logoUrl: '/patek-logo.svg',
    description: "You never actually own a Patek Philippe. You merely look after it. Timeless, complication-driven Swiss horology.",
    established: '1839',
    country: 'Switzerland'
  },
  {
    id: '3',
    name: 'Audemars Piguet',
    logoUrl: '/AP-logo.svg',
    description: "To break the rules, you must first master them. Home of the iconic Royal Oak luxury sports watch.",
    established: '1875',
    country: 'Switzerland'
  },
  {
    id: '4',
    name: 'Omega',
    logoUrl: '/omega-4.svg',
    description: "The 'First Watch on the Moon' and Official Timekeeper of the Olympic Games since 1932. Known for the Speedmaster, Seamaster, and Master Chronometer technology.",
    established: '1848',
    country: 'Switzerland'
  },
  {
    id: '5',
    name: 'Cartier',
    logoUrl: '/cartier-logo.png',
    description: "The 'Jeweller of Kings' and pioneer of the modern wristwatch (Santos, Tank). Iconic Art Deco designs defining timeless elegance.",
    established: '1847',
    country: 'Switzerland'
  },
  // Add more brands...
  // RM
  {
    id: '6',
    name: 'Richard Mille',
    logoUrl: '/rm-logo.svg',
    description: "A 'Racing Machine on the Wrist.' Revolutionary luxury watches defined by extreme engineering, ultra-light TPT materials, and highly complex tourbillon movements.",
    established: '2001',
    country: 'Switzerland'
  },
  
];



const manyWatches = [
  // Original featured watches
  ...FEATURED.map(w => ({
    id: w.id,
    //${w.brand}
    name: ` ${w.model}`,
    brand: w.brand,
    price: `${w.currency === 'USD' ? '$' : ''}${w.price.toLocaleString()}`,
    imageUrl: w.images.urls[0], // Use the first image
    slug: w.slug,
    year: String(w.year),
    movement: 'Automatic',
    reference: w.ref,
    condition: 'Featured',
    bgColor: 'bg-black',
    textColor: 'text-offwhite',
  })),

];




export default function Index() {


// --- NEW: Screen detection hook ---
const isMobile = useIsMobile();
const currentBackgroundImages = isMobile ? MOBILE_IMAGES : DESKTOP_IMAGES;
// ------------------------------------

  // --- NEW STATE FOR BLOG POSTS ---
  const [latestPosts, setLatestPosts] = useState<Article[]>([]);
  const [isJournalLoading, setIsJournalLoading] = useState(true);
  // ---------------------------------

  










// =========================================================
    // 1. GSAP / ANIMATION EFFECT (Runs on isMobile change)
    // =========================================================
    useEffect(() => {
      // Kills all existing ScrollTriggers to prevent duplicates on re-render
      // ScrollTrigger.getAll().forEach(t => t.kill());

      // --- Trust strips Animation FIX ---
      // Conditionally set animation properties
      const animationProps = isMobile
          ? { opacity: 1, duration: 0, stagger: 0 } // Instant visibility on mobile
          : {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.2,
              scrollTrigger: {
                  trigger: ".trust-section",
                  start: "top 80%",
                  toggleActions: "play none none reverse",
              },
          };

      // Animate the "Trust strips" on scroll (or instantly on mobile)
      const trustStripsTween = gsap.fromTo(
          ".trust-strip",
          { y: 50, opacity: 0 },
          animationProps
      );








    // Animate the "Trust strips" on scroll
    // gsap.fromTo(
    //   ".trust-strip",
    //   { y: 50, opacity: 0 },
    //   {
    //     y: 0,
    //     opacity: 1,
    //     duration: 1,
    //     stagger: 0.2,
    //     scrollTrigger: {
    //       trigger: ".trust-section",
    //       start: "top 80%",
    //       toggleActions: "play none none reverse",
    //     },
    //   }
    // );

    // Animate the "Featured Stories" heading and carousel
    gsap.fromTo(
      ".featured-stories-container",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: ".featured-stories-container",
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Animate the "From the Journal" section
    gsap.fromTo(
      ".journal-section",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".journal-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );

   



// Cleanup: Kill the specific tween and all ScrollTriggers when the component unmounts or effect re-runs
return () => {
  trustStripsTween.kill();
  ScrollTrigger.getAll().forEach(t => t.kill());
};

}, [isMobile]); // Dependency: Re-run when mobile state changes





// --- NEW FETCH EFFECT ---
// const loadJournalPosts = async () => {
//   try {
//     // Fetch the top 3 posts (or however many you want to show)
//     const posts = await fetchLatestPosts(3); 
//     setLatestPosts(posts);
//   } catch (error) {
//     console.error("Failed to fetch journal posts:", error);
//   } finally {
//     setIsJournalLoading(false);
//   }
// };




// =========================================================
    // 2. DATA FETCHING EFFECT (Runs once on mount)
    // =========================================================
    useEffect(() => {
      const loadJournalPosts = async () => {
        try {
          // Fetch the top 3 posts
          const posts = await fetchLatestPosts(3);
          setLatestPosts(posts);
        } catch (error) {
          console.error("Failed to fetch journal posts:", error);
        } finally {
          setIsJournalLoading(false);
        }
      };









loadJournalPosts();












  }, []);

  return (
    <Layout>


        {/* 3. ADD SEO COMPONENT */}
        <Seo
          title="Buy & Sell Luxury Watches in Dubai"
          description="Shop authenticated pre-owned Rolex, Audemars Piguet, Patek Philippe & more in Dubai. WatchStory is Dubai's trusted watch shop to buy and sell authenticated luxury watches. Get fair, market-based offers and secure, insured transactions."
          canonical="/"
        />
        {/* End SEO Component */}

        <Helmet>
  <script type="application/ld+json">{JSON.stringify({
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://www.watchstory.ae/"}
    ]
  })}</script>
</Helmet>


<Helmet>
  <script type="application/ld+json">{JSON.stringify({
    "@context":"https://schema.org",
    "@type":"ItemList",
    "itemListElement": FEATURED.map((w, i) => ({
      "@type":"ListItem",
      "position": i+1,
      "url": `https://www.watchstory.ae/watch/${w.slug}`
    }))
  })}</script>
</Helmet>


      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[92vh] flex items-center overflow-hidden hero-section">

        {/*  */}
        {/* The DriftingWatches component is added here as a subtle background */}
        {/* <DriftingWatches />  */}


{/* 3. INTEGRATE BACKGROUND CAROUSEL - Use conditional images here */}
<SimpleBackgroundCarousel images={currentBackgroundImages} intervalMs={5000} />

        {/*  */}
        {/* <div className="parallax-bg"></div> */}
        {/* <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_10%,hsl(var(--brand-carbon)/0.7)_0%,transparent_60%)]" /> */}

        <div className="absolute inset-0 z-10" />



        <div className="ws-container mb-16 sm:mb-0 text-center relative z-20 sm:pt-24 -mt-56">
          



          {/* <p className="text-center font-sans text-sm sm:text-2xl lg:text-4xl  leading-tight z-30">

        
          <h1 className="text-center font-sans text-xs !text-offwhite/5 mt-6 tracking-wide max-w-xl mx-auto">
            Buy & Sell Authentic Luxury Watches in Dubai
            Dubai's trusted shop to Buy and Sell authenticated luxury watches.
          </h1>
          
          
            More Than Time,
          </p>
          <h2 className="mt-4 text-center font-sans text-xl sm:text-2xl lg:text-4xl z-30">
            A Story on Your Wrist
          </h2> */}

          <h1 className="text-center font-sans text-base sm:text-2xl lg:text-4xl leading-tight z-30">
  More Than Time,<br />
  A Story on Your Wrist
    </h1>




          
          {/* Enhanced Magnetic Buttons */}
          {/* <div className="mt-8 flex flex-col sm:flex-row gap-8 justify-center items-center">
            <MagneticButton
              href="/sell"
              variant="primary"
              className="group"
            >
              <span className="font-sans font-extrabold flex items-center gap-2 pr-2">
                Sell a Watch
                <svg
                  className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </MagneticButton>

            <MagneticButton
              href="/buy"
              variant="secondary"
              className="group"
            >
              <span className="font-sans font-extrabold flex items-center gap-2 pr-2">
                Buy a Watch
                <svg
                  className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </MagneticButton> */}



          {/* </div> */}


        </div>
      </section>

      {/* --- START NEW BUTTON SECTION --- */}
      <div className="ws-container -mt-22 sm:-mt-56 mb-16 relative z-30 flex justify-center">
          {/* Enhanced Magnetic Buttons (Now visible outside the hero overlay) */}
          {/* We use flex-row and flex-wrap for side-by-side on mobile, and a tight gap */}
          <div className="flex flex-row gap-4 justify-center items-center">
            <MagneticButton
              href="/sell"
              variant="primary"
              className="group flex-grow sm:flex-grow-0" // Add flex-grow to make buttons fill space on small screens
            >
              <span className="font-sans font-extrabold flex items-center gap-2 pr-2">
                Sell a Watch
                <svg
                  className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </MagneticButton>

            <MagneticButton
              href="/buy"
              variant="secondary"
              className="group flex-grow sm:flex-grow-0" // Add flex-grow here too
            >
              <span className="font-sans font-extrabold flex items-center gap-2 pr-2">
                Buy a Watch
                <svg
                  className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </MagneticButton>
          </div>
      </div>
      {/* --- END NEW BUTTON SECTION --- */}


      {/* Trust strips */}
      <section className="ws-container mt-28 pb-20 grid grid-cols-1 md:grid-cols-4 gap-6 trust-section ">

     
      <div className=" rounded-lg p-4 md:p-6 bg-card trust-strip">
      <h2 className="font-title font-bold text-lg sm:text-xl md:text-2xl">Buy & Sell Authentic Luxury Watches in Dubai</h2>
          <p className="font-sans text-offwhite/70 mt-2 text-sm">Dubai's trusted shop to Buy and Sell authenticated luxury watches.</p>
        </div>
 {/* Trust Strip 2 */}
        {/* MODIFIED: Reduced padding (p-4) on mobile */}
        <div className=" rounded-lg p-4 md:p-6 bg-card trust-strip">
          {/* MODIFIED: Reduced heading text size (text-lg) on mobile */}
          <h3 className="font-title font-bold text-lg sm:text-xl md:text-2xl">Warranty Included</h3>
          <p className="font-sans  text-offwhite/70 mt-2 md:mt-4 text-sm">Every watch is protected by our comprehensive 12-month mechanical and service warranty.</p>
        </div>

 {/* Trust Strip 3 */}
        {/* MODIFIED: Reduced padding (p-4) on mobile */}
        <div className=" rounded-lg p-4 md:p-6 bg-card trust-strip">
          {/* MODIFIED: Reduced heading text size (text-lg) on mobile */}
          <h3 className="font-title font-bold text-lg sm:text-xl md:text-2xl">Authenticated & verified</h3>
          <p className="font-sans  text-offwhite/70 mt-2 md:mt-4 text-sm">Materials, movement, and reference are checked by specialists.</p>
        </div>

       {/* Trust Strip 4 */}
        {/* MODIFIED: Reduced padding (p-4) on mobile */}
        <div className=" rounded-lg p-4 md:p-6 bg-card trust-strip">
          {/* MODIFIED: Reduced heading text size (text-lg) on mobile */}
          <h3 className="font-title font-bold text-lg sm:text-xl md:text-2xl">Fair offers, fast payouts</h3>
          <p className="font-sans  text-offwhite/70 mt-2 md:mt-4 text-sm">Transparent pricing and insured shipping worldwide.</p>
        </div>

      </section>



      {/* Featured Stories - Full Screen Horizontal Showcase */}


      <HorizontalWatchShowcase watches={manyWatches} />



      {/* Brands we work with display */}

      <BrandsShowcase brands={TRUSTED_BRANDS} />






     {/* From the Journal */}
      {/* Display loading state while fetching */}
      {isJournalLoading ? (
        <section className="ws-container mt-32 mb-24 relative text-center">
          <p className="text-offwhite/50">Loading inspiring stories from the Journal...</p>
        </section>
      ) : (
        <JournalSection
          posts={latestPosts} // <-- USE THE DYNAMICALLY FETCHED STATE
          showFeatured={true}
        />
      )}





    </Layout>
  );
}


