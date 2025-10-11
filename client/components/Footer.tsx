
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";
import DriftingWatches from "./DriftingWatches";

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

function MenuLink({ to, text }: { to: string; text: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const originalTextRef = useRef<HTMLSpanElement>(null);
  const hoverTextRef = useRef<HTMLSpanElement>(null);
  const splitRefs = useRef<{ original?: SplitText; hover?: SplitText }>({});

  // Setup SplitText on mount and when text changes
  useEffect(() => {
    if (originalTextRef.current && hoverTextRef.current) {
      const originalSplit = new SplitText(originalTextRef.current, { type: "chars" });
      const hoverSplit = new SplitText(hoverTextRef.current, { type: "chars" });
      
      splitRefs.current = { original: originalSplit, hover: hoverSplit };

      gsap.set(hoverSplit.chars, { y: "100%" });
      gsap.set(originalSplit.chars, { y: "0%" });

      return () => {
        originalSplit.revert();
        hoverSplit.revert();
      };
    }
  }, [text]);

  const handleMouseEnter = () => {
    const { original, hover } = splitRefs.current;
    if (!original || !hover) return;

    // Animate underline
    const underline = linkRef.current?.querySelector('.underline');
    if (underline) {
      gsap.set(underline, { transformOrigin: "left center" });
      gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
    }
    




    gsap.to(original.chars, {
      y: "-100%",
      stagger: 0.01,
      duration: 0.3,
      // ease: "power2.in",
      ease: "sine.in",
    });

    gsap.to(hover.chars, {
      y: "0%",
      stagger: 0.01,
      duration: 0.4,
      // ease: "power2.out",
      ease: "sine.out",
    });
  };

  const handleMouseLeave = () => {
    const { original, hover } = splitRefs.current;
    if (!original || !hover) return;
    
    // Animate underline
    const underline = linkRef.current?.querySelector('.underline');
    if (underline) {
      gsap.set(underline, { transformOrigin: "right center" });
      gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.in" });
    }

    gsap.to(original.chars, {
      y: "0%",
      stagger: 0.01,
      duration: 0.3,
      // ease: "power2.out",
      ease: "sine.out",
    });

    gsap.to(hover.chars, {
      y: "100%",
      stagger: 0.01,
      duration: 0.3,
      // ease: "power2.in",
      ease: "sine.in",
    });
  };

  return (
    <NavLink
      ref={linkRef}
      to={to}
      className={({ isActive }) =>
        cn(
          "relative inline-block text-sm transition-colors",
          isActive && "text-gold"
        )
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* **CORRECTION**: Use Grid to stack elements instead of absolute positioning */}
      <div className="relative h-[1.5em] overflow-hidden grid">
        <span 
          ref={originalTextRef} 
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {text}
        </span>
        <span 
          ref={hoverTextRef} 
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {text}
        </span>
      </div>
      <span className="underline absolute bottom-[-2px] left-0 block h-[1px] w-full bg-current scale-x-0"></span>
    </NavLink>
  );
}


export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">


      <div className="ws-container py-12 grid md:grid-cols-4 gap-8 text-sm relative z-10">
        <div>
          <div className="font-mono text-base">WatchStory_</div>
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
            <li><MenuLink to="/buy" text="Authentication" /></li>
            <li><MenuLink to="/sell" text="Insured Shipping" /></li>
            <li><MenuLink to="/blog" text="Escrow & Trust" /></li>
            <li><MenuLink to="/about" text="Privacy" /></li>
          </ul>
        </div>
        <div>
          <div className="font-sans text-offwhite/60 mb-3">WhatsApp</div>
          <a 
            href="https://wa.me/971501234567" // Example Dubai number
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-2"
          >
            <MenuLink to="/contact" text="Enquire on WhatsApp →" />
          </a>
        </div>
      </div>
      <div className="py-6 text-center text-xs text-offwhite/50">
        © {new Date().getFullYear()} WatchStory. Every watch tells a story.
      </div>
    </footer>
  );
}