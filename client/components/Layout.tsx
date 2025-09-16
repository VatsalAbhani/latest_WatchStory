import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TerminalStoryBar from "@/components/TerminalStoryBar";
import Footer from "@/components/Footer";
import { gsap } from "gsap";

export default function Layout({ children }: { children: React.ReactNode }) {
  const contentRef = useRef(null);
  const location = useLocation();

  // Animate page content on route change
  useEffect(() => {
    // We animate from an initial state of `opacity: 0` and `y: 20`
    // to the final state of `opacity: 1` and `y: 0`.
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out"
    });
  }, [location.pathname]); // The effect re-runs every time the pathname changes

  return (
    <div className="ws-grain">
      <TerminalStoryBar />
      <div ref={contentRef} className="min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  );
}
