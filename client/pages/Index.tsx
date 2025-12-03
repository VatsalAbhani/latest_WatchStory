
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
import StaggeredCyclingHeading from "@/components/StaggeredCyclingHeading";
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

// import DriftingWatches from "@/components/DriftingWatches";

//

gsap.registerPlugin(ScrollTrigger);



const isSafariBrowser = (() => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome|Chromium|Edg/.test(ua);
})();



// [BackgroundVideo Component is here, not shown for brevity]
interface BackgroundVideoProps {
  srcWebm: string;           
  srcMp4: string;            
  mobileSrcWebm?: string;
  mobileSrcMp4?: string;
  poster?: string;
  mobilePoster?: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
}

function BackgroundVideo({
  srcWebm,
  srcMp4,
  mobileSrcWebm,
  mobileSrcMp4,
  poster,
  mobilePoster,
  className = "",
  loop = true,
  muted = true,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isMobile = useIsMobile();
  const activeSrcWebm = isMobile && mobileSrcWebm ? mobileSrcWebm : srcWebm;
  const activeSrcMp4 = isMobile && mobileSrcMp4 ? mobileSrcMp4 : srcMp4;
  const activePoster = isMobile && mobilePoster ? mobilePoster : poster;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = muted;
    v.setAttribute("playsinline", "true");
    v.autoplay = true;

    const tryPlay = () => v.play().catch(() => {/* ignore */});

   // For Safari, avoid aggressively re-loading on every hook change
   if (!isSafariBrowser) {
    v.load();
  }
  tryPlay();




    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!v) return;
        if (entry.isIntersecting) tryPlay();
        else v.pause();
      },
      { threshold: 0.1 }
    );
    obs.observe(v);

    return () => obs.disconnect();
  }, [muted, activeSrcWebm, activeSrcMp4]);

  return (
    <div className={`absolute inset-0 -z-30 overflow-hidden ${className}`}>
      <video
        key={activeSrcWebm + activeSrcMp4} 
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        poster={activePoster}
        muted={muted}
        loop={loop}
        playsInline
        autoPlay
        preload="auto"
      >
        <source src={activeSrcWebm} type="video/webm; codecs=av01.0.08M.08" />
        <source src={activeSrcMp4} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
// [END BackgroundVideo Component]


// [TRUSTED_BRANDS and manyWatches data arrays are here, not shown for brevity]
const TRUSTED_BRANDS = [
  { id: '1', name: 'Rolex', logoUrl: '/rolex-logo.svg', description: "A crown for every achievement. Swiss luxury watchmaking since 1905.", established: '1905', country: 'Switzerland' },
  { id: '2', name: 'Patek Philippe', logoUrl: '/patek-logo.svg', description: "You never actually own a Patek Philippe. You merely look after it. Timeless, complication-driven Swiss horology.", established: '1839', country: 'Switzerland' },
  { id: '3', name: 'Audemars Piguet', logoUrl: '/AP-logo.svg', description: "To break the rules, you must first master them. Home of the iconic Royal Oak luxury sports watch.", established: '1875', country: 'Switzerland' },
  { id: '4', name: 'Omega', logoUrl: '/omega-4.svg', description: "The 'First Watch on the Moon' and Official Timekeeper of the Olympic Games since 1932. Known for the Speedmaster, Seamaster, and Master Chronometer technology.", established: '1848', country: 'Switzerland' },
  { id: '5', name: 'Cartier', logoUrl: '/cartier-logo.png', description: "The 'Jeweller of Kings' and pioneer of the modern wristwatch (Santos, Tank). Iconic Art Deco designs defining timeless elegance.", established: '1847', country: 'Switzerland' },
  { id: '6', name: 'Richard Mille', logoUrl: '/rm-logo.svg', description: "A 'Racing Machine on the Wrist.' Revolutionary luxury watches defined by extreme engineering, ultra-light TPT materials, and highly complex tourbillon movements.", established: '2001', country: 'Switzerland' },
];

const manyWatches = [
  ...FEATURED.map(w => ({
    id: w.id,
    name: ` ${w.model}`,
    brand: w.brand,
    price: `${w.currency === 'USD' ? '$' : ''}${w.price.toLocaleString()}`,
    imageUrl: w.images.urls[0],
    slug: w.slug,
    year: String(w.year),
    movement: 'Automatic',
    reference: w.ref,
    condition: 'Featured',
    bgColor: 'bg-black',
    textColor: 'text-offwhite',
  })),
];
// [END data arrays]


export default function Index() {

  const isMobile = useIsMobile();
  const [latestPosts, setLatestPosts] = useState<Article[]>([]);
  const [isJournalLoading, setIsJournalLoading] = useState(true);

  
  // =========================================================
  // 1. GSAP / ANIMATION EFFECT (UPDATED FOR FLOATING KEYWORDS)
  // =========================================================
  useEffect(() => {
    // Kills all existing ScrollTriggers to prevent duplicates on re-render
    ScrollTrigger.getAll().forEach(t => t.kill());

    // --- Trust strips Animation FIX ---
    const animationProps = isMobile
      ? { opacity: 1, duration: 0, stagger: 0 }
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

    const trustStripsTween = gsap.fromTo(
      ".trust-strip",
      { y: 50, opacity: 0 },
      animationProps
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

    // --- NEW: Keyword Background Highlight + Floating Background Keywords ---

    // Foreground inline keywords inside the paragraphs
    const keywords = gsap.utils.toArray<HTMLElement>(
      ".seo-content-block .highlight-keyword"
    );

    if (keywords.length > 0) {
      // Only per-keyword background highlight on scroll (NO fade/scale animation)
      keywords.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",     // when keyword enters view
          end: "bottom 20%",    // when keyword is nearly out
          onEnter: () => el.classList.add("keyword-active"),
          onEnterBack: () => el.classList.add("keyword-active"),
          onLeave: () => el.classList.remove("keyword-active"),
          onLeaveBack: () => el.classList.remove("keyword-active"),
          scrub: false,
        });
      });
    }


    // if (keywords.length > 0) {
    //   const clearAll = () => {
    //     keywords.forEach((k) => k.classList.remove("keyword-active"));
    //   };

    //   keywords.forEach((el) => {
    //     ScrollTrigger.create({
    //       trigger: el,
    //       start: "top 75%",    // when keyword is approaching center
    //       end: "bottom 20%",   // while it's still within the middle band
    //       onEnter: () => {
    //         clearAll();
    //         el.classList.add("keyword-active");
    //       },
    //       onEnterBack: () => {
    //         clearAll();
    //         el.classList.add("keyword-active");
    //       },
    //       // onLeave: () => {
    //       //   el.classList.remove("keyword-active");
    //       // },
    //       // onLeaveBack: () => {
    //       //   el.classList.remove("keyword-active");
    //       // },
    //     });
    //   });
    // }

    // Background floating / parallax keywords
    const bgKeywords = gsap.utils.toArray<HTMLElement>(
      ".seo-content-block .floating-keyword-bg"
    );

    if (bgKeywords.length > 0) {
      // Fade in softly
      gsap.fromTo(
        bgKeywords,
        { opacity: 0, y: 20 },
        {
          opacity: 0.25,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".seo-content-block",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Slow parallax drift on scroll
      gsap.to(bgKeywords, {
        y: (i) => (i % 2 === 0 ? -40 : 40),
        ease: "none",
        scrollTrigger: {
          trigger: ".seo-content-block",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
    // --- END NEW ANIMATION ---
  
    // Cleanup: Kill the specific tween and all ScrollTriggers when the component unmounts or effect re-runs
    return () => {
      trustStripsTween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };

  }, [isMobile]); 


  // =========================================================
  // 2. DATA FETCHING EFFECT 
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
      {/* 3. ADD SEO COMPONENT - Now the single source of truth for Title, Description, Canonical */}
      <Seo
        title="Buy & Sell Luxury Watches in Dubai, UAE"
        description="Shop authenticated pre-owned Rolex, Audemars Piguet, Patek Philippe & more in the UAE. Dubai's trusted watch shop to buy and sell authenticated luxury watches."
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
      <section className="relative min-h-[70vh] md:min-h-[92vh] flex items-center overflow-hidden hero-section">
        
        <BackgroundVideo
          className="mt-28 sm:mt-0"
          srcWebm="/hero.av1.webm" 
          srcMp4="/Untitled-design.mp4"         
          mobileSrcWebm="/hero.av1.webm"
          mobileSrcMp4="/Untitled-Design-mobile.mp4"   
          poster="/poster.webp"
          mobilePoster="/poster.webp"
        />

        <div className="absolute inset-0 z-10" />

        <div className="ws-container mb-16 sm:mb-0 text-center relative z-20 sm:pt-24 -mt-24">
          <h1 className="text-center font-title font-normal tracking-tight 
          text-3xl sm:text-4xl lg:text-5xl leading-[1.1] !text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] z-30 
          -mt-4 sm:-mt-36">
            More Than Time,<br /> 
            A Story on Your Wrist
          </h1>
        </div>
      </section>

      {/* --- START NEW BUTTON SECTION --- */}
      <div className="ws-container -mt-48 sm:-mt-56 mb-16 relative z-30 flex justify-center">
        <div className="flex flex-wrap sm:flex-nowrap gap-6 sm:gap-4 justify-center items-stretch w-full">
          <MagneticButton
            href="/sell"
            variant="primary"
            className="group w-full sm:w-auto sm:flex-grow-0 [&_*]:!text-white [&_svg]:[stroke:white]"
          >
            <span className="font-sans text-base sm:text-xl lg:text-2xl font-extrabold flex items-center justify-center gap-2 pr-2">
              Sell a Watch
              <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </MagneticButton>

          <MagneticButton
            href="/buy"
            variant="secondary"
            className="group w-full sm:w-auto sm:flex-grow-0 [&_*]:!text-white [&_svg]:[stroke:white]" 
          >
            <span className="font-sans text-base sm:text-xl lg:text-2xl font-extrabold flex items-center justify-center gap-2 pr-2">
              Buy a Watch
              <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
          </MagneticButton>
        </div>
      </div>
      {/* --- END NEW BUTTON SECTION --- */}


      {/* Trust strips - Original, shorter content (Kept as is for now) */}
      <section className="ws-container mt-28 pb-20 grid grid-cols-1 md:grid-cols-4 gap-6 ">
        <div className=" rounded-lg p-4 md:p-6 bg-card trust-strip">
          <h2 className="font-title font-bold text-lg sm:text-xl md:text-2xl">Buy & Sell Authentic Luxury Watches in Dubai</h2>
          <p className="font-sans text-offwhite/70 mt-2 text-sm">Dubai's trusted shop to Buy and Sell authenticated luxury watches.</p>
        </div>
        <div className=" rounded-lg p-4 md:p-6 bg-card trust-strip">
          <h3 className="font-title font-bold text-lg sm:text-xl md:text-2xl">Warranty Included</h3>
          <p className="font-sans  text-offwhite/70 mt-2 md:mt-4 text-sm">Every watch is protected by our comprehensive 12-month mechanical and service warranty.</p>
        </div>
        <div className=" rounded-lg p-4 md:p-6 bg-card trust-strip">
          <h3 className="font-title font-bold text-lg sm:text-xl md:text-2xl">Authenticated & Verified</h3>
          <p className="font-sans  text-offwhite/70 mt-2 md:mt-4 text-sm">Materials, movement, and reference are checked by specialists.</p>
        </div>
        <div className=" rounded-lg p-4 md:p-6 bg-card trust-strip">
          <h3 className="font-title font-bold text-lg sm:text-xl md:text-2xl">Fair Offers, Fast Payouts</h3>
          <p className="font-sans  text-offwhite/70 mt-2 md:mt-4 text-sm">Transparent pricing and insured shipping worldwide.</p>
        </div>
      </section>


      {/* Featured Stories - Full Screen Horizontal Showcase */}
      <HorizontalWatchShowcase watches={manyWatches} />


      {/* Brands we work with display */}
      <BrandsShowcase brands={TRUSTED_BRANDS} />


      {/* From the Journal */}
      {isJournalLoading ? (
        <section className="ws-container mt-32 relative text-center journal-section">
          <p className="text-offwhite/50">Loading inspiring stories from the Journal...</p>
        </section>
      ) : (
        <JournalSection
          posts={latestPosts} 
          showFeatured={true}
        />
      )}



      

      {/* --- START SEO CONTENT BLOCK WITH VERTICAL LABEL, FLOATING BRANDS & STRIPES --- */}
      <section className="ws-container mt-16 md:mt-28 pb-16 seo-content-block relative overflow-hidden">
        {/* Vertical left side label */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center z-10">
          <p
            className="
              
              block
              text-[0.45rem] md:text-[0.55rem]
              tracking-[0.5em]
              uppercase
              !text-black/80
              rotate-[-90deg]
              origin-left
              whitespace-nowrap
              translate-x-2
            "
            
          >
            Luxury Watch Dealer · Dubai
          </p>
        </div>

        {/* Vertical right side label */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center z-10">
          <p
            className="
              
              block
              text-[0.45rem] md:text-[0.55rem]
              tracking-[0.5em]
              uppercase
              !text-black/80
              rotate-[-90deg]
              origin-right
              whitespace-nowrap
              -translate-x-4
            "
          >
            Luxury Watch Dealer · Dubai
          </p>
        </div>

        {/* Foreground content */}
      <div className="relative z-10 max-w-5xl mx-auto pl-6 md:pl-10">
          <p className="text-center text-[0.7rem] sm:text-xs tracking-[0.3em] uppercase  mb-4">
            WHY COLLECTORS TRUST WATCHSTORY
          </p>

          <h2 className="font-title font-bold text-3xl sm:text-4xl text-center mb-6">
            Dubai's Trusted Source for Luxury Watches
          </h2>
          
          <p className="mb-6 font-sans text-base sm:text-lg !leading-[1.8]">
            WatchStory is built on the principle that{" "}
            <span className="highlight-keyword">
              buying or selling a luxury timepiece in Dubai
            </span>{" "}
            should feel as rewarding and secure as wearing one. We specialize in{" "}
            <span className="highlight-keyword">authenticated pre-owned watches</span>{" "}
            from the world's most desired houses, including{" "}
            <span className="highlight-keyword">Rolex</span>,{" "}
            <span className="highlight-keyword">Patek Philippe</span>,{" "}
            <span className="highlight-keyword">Audemars Piguet</span>, and{" "}
            <span className="highlight-keyword">Richard Mille</span>. Every watch we acquire
            is meticulously inspected and verified by our{" "}
            <span className="highlight-keyword">trained experts</span> to ensure its
            provenance, mechanics, and authenticity are beyond reproach.
          </p>

          <p className="mb-6 font-sans text-base sm:text-lg !leading-[1.8]">
            As one of the leading luxury watch dealers in the{" "}
            <span className="highlight-keyword">United Arab Emirates</span>, we bridge the
            gap between discerning collectors and secure transactions. Our curated
            collection offers a refined alternative to retail, providing competitive
            market pricing and immediate availability for investment-grade timepieces.
            Whether you are looking to{" "}
            <span className="highlight-keyword">buy a stainless steel icon</span> or{" "}
            <span className="highlight-keyword">sell a complex grand complication</span>,
            our process is transparent, insured, and designed around a five-star client
            experience from Dubai to the rest of the world.
          </p>

          <p className="mb-0 font-sans text-base sm:text-lg !leading-[1.8]">
            We offer{" "}
            <span className="highlight-keyword">fair, market-based offers</span> and{" "}
            <span className="highlight-keyword">fast, insured payouts for sellers</span>,
            and provide a{" "}
            <span className="highlight-keyword">comprehensive 12-month warranty</span> on
            every piece for buyers. For us, every watch has a{" "}
            <span className="highlight-keyword">story</span> — and we make sure your next
            chapter is written with confidence, discretion, and uncompromising luxury.
          </p>
        </div>
      </section>
      {/* --- END SEO CONTENT BLOCK --- */}

    </Layout>
  );
}
