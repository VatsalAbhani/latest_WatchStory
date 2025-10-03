import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";
import DriftingWatches from "./DriftingWatches";

function MenuLink({ to, text }: { to: string; text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    const underline = containerRef.current?.querySelector('.underline');
    if (underline) {
      gsap.set(underline, { transformOrigin: "left center" });
      gsap.to(underline, { scaleX: 1, duration: 0.2, ease: "power2.out" });
    }
    // Animate text
    gsap.to(containerRef.current?.querySelector('.text-roll-original'), {
      y: "-100%",
      duration: 0.3,
      ease: "sine.out",
    });
    gsap.to(containerRef.current?.querySelector('.text-roll-hover'), {
      y: "0%",
      duration: 0.3,
      ease: "sine.in",
    });
  };

  const handleMouseLeave = () => {
    const underline = containerRef.current?.querySelector('.underline');
    if (underline) {
      gsap.set(underline, { transformOrigin: "right center" });
      gsap.to(underline, { scaleX: 0, duration: 0.2, ease: "power2.in" });
    }
    // Animate text back
    gsap.to(containerRef.current?.querySelector('.text-roll-original'), {
      y: "0%",
      duration: 0.3,
      ease: "sine.in",
    });
    gsap.to(containerRef.current?.querySelector('.text-roll-hover'), {
      y: "100%",
      duration: 0.3,
      ease: "sine.out",
    });
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "relative block text-sm transition-colors",
          isActive && "text-gold"
        )
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={containerRef} className="text-roll-container">
        <span className="text-roll text-roll-original">{text}</span>
        <span className="text-roll text-roll-hover">{text}</span>
        <span className="underline"></span>
      </div>
    </NavLink>
  );
}


export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden"> {/* Added relative and overflow-hidden */}


{/* NEW: Render DriftingWatches as a background layer
        - It needs to be wrapped in a div to control its absolute positioning within the footer.
        - Set a specific height (e.g., 50vh) or position it carefully, as the animation 
          defaults to 100vh if not constrained by its parent's height. 
        - For this case, we rely on the Footer's internal content setting the height, 
          and contain the effect using 'overflow-hidden'.
      */}


<div className="absolute inset-0 pointer-events-none">
        {/* We can temporarily use DriftingWatches here. Note: The animation targets 100vh. */}
        {/* Since the container is 'absolute inset-0', it will adapt to the Footer's content height. */}
        {/* We pass a custom style to override the 100vh default, setting it to the container's height */}
        <DriftingWatches /> 
      </div>



      <div className="ws-container py-12 grid md:grid-cols-4 gap-8 text-sm relative z-10"> {/* Added relative z-10 */}


        <div>
          <div className="font-mono text-base">WatchStory_</div>
          <p className="font-sans text-offwhite/70 mt-2">Rare drops, deep-cut stories, no spam.</p>
          <form className="mt-4 flex gap-2" onSubmit={(e)=>e.preventDefault()}>
            <input 
              aria-label="email" 
              type="email" 
              required 
              placeholder="Your email" 
              className="w-full bg-transparent border px-3 py-2 rounded-md placeholder:text-offwhite/40" 
            />
            <button className="ws-button-primary">Subscribe</button>
          </form>
        </div>
        <div>
          <div className="font-sans text-offwhite/60 mb-3">Explore</div>
                  

          <ul className="font-sans space-y-2">
            <li><MenuLink to="/buy" text="Buy" /></li>
            <li><MenuLink to="/sell" text="Sell" /></li>
            <li><MenuLink to="/blog" text="Journal" /></li>
            <li><MenuLink to="/about" text="About" /></li>
            <li><MenuLink to="/contact" text="Contact" /></li>
          </ul>
        </div>
        <div>
          <div className="font-sans text-offwhite/60 mb-3">Help</div>
          <ul className="font-sans space-y-2">
            <li>Authentication</li>
            <li>Insured Shipping</li>
            <li>Escrow & Trust</li>
            <li>Privacy</li>
          </ul>
        </div>
        <div>
          <div className="font-sans text-offwhite/60 mb-3">WhatsApp</div>
          <a 
            href="https://wa.me/0000000000" 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-2 text-gold"
          >
            Enquire on WhatsApp →
          </a>
        </div>
      </div>
      <div className="py-6 text-center text-xs text-offwhite/50">
        © {new Date().getFullYear()} WatchStory. Every watch tells a story.
      </div>
    </footer>
  );
}

