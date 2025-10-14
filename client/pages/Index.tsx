// index.tsx
import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { FEATURED, POSTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
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


// 1. DEFINE BACKGROUND IMAGES (using your original and new ones)
const BACKGROUND_IMAGES = [
  '/WATCHSTORY (9).png', // Your original static image
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
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 z-10" />
    </div>
  );
}



// new trial anmiation for the background --------------------------------------------------------------------------------------





// const CYCLE_IMAGES = [
//   '/bg-1.png', // Rolex Daytona
//   '/bg-2.png', // Patek Nautilus
//   // Fallback/generic watch composite (if needed, although small crops are better)
//   // '/WatchBackground.png',
//   '/bg-3.png', // Repeat
//   '/bg-4.png',
//   '/bg-5.png',
//   '/AP-1.svg',
// ];

// interface HomeWatchCarouselProps {
//   initialOffset: number; // MODIFIED: Use offset instead of initialImage string

//   className: string;
// }

// function HomeWatchCarousel({   initialOffset, className }: HomeWatchCarouselProps) {
//   const imgRef = useRef<HTMLImageElement>(null);
// // MODIFIED: Start the index at the unique offset
//   const [imageIndex, setImageIndex] = useState(initialOffset % CYCLE_IMAGES.length); 

//   useEffect(() => {
//     const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5 }); // Cycle every ~3 seconds
//     const image = imgRef.current;
//     if (!image) return;

//     // Initial setup: Use the correct starting image
//     // image.src = initialImage;

//     const cycleAnimation = () => {
//       // Advance index, wrapping back to 0
//       setImageIndex(prev => (prev + 1) % CYCLE_IMAGES.length);
//     };

//     tl.to(image, {
//       opacity: 0,
//       duration: 0.5,
//       ease: 'power2.in',
//     })
//     .add(cycleAnimation) // Change image source (React state change)
//     .to(image, {
//       opacity: 1,
//       duration: 0.5,
//       ease: 'power2.out',
//     });

//     return () => {
//       tl.kill();
//     };
//   }, [initialOffset]);

//   useEffect(() => {
//     // This effect runs whenever imageIndex changes (triggered by the GSAP timeline)
//     if (imgRef.current) {
//       imgRef.current.src = CYCLE_IMAGES[imageIndex];
//     }
//   }, [imageIndex]);

//   return (
//     <div className={cn("absolute w-full h-full", className)}>
//       <img
//         ref={imgRef}
//         // MODIFIED: Use the correct image from the initial index
//         src={CYCLE_IMAGES[imageIndex]} 
//         alt="Animated Luxury Watch"
//         className="w-full h-full object-cover absolute"
//       />
//     </div>
//   );
// }

























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



      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden hero-section">


        {/*  */}


        {/* 1. New Background Image (uploaded by user) */}
        {/* <div className="absolute inset-0 -z-30">
    <img 
      src="/WATCHSTORY (9).png" // Path to the uploaded image in the public directory
      alt="Luxury watch background"
      // opacity-60
      className="w-full h-full object-cover" // object-cover for full coverage, opacity to make text readable
    />
  </div> */}










        {/* 2. Four Independent Watch Carousels (Positioned over the watches in the static image) */}

        {/* Watch 1: Leftmost (e.g., Cartier Panthère) */}
        {/* <HomeWatchCarousel
          initialOffset={0}
          className="left-[-10%] top-1/2 w-[35%] h-[80%] -translate-y-1/2" 
        /> */}

        {/* Watch 2: Second from Left (e.g., Richard Mille) */}
        {/* <HomeWatchCarousel
          initialOffset={1} // Start at index 1 (Patek)
          className="left-[10%] top-1/2 w-[35%] h-[80%] -translate-y-1/2"
        /> */}

        {/* Watch 3: Second from Right (e.g., Audemars Piguet) */}
        {/* <HomeWatchCarousel
          initialOffset={2} // Start at index 2 (RM-1.svg)
          className="right-[10%] top-1/2  w-[35%] h-[80%] -translate-y-1/2"
        /> */}

        {/* Watch 4: Rightmost (e.g., Cartier Crash) */}
        {/* <HomeWatchCarousel
          initialOffset={3} // Start at index 3 (RM-2.svg)
          className="right-[-10%] top-1/2 w-[35%] h-[70%] -translate-y-1/2" 
        /> */}
















        {/*  */}
        {/* The DriftingWatches component is added here as a subtle background */}
        {/* <DriftingWatches />  */}



        {/* 3. INTEGRATE BACKGROUND CAROUSEL */}
        <SimpleBackgroundCarousel images={BACKGROUND_IMAGES} intervalMs={5000} />



        {/*  */}
        {/* <div className="parallax-bg"></div> */}
        {/* <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_10%,hsl(var(--brand-carbon)/0.7)_0%,transparent_60%)]" /> */}
        <div className="ws-container text-center relative z-10">
          {/* <StaggeredCyclingHeading // <-- REPLACED COMPONENT
            lines={[
              // "Welcome to WatchStory",
              // "Every Watch Tells A Story",
              // "What are you looking for?"

              "WATCHSTORY",
              

              // "More Than Time, A Story on Your Wrist"
            ]}
            cycleIntervalSec={4.0} // Adjusted to 4.0s for an entrance(0.8s), pause(2.6s), and exit(0.6s) cycle
            className="text-center font-logo-sans text-6xl text-offwhite/90"
          /> */}
          {/* <StaggeredCyclingHeading // <-- REPLACED COMPONENT
            lines={[
              // "Welcome to WatchStory",
              // "Every Watch Tells A Story",
              // "What are you looking for?"

              "More Than Time",
              "A Story on Your Wrist"
            ]}
            cycleIntervalSec={3.0} // Adjusted to 4.0s for an entrance(0.8s), pause(2.6s), and exit(0.6s) cycle
            className="mt-10 text-center font-title text-2xl text-offwhite/90"
          /> */}




          <h1 className="text-center font-sans text-sm sm:text-4xl lg:text-4xl text-offwhite/95 leading-tight">
            More Than Time,
          </h1>
          <h2 className="mt-4 text-center font-sans text-3xl sm:text-4xl lg:text-4xl text-offwhite/80">
            A Story on Your Wrist
          </h2>



          
          {/* Enhanced Magnetic Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center">
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
      <section className="ws-container mt-24 mb-8 grid md:grid-cols-3 gap-6 trust-section ">
        {/* <div className=" rounded-lg p-6 bg-card/60 trust-strip bg-background">
          <h3 className="font-title font-bold text-2xl">Provenance matters</h3>
          <p className="font-sans text-offwhite/70 mt-2">We track ownership and service history to preserve the narrative.</p>
        </div> */}
        {/* 1. 1-YEAR WARRANTY (UPDATED CONTENT) */}
        <div className=" rounded-lg p-6 bg-card/60 trust-strip bg-background">
          <h3 className="font-title font-bold text-2xl">Warranty Included</h3>
          <p className="font-sans text-offwhite/70 mt-2">Every watch is protected by our comprehensive 12-month mechanical and service warranty for peace of mind.</p>
        </div>
        <div className=" rounded-lg p-6 bg-card/60 trust-strip">
          <h3 className="font-title font-bold text-2xl">Authenticated & verified</h3>
          <p className="font-sans text-offwhite/70 mt-2">Materials, movement, and reference are checked by specialists.</p>
        </div>
        <div className=" rounded-lg p-6 bg-card/60 trust-strip">
          <h3 className="font-title font-bold text-2xl">Fair offers, fast payouts</h3>
          <p className="font-sans text-offwhite/70 mt-2">Transparent pricing and insured shipping worldwide.</p>
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


