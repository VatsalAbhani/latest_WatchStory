


// // client/pages/Buy.tsx

// import Layout from "@/components/Layout";
// import ProductCard from "@/components/ProductCard";
// import { FEATURED } from "@/lib/data";
// import { useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function Buy() {
//   useEffect(() => {
//     document.title = "Shop Authentic Luxury Watches | Rolex, AP, Patek, RM — WatchStory";

//     // Kill any existing triggers
//     ScrollTrigger.getAll().forEach(t => t.kill());

//     // Collect cards
//     const cards = gsap.utils.toArray(".watch-card-parallax");

//     // Parameters
//     const baseOffset = 20;       // initial vertical offset
//     const waveDelay = 0.15;      // delay increment per card
//     const duration = 0.8;
//     const ease = "power2.out";

//     // Create individual ScrollTriggers for a wave effect
//     cards.forEach((card, i) => {
//       gsap.fromTo(
//         card as gsap.DOMTarget,
//         { y: baseOffset, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration,
//           ease,
//           delay: i * waveDelay,
//           scrollTrigger: {
//             trigger: card as gsap.DOMTarget,
//             start: `top 90%`, // each card triggers slightly later
//             end: `bottom top`,
//             toggleActions: "play none none none",
//        // each time you scroll back in, it will play again
//           },
//         }
//       );
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach(t => t.kill());
//     };
//   }, []);

//   return (
//     <Layout>
//       <section className="ws-container py-16">
//         <h1 className="font-title text-4xl">Shop Watches</h1>
//         <p className="text-offwhite/70 mt-3">Discover the chapter that belongs on your wrist.</p>
//         <div className="grid md:grid-cols-3 gap-6 mt-8 watch-grid-container">
//           {FEATURED.map((p) => (
//             <div
//               key={p.id}
//               className="watch-card-parallax transform-none hover:transform-none"
//             >
//               <ProductCard product={p} />
//             </div>
//           ))}
//         </div>
//       </section>
//     </Layout>
//   );
// }



// client/pages/Buy.tsx - UPDATED
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import BuyPageFilter from "@/components/BuyPageFilter"; // <-- NEW IMPORT
import { FEATURED } from "@/lib/data";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function Buy() {
  useEffect(() => {
    document.title = "Shop Authentic Luxury Watches | Rolex, AP, Patek, RM — WatchStory";

    // Kill any existing triggers
    ScrollTrigger.getAll().forEach(t => t.kill());

    // Collect cards
    const cards = gsap.utils.toArray(".watch-card-parallax");

    // Parameters
    const baseOffset = 20; // initial vertical offset
    const waveDelay = 0.15; // delay increment per card
    const duration = 0.8;
    const ease = "power2.out";

    // Create individual ScrollTriggers for a wave effect
    cards.forEach((card, i) => {
      gsap.fromTo(
        card as gsap.DOMTarget,
        { y: baseOffset, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          ease,
          delay: i * waveDelay,
          scrollTrigger: {
            trigger: card as gsap.DOMTarget,
            start: `top 90%`, // each card triggers slightly later
            end: `bottom top`,
            toggleActions: "play none none none",
       // each time you scroll back in, it will play again
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <Layout>
      {/* 1. Hero/Title Section (Matches screenshot header style) */}
      <section className="ws-container pt-16 pb-0 md:pb-8 bg-background">
        <h4 className="text-sm text-offwhite/60 font-medium tracking-widest mb-2">DISCOVER</h4>
        <h1 className="font-title text-5xl sm:text-6xl max-w-4xl">Find your perfect watch</h1>
        <p className="text-offwhite/70 mt-3 mb-8 max-w-xl">Every watch is fully authenticated and comes complete with our 12 month warranty</p>
      </section>

      {/* 2. Filter/Search Bar Section */}
      <section className="ws-container">
        <BuyPageFilter />
      </section>

      {/* 3. Product Display Grid */}
      <section className="ws-container pb-16">
        <div className="grid md:grid-cols-3 gap-6 mt-8 watch-grid-container">
          {FEATURED.map((p) => (
            <div
              key={p.id}
              className="watch-card-parallax transform-none hover:transform-none"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}