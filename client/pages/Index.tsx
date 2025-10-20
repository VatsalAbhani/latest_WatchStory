// index.tsx
import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
// import { FEATURED, POSTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
// --- MODIFICATION: Remove static import, add fetch function import ---
import { FEATURED, Article, fetchLatestPosts } from "@/lib/data"; 
// --------------------------------------------------------------------
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



//

import DriftingWatches from "@/components/DriftingWatches"; // <-- NEW IMPORT

//

gsap.registerPlugin(ScrollTrigger);


// 1. DEFINE BACKGROUND IMAGES (using your original and new ones)
const BACKGROUND_IMAGES = [
  '/bg_1.png', // Your original static image
  '/bg_2.png',           // New image 1
  '/bg_3.png',           // New image 2
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
            className="w-full h-full object-contain md:object-cover object-center inset-0 -z-30"
          />
        </div>
      ))}
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 z-10" />
    </div>
  );
}

























// Add this data (you can move to your data file later)
const TRUSTED_BRANDS = [
  {
    id: '1',
    name: 'Rolex',
    logoUrl: '/rolex-logo.svg',
    description: 'A crown for every achievement. Swiss luxury watchmaking since 1905.',
    established: '1905',
    country: 'Switzerland'
  },
  {
    id: '2',
    name: 'Patek Philippe',
    logoUrl: '/patek-logo.svg',
    description: 'You never actually own a Patek Philippe. You merely look after it.',
    established: '1839',
    country: 'Switzerland'
  },
  {
    id: '3',
    name: 'Audemars Piguet',
    logoUrl: '/AP-logo.svg',
    description: 'To break the rules, you must first master them.',
    established: '1875',
    country: 'Switzerland'
  },
  {
    id: '4',
    name: 'Omega',
    logoUrl: '/omega-4.svg',
    description: 'Official timekeeper of the Olympics and chosen for lunar missions.',
    established: '1848',
    country: 'Switzerland'
  },
  {
    id: '4',
    name: 'Cartier',
    logoUrl: '/cartier-logo.png',
    description: 'Official timekeeper of the Olympics and chosen for lunar missions.',
    established: '1848',
    country: 'Switzerland'
  },
  // Add more brands...
  
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
    condition: 'Excellent',
    bgColor: 'bg-black',
    textColor: 'text-offwhite',
  })),

];




export default function Index() {

  // --- NEW STATE FOR BLOG POSTS ---
  const [latestPosts, setLatestPosts] = useState<Article[]>([]);
  const [isJournalLoading, setIsJournalLoading] = useState(true);
  // ---------------------------------


  useEffect(() => {
    // document.title = "WatchStory — Buy & Sell Luxury Watches | Every Watch Has a Story";



    // Animate the "Trust strips" on scroll
    gsap.fromTo(
      ".trust-strip",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".trust-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

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

    // Parallax temporarily disabled to avoid conflicts with horizontal pinning



// --- NEW FETCH EFFECT ---
const loadJournalPosts = async () => {
  try {
    // Fetch the top 3 posts (or however many you want to show)
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
          description="WatchStory is Dubai's trusted platform to buy and sell authenticated luxury watches. Get fair, market-based offers and secure, insured transactions."
          canonical="/"
        />
        {/* End SEO Component */}

      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[92vh] flex items-center overflow-hidden hero-section">

        {/*  */}
        {/* The DriftingWatches component is added here as a subtle background */}
        {/* <DriftingWatches />  */}



        {/* 3. INTEGRATE BACKGROUND CAROUSEL */}
        <SimpleBackgroundCarousel images={BACKGROUND_IMAGES} intervalMs={5000} />



        {/*  */}
        {/* <div className="parallax-bg"></div> */}
        {/* <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_10%,hsl(var(--brand-carbon)/0.7)_0%,transparent_60%)]" /> */}
        <div className="ws-container text-center relative z-10">
          



          <h1 className="text-center font-sans text-sm sm:text-2xl lg:text-4xl  leading-tight z-30">
          
            More Than Time,
          </h1>
          <h2 className="mt-4 text-center font-sans text-xl sm:text-2xl lg:text-4xl z-30">
            A Story on Your Wrist
          </h2>



          {/* For SEO and website reach */}
          <p className="text-center font-sans text-xs !text-offwhite/5 mt-6 tracking-wide max-w-xl mx-auto">
            Buy & Sell Authentic Luxury Watches in Dubai
            Dubai's trusted platform to Buy and Sell authenticated luxury watches.
          </p>
          {/* =========================================== */}



          
          {/* Enhanced Magnetic Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-8 justify-center items-center">
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
            </MagneticButton>



          </div>


        </div>
      </section>


      {/* Trust strips */}
      <section className="ws-container mt-12 mb-6 grid md:grid-cols-4 gap-6 trust-section ">

     
      <div className=" rounded-lg p-4 md:p-6 bg-card/60 trust-strip">
      <h3 className="font-title font-bold text-lg sm:text-xl md:text-2xl">Buy & Sell Authentic Luxury Watches in Dubai</h3>
          <p className="font-sans text-offwhite/70 mt-2 text-sm">Dubai's trusted platform to Buy and Sell authenticated luxury watches.</p>
        </div>
 {/* Trust Strip 2 */}
        {/* MODIFIED: Reduced padding (p-4) on mobile */}
        <div className=" rounded-lg p-4 md:p-6 bg-card/60 trust-strip bg-background">
          {/* MODIFIED: Reduced heading text size (text-lg) on mobile */}
          <h3 className="font-title font-bold text-lg sm:text-xl md:text-2xl">Warranty Included</h3>
          <p className="font-sans text-offwhite/70 mt-2 md:mt-4 text-sm">Every watch is protected by our comprehensive 12-month mechanical and service warranty.</p>
        </div>

 {/* Trust Strip 3 */}
        {/* MODIFIED: Reduced padding (p-4) on mobile */}
        <div className=" rounded-lg p-4 md:p-6 bg-card/60 trust-strip">
          {/* MODIFIED: Reduced heading text size (text-lg) on mobile */}
          <h3 className="font-title font-bold text-lg sm:text-xl md:text-2xl">Authenticated & verified</h3>
          <p className="font-sans text-offwhite/70 mt-2 md:mt-4 text-sm">Materials, movement, and reference are checked by specialists.</p>
        </div>

       {/* Trust Strip 4 */}
        {/* MODIFIED: Reduced padding (p-4) on mobile */}
        <div className=" rounded-lg p-4 md:p-6 bg-card/60 trust-strip">
          {/* MODIFIED: Reduced heading text size (text-lg) on mobile */}
          <h3 className="font-title font-bold text-lg sm:text-xl md:text-2xl">Fair offers, fast payouts</h3>
          <p className="font-sans text-offwhite/70 mt-2 md:mt-4 text-sm">Transparent pricing and insured shipping worldwide.</p>
        </div>

      </section>



      {/* Featured Stories - Full Screen Horizontal Showcase */}


      <HorizontalWatchShowcase watches={manyWatches} />



      {/* <div style={{ height: '100vh' }} /> spacer to allow scroll */}
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


