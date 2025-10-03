// client/components/Layout.tsx - UPDATED

import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TerminalStoryBar from "@/components/TerminalStoryBar";
import Footer from "@/components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Added ScrollTrigger import

export default function Layout({ children }: { children: React.ReactNode }) {
  const contentRef = useRef(null);
  const location = useLocation();

  // Animate page content on route change
  useEffect(() => {
    // 1. Force ScrollTrigger to check for updates on route change.
    // This is crucial for fixing horizontal scroll positioning bugs.
    ScrollTrigger.refresh();

    // Animate in the page content
    const tl = gsap.timeline();

    tl.from(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
    });

    // Cleanup function runs right before the component unmounts or before this effect runs again.
    return () => {
        // Kill all triggers with a slight delay to allow state to settle.
        setTimeout(() => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            // Force browser scroll position back to top when navigating away
            window.scrollTo(0, 0);
        }, 300);
    };

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