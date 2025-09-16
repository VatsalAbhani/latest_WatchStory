import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function LogoAnimation() {
  const logoRef = useRef(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate the "Watch" part of the logo
    tl.fromTo(
      ".logo-part-1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    
    // Animate the "Story" part, staggered to appear after "Watch"
    tl.fromTo(
      ".logo-part-2",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );
    
    // Animate the underscore and final sparkle effect
    tl.to(
      ".logo-underscore",
      { opacity: 1, duration: 0.3, ease: "power2.in" },
      "-=0.2"
    );
    tl.to(
      ".logo-sparkles",
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.1"
    );
    
  }, []);
  
  return (
    <div ref={logoRef} className="logo-container">
      <div className="flex items-center gap-2 font-mono group">
        <span className="logo-part-1 text-sm tracking-tight">Watch</span>
        <span className="logo-part-2 text-sm tracking-tight">Story</span>
        <span className="logo-underscore text-sm tracking-tight opacity-0">_</span>
        <span className="logo-sparkles h-4 w-4 text-gold opacity-0 scale-0">✨</span>
      </div>
    </div>
  );
}