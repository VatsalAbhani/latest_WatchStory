// // components/MagneticButton.tsx
// import React, { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';

// interface MagneticButtonProps {
//   children: React.ReactNode;
//   href?: string;
//   onClick?: () => void;
//   variant?: 'primary' | 'secondary';
//   className?: string;
// }

// export default function MagneticButton({ 
//   children, 
//   href, 
//   onClick, 
//   variant = 'primary',
//   className = '' 
// }: MagneticButtonProps) {
//   const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
//   // const magneticRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLSpanElement>(null);
//   const underlineRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const button = buttonRef.current;
//     // const magnetic = magneticRef.current;
//     const text = textRef.current;
//     const underline = underlineRef.current;

//     if (!button || !text || !underline) return;

//     // Magnetic effect with GSAP quickTo for performance
//     // const xTo = gsap.quickTo(magnetic, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
//     // const yTo = gsap.quickTo(magnetic, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

//     // const handleMouseMove = (e: MouseEvent) => {
//     //   const { clientX, clientY } = e;
//     //   const { height, width, left, top } = button.getBoundingClientRect();
//     //   const x = clientX - (left + width / 2);
//     //   const y = clientY - (top + height / 2);
      
//     //   xTo(x * 0.35);
//     //   yTo(y * 0.35);
//     // };

//     const handleMouseEnter = () => {
//       // Text reveal animation
//       gsap.to(text, {
//         y: 0,
//         duration: 0.6,
//         ease: "power3.out"
//       });

//       // Underline expand animation
//       gsap.to(underline, {
//         scaleX: 1,
//         duration: 0.8,
//         ease: "power3.out"
//       });

//       // Subtle glow effect
//       gsap.to(button, {
//         boxShadow: variant === 'primary' 
//           ? '0 0 30px rgba(86, 14, 14, 0.8)' 
//           : '0 0 20px rgba(240, 238, 234, 0.2)',
//         duration: 0.4,
//         ease: "power2.out"
//       });
//     };

//     const handleMouseLeave = () => {
//       // Reset magnetic position
//       // xTo(0);
//       // yTo(0);

//       // Reset text
//       gsap.to(text, {
//         y: 0,
//         duration: 0.4,
//         ease: "power2.out"
//       });

//       // Collapse underline
//       gsap.to(underline, {
//         scaleX: 0,
//         duration: 0.6,
//         ease: "power3.out"
//       });

//       // Remove glow
//       gsap.to(button, {
//         boxShadow: 'none',
//         duration: 0.4,
//         ease: "power2.out"
//       });
//     };

//     // button.addEventListener('mousemove', handleMouseMove);
//     button.addEventListener('mouseenter', handleMouseEnter);
//     button.addEventListener('mouseleave', handleMouseLeave);

//     return () => {
//       // button.removeEventListener('mousemove', handleMouseMove);
//       button.removeEventListener('mouseenter', handleMouseEnter);
//       button.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, [variant]);

//   const baseClasses = `
//     relative overflow-hidden cursor-pointer
//     font-title text-lg tracking-wide
//     transition-all duration-300 ease-out
//     ${variant === 'primary' 
//       ? 'text-offwhite' 
//       : 'text-offwhite/80'
//     }
//     ${className}
//   `;

//   const Component = href ? 'a' : 'button';

//   return (
//     <Component
//       ref={buttonRef as any}
//       href={href}
//       onClick={onClick}
//       className={baseClasses}
//     >
//       {/* <div ref={magneticRef} className="relative px-8 py-4"> */}
//       <div className="relative px-8 py-4">
//         {/* Background gradient that appears on hover */}
//         <div className={`
//           absolute inset-0 opacity-0 transition-opacity duration-500
//           ${variant === 'primary' 
//             ? 'bg-gradient-to-r from-gold/10 to-gold/5' 
//             : 'bg-gradient-to-r from-offwhite/5 to-offwhite/2'
//           }
//         `} />
        
//         {/* Text with slide-up effect */}
//         <span 
//           ref={textRef}
//           // Removed magnetic transform class (it was transform translate-y-0 anyway, but clean up is good)
//           className="relative z-10 block transform translate-y-0"
//         >
//           {children}
//         </span>
        
//         {/* Animated underline */}
//         <div 
//           ref={underlineRef}
//           className={`
//             absolute bottom-0 left-0 h-px w-full transform scale-x-0 origin-left
//             ${variant === 'primary' ? 'bg-gold' : 'bg-offwhite/60'}
//           `}
//         />
//       </div>
//     </Component>
//   );
// }







// // components/MagneticButton.tsx
// import React, { useRef, useEffect } from 'react';
// // import { gsap } from 'gsap'; // REMOVED: GSAP is no longer needed

// interface MagneticButtonProps {
//   children: React.ReactNode;
//   href?: string;
//   onClick?: () => void;
//   variant?: 'primary' | 'secondary';
//   className?: string;
// }

// export default function MagneticButton({ 
//   children, 
//   href, 
//   onClick, 
//   variant = 'primary',
//   className = '' 
// }: MagneticButtonProps) {
//   const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  
//   // All animation-related refs (sweepRef, sweepTimelineRef) have been removed.

//   useEffect(() => {
//     // The useEffect now only handles cleanup if a previous animation left something hanging.
//     // Since this is the final static version, no animations are run, and no event listeners are added.
    
//     // We only keep this cleanup function structure for best React practice, 
//     // although it no longer affects GSAP tweens since none are created.
//     return () => {
//       // If any old animation logic was attached via external code, killing tweens 
//       // is a safe practice upon unmount.
//       // gsap.killTweensOf(buttonRef.current); 
//     };
//   }, [variant]); // Dependency array still useful for potential re-rendering cleanup

//   const baseClasses = `
//     relative cursor-pointer
//     font-title text-lg tracking-wide
//     // KEPT: Transition for standard CSS hover effects (e.g., text color)
//     transition-all duration-300 ease-out
    
//     // Static border styles (AS REQUESTED)
//     border rounded-md bg-card/10
    
//     ${variant === 'primary' 
//       ? 'text-offwhite border-black/30'
//       : 'text-offwhite/80 border-black/10'
//     }
//     ${className}
//   `;

//   const Component = href ? 'a' : 'button';

//   return (
//     <Component
//       ref={buttonRef as any}
//       href={href}
//       onClick={onClick}
//       className={baseClasses}
//     >
//       <div className="relative px-8 py-4">
//         {/* All animation elements (sweep, underline) are removed */}
        
//         {/* Text container (relative z-index is removed as it's no longer layered over an animation) */}
//         <span 
//           className="block transform translate-y-0"
//         >
//           {children}
//         </span>
//       </div>
//     </Component>
//   );
// }



























// components/MagneticButton.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText'; 
import { cn } from "@/lib/utils"; 

// Register SplitText for local use in this file
gsap.registerPlugin(SplitText);

interface MagneticButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    className?: string;
    // Forward common anchor attributes when used as a link
    target?: string;
    rel?: string;
}

export default function MagneticButton({ 
    children, 
    href, 
    onClick, 
    variant = 'primary',
    className = '',
    target,
    rel,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null); 
    const originalTextRef = useRef<HTMLSpanElement>(null);
    const hoverTextRef = useRef<HTMLSpanElement>(null);
    const underlineRef = useRef<HTMLSpanElement>(null);
    const contentRef = useRef<HTMLDivElement>(null); // Ref for the main padding/content area
    const splitRefs = useRef<{ original?: SplitText; hover?: SplitText }>({});

    useEffect(() => {
        const button = buttonRef.current;
        const underline = underlineRef.current;
        const contentArea = contentRef.current;

        // Ensure all refs are valid before proceeding
        if (!button || !originalTextRef.current || !hoverTextRef.current || !underline || !contentArea) return;

        // 1. Setup SplitText on mount 
        let originalSplit: SplitText | undefined;
        let hoverSplit: SplitText | undefined;
        
        try {
             // Split by words and chars to handle spacing better
            originalSplit = new SplitText(originalTextRef.current, { 
              type: "words,chars",
              wordsClass: "word-wrapper",
              charsClass: "char-wrapper"
            });
            hoverSplit = new SplitText(hoverTextRef.current, { 
              type: "words,chars",
              wordsClass: "word-wrapper", 
              charsClass: "char-wrapper"
            });
        } catch (e) {
            console.error("SplitText failed to initialize:", e);
            return;
        }

        splitRefs.current = { original: originalSplit, hover: hoverSplit };

        // FIX: Revert to a much safer, smaller negative letter spacing.
        // This fixes the splitting artifact without eliminating word space.
        const allWords = [...originalSplit.words, ...hoverSplit.words];
          gsap.set(allWords, { 
          display: 'inline-block',
          marginRight: '0.10em' // Maintain word spacing
      });

      // Style individual characters without affecting word spacing
const allChars = [...originalSplit.chars, ...hoverSplit.chars];
gsap.set(allChars, { 
    display: 'inline-block',
    
    // Remove the problematic letterSpacing entirely
});
        
        // Initial state setup: hover text down, original text visible, underline hidden
        gsap.set(hoverSplit.chars, { y: "100%" });
        gsap.set(originalSplit.chars, { y: "0%" });
        gsap.set(underline, { scaleX: 0 }); 

        // --- Event Handlers (Adapted from Footer.tsx MenuLink) ---

        const handleMouseEnter = () => {
            const { original, hover } = splitRefs.current;
            if (!original || !hover) return;

            // Animate underline expansion
            gsap.set(underline, { transformOrigin: "left center" });
            gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });

            // Text slide out (upward)
            gsap.to(original.chars, {
                y: "-100%",
                stagger: 0.01,
                duration: 0.3,
                ease: "sine.in",
            });

            // Text slide in (from bottom)
            gsap.to(hover.chars, {
                y: "0%",
                stagger: 0.01,
                duration: 0.4,
                ease: "sine.out",
            });
        };

        const handleMouseLeave = () => {
            const { original, hover } = splitRefs.current;
            if (!original || !hover) return;
            
            // Animate underline collapse
            gsap.set(underline, { transformOrigin: "right center" });
            gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.in" });

            // Text reset (slide back down)
            gsap.to(original.chars, {
                y: "0%",
                stagger: 0.01,
                duration: 0.3,
                ease: "sine.out",
            });

            // Hover text slide out (downward)
            gsap.to(hover.chars, {
                y: "100%",
                stagger: 0.01,
                duration: 0.3,
                ease: "sine.in",
            });
        };

        // Attach event listeners to the padded content area
        contentArea.addEventListener('mouseenter', handleMouseEnter);
        contentArea.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            contentArea.removeEventListener('mouseenter', handleMouseEnter);
            contentArea.removeEventListener('mouseleave', handleMouseLeave);
            
            // Clean up SplitText instances and GSAP tweens on unmount
            originalSplit?.revert();
            hoverSplit?.revert();
            gsap.killTweensOf(contentArea);
        };
    }, [variant, children]); 

    // The base classes remain the same
    const baseClasses = `
        relative cursor-pointer 
        font-title text-base sm:text-lg tracking-wide
        transition-all duration-300 ease-out
        
        ${variant === 'primary' 
            ? 'text-offwhite' 
            : 'text-offwhite/80'
        }
        ${className}
    `;

    const Component = href ? 'a' : 'button';

    return (
        <Component
            ref={buttonRef as any}
            href={href}
            onClick={onClick}
            className={baseClasses}
            {...(href ? { target, rel } : {})}
        >
            {/* Main Padded Container is the event and layout target */}
            <div 
                ref={contentRef} // <-- TARGET FOR HOVER EVENTS AND GSAP TWEENS
                className="relative px-6 py-3 sm:px-8 sm:py-4 overflow-hidden" 
            > 
                
                {/* 1. Text Flip Container (Fixed height and overflow hidden is crucial) */}
                <div className="relative h-[1.5em] overflow-hidden grid">
                    <span 
                        ref={originalTextRef} 
                        className="col-start-1 row-start-1 whitespace-nowrap block"
                    >
                        {children}
                    </span>
                    <span 
                        ref={hoverTextRef} 
                        className="col-start-1 row-start-1 whitespace-nowrap block"
                    >
                        {children}
                    </span>
                </div>

                {/* 2. Animated Underline (Positions relative to the bottom of the padded div) */}
                <span 
                    ref={underlineRef}
                    className={cn(
                        "underline absolute bottom-0 left-0 block h-[1px] w-full scale-x-0",
                        // Uses different colors based on variant
                        variant === 'primary' ? 'bg-gold' : 'bg-offwhite/60'
                    )}
                />
            </div>
        </Component>
    );
}