import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { FEATURED, POSTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import TitleSequence from "@/components/TitleSequence";

export default function Index() {
  useEffect(() => {
    document.title = "WatchStory — Buy & Sell Luxury Watches | Every Watch Has a Story";
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_10%,hsl(var(--brand-carbon))_0%,transparent_60%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--background)))]" />
        <div className="ws-container text-center">
          <TitleSequence text={"WatchStory\nEvery Watch Has a Story"} className="tracking-tight" />
          <p className="mt-4 text-offwhite/70 max-w-2xl mx-auto">Curated, authenticated, and told with care.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/sell" className="ws-button-primary">Sell a Watch</Link>
            <Link to="/buy" className="ws-button-secondary">Buy a Watch</Link>
          </div>
        </div>
      </section>

      {/* Trust strips */}
      <section className="ws-container mt-24 grid md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6 bg-card/60">
          <h3 className="font-title text-2xl">Provenance matters</h3>
          <p className="text-offwhite/70 mt-2">We track ownership and service history to preserve the narrative.</p>
        </div>
        <div className="border rounded-lg p-6 bg-card/60">
          <h3 className="font-title text-2xl">Authenticated & verified</h3>
          <p className="text-offwhite/70 mt-2">Materials, movement, and reference are checked by specialists.</p>
        </div>
        <div className="border rounded-lg p-6 bg-card/60">
          <h3 className="font-title text-2xl">Fair offers, fast payouts</h3>
          <p className="text-offwhite/70 mt-2">Transparent pricing and insured shipping worldwide.</p>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="ws-container mt-24">
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
      <section className="ws-container mt-24 mb-24">
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
