


import { Link, NavLink } from "react-router-dom";
import { Sparkles, ShoppingCart, Volume2, VolumeX, Menu } from "lucide-react";
import { useStory } from "@/state/story";
import { useCart } from "@/state/cart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

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
          "relative block text-base font-bold transition-colors",
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

export default function TerminalStoryBar() {
  const { typedText, dots, currentLineIndex, toggleSound, soundOn } = useStory();
  const { count } = useCart();

  const Nav = () => (
    <nav className="hidden md:flex items-center gap-6">
      <MenuLink to="/buy" text="Buy" />
      <MenuLink to="/sell" text="Sell" />
      <MenuLink to="/blog" text="Blog" />
      {/* <MenuLink to="/about" text="About" /> */}
      {/* <Link to="/cart" className="relative ml-6">
        <ShoppingCart className="h-5 w-5 hover:text-gold transition" />
        <span aria-label="cart count" className="absolute -right-2 -top-1 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">{count}</span>
      </Link> */}
    </nav>
  );

  return (
    // backdrop-blur    bg-[#F6F4F0]
    <div className=" top-0 z-50 bg-white text-black">
      <div className="ws-container relative h-28 flex items-center justify-between px-0">
        <Link to="/" className="flex items-center ml-[-6] gap-2 font-mono group">
        {/* <img src="/F-1.svg" alt="WatchStory Logo" className="h-[150px] w-auto px-0" /> */}

        <img src="/Logo.svg" alt="WatchStory Logo" className="h-56 w-auto"  />


        </Link>

        {/* @apply container px-6 md:px-8; } */}


        {/* Centering Container */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Nav />
        </div>


      </div>
    </div>
  );
}