import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

/**
 * A fixed, blurred element that follows the mouse cursor to create a subtle light trail effect.
 * The glow color is set to cyan/blue gradients for a tech/dark aesthetic.
 */
export default function CursorGlow() {
  const glowRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // We use GSAP's .quickTo for highly performant and smooth animation,
    // interpolating the position over 0.8 seconds.
    const glowSize = 500;
    const offset = glowSize / 2;



    // 2. ADJUSTED DURATION AND EASE for a wider, more atmospheric effect
    const xTo = gsap.quickTo(glow, "x", { duration: 0.2, ease: "power2.out" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.2, ease: "power2.out" });


    // const xTo = gsap.quickTo(glow, "x", { duration: 0.8, ease: "power3.out" });
    // const yTo = gsap.quickTo(glow, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Set the center of the glow to the mouse position
      xTo(e.clientX - offset);
      yTo(e.clientY - offset);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    // The glow element is fixed, invisible to pointer events, heavily blurred,
    // and given a high z-index to appear over content.
    <div
      ref={glowRef}
    //   className={cn(
    //     "pointer-events-none fixed top-0 left-0 h-[300px] w-[300px] rounded-full opacity-20 blur-3xl z-[999]",
    //     // "bg-gradient-to-r from-cyan-400/80 to-blue-600/50" // Light blue glow


    //     // ⬇️ CHANGE THIS LINE TO YOUR DESIRED COLOR GRADIENT ⬇️
    //     "bg-gradient-to-r from-lime-400/80 to-emerald-600/50" // Example: Soft Green Glow
            
    //   )}


      className={cn(
        "pointer-events-none fixed top-0 left-0 rounded-full opacity-20 blur-3xl z-[999]",
        // 3. INCREASED DIMENSION CLASSES to match the 1000px size set above
        "h-[600px] w-[600px]", 
        "bg-gradient-to-r from-cyan-400/80 to-blue-600/50"
      )}
      style={{ 
        // Initial position far off-screen to prevent flash on load
        transform: 'translate3d(-100vw, -100vh, 0)', 
        willChange: 'transform' 
      }}
    />
  );
}