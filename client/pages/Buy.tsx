import TerminalStoryBar from "@/components/TerminalStoryBar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { FEATURED } from "@/lib/data";
import { useEffect } from "react";

export default function Buy() {
  useEffect(() => {
    document.title = "Shop Authentic Luxury Watches | Rolex, AP, Patek, RM — WatchStory";
  }, []);

  return (
    <div className="ws-grain">
      <TerminalStoryBar />
      <section className="ws-container py-16">
        <h1 className="font-title text-4xl">Shop Watches</h1>
        <p className="text-offwhite/70 mt-3">Discover the chapter that belongs on your wrist.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {FEATURED.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
      <Footer />
    </div>
  );
}
