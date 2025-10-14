import React, { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
// NOTE: You must import gsap and SplitText.
// Assuming gsap and SplitText are available globally or imported like this:
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    hoverText?: string;
    loading: boolean;
  }
  
  export function AnimatedButton({
    text,
    hoverText = 'Send Request', // Default hover text
    loading,
    className,
    ...props
  }: AnimatedButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const originalTextRef = useRef<HTMLSpanElement>(null);
    const hoverTextRef = useRef<HTMLSpanElement>(null);
    const splitRefs = useRef<{ original?: SplitText; hover?: SplitText }>({});
  
    // Reset/Setup SplitText on mount and when text/hoverText changes
    useEffect(() => {
      const wrapperElement = buttonRef.current;
      
      if (originalTextRef.current && hoverTextRef.current && wrapperElement) {
        // 1. Initialize SplitText
        // @ts-ignore (Assuming SplitText is globally available or imported)
        const originalSplit = new SplitText(originalTextRef.current, { type: "chars" });
        // @ts-ignore
        const hoverSplit = new SplitText(hoverTextRef.current, { type: "chars" });
        
        splitRefs.current = { original: originalSplit, hover: hoverSplit };
  
        // 2. Initial state: Hover text hidden, Original text visible
        gsap.set(hoverSplit.chars, { y: "100%" });
        gsap.set(originalSplit.chars, { y: "0%" }); 
  
        // 3. Define hover animations
        const handleMouseEnter = () => {
          if (loading) return; // Prevent animation while loading
          const { original, hover } = splitRefs.current;
          if (!original || !hover) return;
          
          gsap.to(original.chars, { y: "-100%", stagger: 0.01, duration: 0.3, ease: "sine.in" });
          gsap.to(hover.chars, { y: "0%", stagger: 0.01, duration: 0.4, ease: "sine.out" });
        };
  
        const handleMouseLeave = () => {
          if (loading) return; // Prevent animation while loading
          const { original, hover } = splitRefs.current;
          if (!original || !hover) return;
          
          gsap.to(original.chars, { y: "0%", stagger: 0.01, duration: 0.3, ease: "sine.out" });
          gsap.to(hover.chars, { y: "100%", stagger: 0.01, duration: 0.3, ease: "sine.in" });
        };
        
        // 4. Attach event listeners
        wrapperElement.addEventListener('mouseenter', handleMouseEnter);
        wrapperElement.addEventListener('mouseleave', handleMouseLeave);
  
        // 5. Cleanup
        return () => {
          wrapperElement.removeEventListener('mouseenter', handleMouseEnter);
          wrapperElement.removeEventListener('mouseleave', handleMouseLeave);
          originalSplit.revert();
          hoverSplit.revert();
        };
      }
    }, [text, hoverText, loading]);
  
    // Handle the 'loading' state visibility without animation
    const currentText = loading ? 'Submitting...' : text;
    const currentHoverText = loading ? '' : hoverText; // Hide hover text when loading
  
    return (
      <button
        ref={buttonRef}
        type="submit"
        disabled={loading}
        className={cn("ws-button-primary group relative overflow-hidden", className, {
          "pointer-events-none opacity-80": loading, // Fades button and prevents hover while loading
        })}
        {...props}
      >


    <div className="h-full grid place-items-center"> 
        <div  className="relative h-[1.5em] overflow-hidden grid col-start-1 row-start-1">
          {/* Original Text (Visible on load) */}
          <span ref={originalTextRef} className={cn("col-start-1 row-start-1 whitespace-nowrap transition-opacity duration-300", {
              'opacity-0': loading,
              'opacity-100': !loading
            })}>
            {currentText}
          </span>
          
          {/* Hover Text (Visible on hover) - Hidden when loading */}
          {!loading && (
            <span ref={hoverTextRef} className="col-start-1 row-start-1 whitespace-nowrap">
              {currentHoverText}
            </span>
          )}
          </div>
          
          {/* Simple loader text if needed (or replace with spinner) */}
          {loading && (
            <span className="col-start-1 row-start-1 whitespace-nowrap">
              Submitting...
            </span>
          )}
        </div>
      </button>
    );
  }