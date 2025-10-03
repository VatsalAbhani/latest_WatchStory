// client/components/StaggeredCyclingHeading.tsx

import React, { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface StaggeredCyclingHeadingProps {
  lines: string[];
  /** Seconds between line starts (controls pause length) */
  cycleIntervalSec?: number;
  className?: string;
}

export default function StaggeredCyclingHeading({
  lines,
  cycleIntervalSec = 4.0,
  className,
}: StaggeredCyclingHeadingProps) {
  const items = useMemo(() => lines.filter(Boolean), [lines]);
  const [index, setIndex] = useState(0);
  const currentTextRef = useRef(null);
  const splitTextRef = useRef<SplitText | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const currentLine = items[index] ?? "";

  // Animation constants for entry/exit
  const durationIn = 0.8;
  const durationOut = 0.6;
  const staggerAmount = 0.03;
  const easeIn = "power3.out";
  const easeOut = "power2.in";

  // Function to move to the next line in the cycle
  const cycleNext = () => {
    setIndex((i) => (i + 1) % items.length);
  };

  useEffect(() => {
    const textElement = currentTextRef.current;
    if (!textElement || !currentLine || items.length < 2) return;

    // --- Cleanup previous animation ---
    if (tlRef.current) tlRef.current.kill();
    if (splitTextRef.current) splitTextRef.current.revert();
    
    // --- Setup new animation ---
    
    // Split the new text into characters
    splitTextRef.current = new SplitText(textElement, {
      type: "chars",
      charsClass: "split-char",
    });

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        // Calculate pause duration: total cycle time - (in + out animation time)
        const pauseDuration = cycleIntervalSec - durationIn - durationOut;
        
        // Schedule next transition after a pause
        gsap.to({}, {
          duration: Math.max(0, pauseDuration), // Ensure duration is non-negative
          onComplete: () => {
            // Start exit animation (move UPWARD and fade out)
            gsap.to(splitTextRef.current!.chars, {
              y: "-100%", // Animate up
              opacity: 0,
              stagger: { 
                amount: staggerAmount * splitTextRef.current!.chars.length, 
                from: "end" // Exit stagger runs from last character to first
              }, 
              ease: easeOut,
              duration: durationOut,
              onComplete: cycleNext, // Move to the next line state after exit is done
            });
          }
        });
      },
    });

    // Entrance animation (from below: 100%)
    tl.from(splitTextRef.current.chars, {
      y: "100%",
      opacity: 0,
      stagger: staggerAmount,
      ease: easeIn,
      duration: durationIn,
      delay: 0.1 // Small delay to avoid immediate flash on mount
    }).play();

    tlRef.current = tl;

    return () => {
      if (tlRef.current) tlRef.current.kill();
      if (splitTextRef.current) splitTextRef.current.revert();
    };
  // The effect intentionally re-runs on index change to start the new line's animation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, currentLine]); 
  
  // Render the current text line wrapped in a div to contain the y-transform animation
  return (
    <div 
      // Force remount when text changes to ensure SplitText works correctly on new content
      key={currentLine}
      className={cn("text-center overflow-hidden", className, "min-h-[5rem]")}
    >
      <div 
        ref={currentTextRef} 
        className="whitespace-pre-wrap"
      >
        {currentLine}
      </div>
    </div>
  );
}