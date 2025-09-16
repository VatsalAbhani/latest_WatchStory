import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { FEATURED, POSTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import TitleSequence from "@/components/TitleSequence";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    
    // Parallax effect for the hero background
    gsap.to(".parallax-bg", {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden hero-section">
        <div className="parallax-bg"></div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_10%,hsl(var(--brand-carbon)/0.7)_0%,transparent_60%)]" />
        <div className="ws-container text-center relative z-10">
          <TitleSequence
            text={"WatchStory\nCurated, authenticated, and told with care."}
            className="tracking-tight"
          />
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/sell" className="ws-button-primary">Sell a Watch</Link>
            <Link to="/buy" className="ws-button-secondary">Buy a Watch</Link>
          </div>
        </div>
      </section>

      {/* Trust strips */}
      <section className="ws-container mt-24 grid md:grid-cols-3 gap-6 trust-section">
        <div className="border rounded-lg p-6 bg-card/60 trust-strip">
          <h3 className="font-title text-2xl">Provenance matters</h3>
          <p className="text-offwhite/70 mt-2">We track ownership and service history to preserve the narrative.</p>
        </div>
        <div className="border rounded-lg p-6 bg-card/60 trust-strip">
          <h3 className="font-title text-2xl">Authenticated & verified</h3>
          <p className="text-offwhite/70 mt-2">Materials, movement, and reference are checked by specialists.</p>
        </div>
        <div className="border rounded-lg p-6 bg-card/60 trust-strip">
          <h3 className="font-title text-2xl">Fair offers, fast payouts</h3>
          <p className="text-offwhite/70 mt-2">Transparent pricing and insured shipping worldwide.</p>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="ws-container mt-24 featured-stories-container">
        <div className="flex items-end justify-between">
          <h2 className="font-title text-3xl">Featured Stories</h2>
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
      </section>

      {/* From the Journal */}
      <section className="ws-container mt-24 mb-24 journal-section">
        <div className="flex items-end justify-between">
          <h2 className="font-title text-3xl">From the Journal</h2>
          <Link to="/blog" className="text-gold">Read more →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {POSTS.slice(0, 3).map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
      </section>
    </Layout>
  );
}