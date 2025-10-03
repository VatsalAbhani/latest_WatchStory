// index.tsx
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { FEATURED, POSTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// Removed: import TypewriterHeading from "@/components/TypewriterHeading";
import StaggeredCyclingHeading from "@/components/StaggeredCyclingHeading"; // <-- ADDED
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/MagneticButton";
import JournalSection from "@/components/JournalSection";
import HorizontalWatchShowcase from "@/components/HorizontalWatchShowcase";
import TestHorizontalScroll from "@/components/TestHorizontalScroll";
import BrandsShowcase from "@/components/BrandsShowcase";

//

import DriftingWatches from "@/components/DriftingWatches"; // <-- NEW IMPORT

//

gsap.registerPlugin(ScrollTrigger);



// Add this data (you can move to your data file later)
const TRUSTED_BRANDS = [
  {
    id: '1',
    name: 'Rolex',
    logoUrl: '/images/brands/rolex-logo.png',
    description: 'A crown for every achievement. Swiss luxury watchmaking since 1905.',
    established: '1905',
    country: 'Switzerland'
  },
  {
    id: '2', 
    name: 'Patek Philippe',
    logoUrl: '/images/brands/patek-philippe-logo.png',
    description: 'You never actually own a Patek Philippe. You merely look after it.',
    established: '1839',
    country: 'Switzerland'
  },
  {
    id: '3',
    name: 'Audemars Piguet',
    logoUrl: '/images/brands/audemars-piguet-logo.png', 
    description: 'To break the rules, you must first master them.',
    established: '1875',
    country: 'Switzerland'
  },
  {
    id: '4',
    name: 'Omega',
    logoUrl: '/images/brands/omega-logo.png',
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
    name: `${w.brand} ${w.model}`,
    brand: w.brand,
    price: `${w.currency === 'USD' ? '$' : ''}${w.price.toLocaleString()}`,
    imageUrl: w.images.urls[0], // Use the first image
    slug: w.slug,
    year: String(w.year),
    movement: 'Automatic',
    reference: w.ref,
    condition: 'Excellent',
  })),
  // Duplicate set A
  ...FEATURED.map((w, i) => ({
    id: `${w.id}-dupA`,
    name: `${w.brand} ${w.model}`,
    brand: w.brand,
    price: `${w.currency === 'USD' ? '$' : ''}${w.price.toLocaleString()}`,
    imageUrl: w.images.urls[0], // Use the first image
    slug: `${w.slug}-dupA`,
    year: String(w.year),
    movement: 'Automatic',
    reference: w.ref,
    condition: 'Excellent',
  })),
  // Duplicate set B
  ...FEATURED.map((w, i) => ({
    id: `${w.id}-dupB`,
    name: `${w.brand} ${w.model}`,
    brand: w.brand,
    price: `${w.currency === 'USD' ? '$' : ''}${w.price.toLocaleString()}`,
    imageUrl: w.images.urls[0], // Use the first image
    slug: `${w.slug}-dupB`,
    year: String(w.year),
    movement: 'Automatic',
    reference: w.ref,
    condition: 'Excellent',
  })),
];




export default function Index() {
  useEffect(() => {
    document.title = "WatchStory — Buy & Sell Luxury Watches | Every Watch Has a Story";

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

  }, []);

  return (
    <Layout>
      {/* Hero
      <section className="relative min-h-[92vh] flex items-center overflow-hidden hero-section">
        <div className="parallax-bg"></div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_10%,hsl(var(--brand-carbon)/0.7)_0%,transparent_60%)]" />
        <div className="ws-container text-center relative z-10">
          <TypewriterHeading
            lines={[
              "Welcome to WatchStory",
              "What are you looking for?"
            ]}
            charsPerSecond={25}
            pauseBetweenLines={1.5}
            className="text-center font-title text-4xl text-offwhite/90"
            triggerOnScroll={false}
            loop={true}
          />
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/sell" className="ws-button-primary">Sell a Watch</Link>
            <Link to="/buy" className="ws-button-secondary">Buy a Watch</Link>
          </div>
        </div>
      </section> */}


      {/* Hero */}
<section className="relative min-h-[92vh] flex items-center overflow-hidden hero-section">
  

  {/*  */}

  {/*  */}
          {/* The DriftingWatches component is added here as a subtle background */}
          <DriftingWatches /> 
  

   {/*  */}
  <div className="parallax-bg"></div>
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_10%,hsl(var(--brand-carbon)/0.7)_0%,transparent_60%)]" />
  <div className="ws-container text-center relative z-10">
  <StaggeredCyclingHeading // <-- REPLACED COMPONENT
      lines={[
        "Welcome to WatchStory",
        "What are you looking for?"
      ]}
      cycleIntervalSec={4.0} // Adjusted to 4.0s for an entrance(0.8s), pause(2.6s), and exit(0.6s) cycle
      className="text-center font-title text-4xl text-offwhite/90"
    />
    
    {/* Enhanced Magnetic Buttons */}
    <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center">
      <MagneticButton 
        href="/sell" 
        variant="primary"
        className="group"
      >
        <span className="flex items-center gap-3">
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
        <span className="flex items-center gap-3">
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
      <section className="ws-container mt-24 grid md:grid-cols-3 gap-6 trust-section">
        <div className="border rounded-lg p-6 bg-card/60 trust-strip">
          <h3 className="font-title font-bold text-2xl">Provenance matters</h3>
          <p className="font-sans text-offwhite/70 mt-2">ggggWe track ownership and service history to preserve the narrative.</p>
        </div>
        <div className="border rounded-lg p-6 bg-card/60 trust-strip">
          <h3 className="font-title font-bold text-2xl">Authenticated & verified</h3>
          <p className="font-sans text-offwhite/70 mt-2">ggggMaterials, movement, and reference are checked by specialists.</p>
        </div>
        <div className="border rounded-lg p-6 bg-card/60 trust-strip">
          <h3 className="font-title font-bold text-2xl">Fair offers, fast payouts</h3>
          <p className="font-sans text-offwhite/70 mt-2">ggggTransparent pricing and insured shipping worldwide.</p>
        </div>
      </section>

      {/* Featured Stories
      <section className="ws-container mt-24">
        <div className="flex items-end justify-between">
          <TypewriterHeading
            lines={["Featured Stories"]}
            charsPerSecond={30}
            showDots={false}
            loop={false}
            triggerOnScroll={true}
            className="font-title text-3xl"
          />
          <Link to="/buy" className="text-gold">View all →</Link>
        </div>

        <div className="relative mt-6">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {FEATURED.map((p) => (
                <CarouselItem key={p.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <ProductCard product={p} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-border bg-card/80" />
            <CarouselNext className="border-border bg-card/80" />
          </Carousel>
        </div>
      </section> */}


{/* Featured Stories - Full Screen Horizontal Showcase */}


<HorizontalWatchShowcase watches={manyWatches} />



{/* <div style={{ height: '100vh' }} /> spacer to allow scroll */}
{/* Brands we work with display */}

<BrandsShowcase brands={TRUSTED_BRANDS} />



      {/* From the Journal
      <section className="ws-container mt-24 mb-24">
        <div className="flex items-end justify-between">
          <TypewriterHeading
            lines={["From the Journal"]}
            charsPerSecond={30}
            showDots={false}
            loop={false}
            triggerOnScroll={true}
            className="font-title text-3xl"
          />
          <Link to="/blog" className="text-gold">Read more →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {POSTS.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section> */}



      {/* From the Journal */}
<JournalSection 
  posts={POSTS.slice(0, 3)} 
  showFeatured={true}
/>






    </Layout>
  );
}