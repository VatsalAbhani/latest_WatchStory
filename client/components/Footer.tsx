// import { Link } from "react-router-dom";
// import { gsap } from "gsap";
// import { SplitText } from "gsap/SplitText"; // <-- Import SplitText

// import { NavLink } from "react-router-dom";
// import { cn } from "@/lib/utils";
// import React, { useRef, useEffect } from "react";
// import DriftingWatches from "./DriftingWatches";

// // Register the SplitText plugin
// gsap.registerPlugin(SplitText);

// function MenuLink({ to, text }: { to: string; text: string }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const originalTextRef = useRef<HTMLSpanElement>(null);
//   const hoverTextRef = useRef<HTMLSpanElement>(null);
//   const splitRefs = useRef<{ original?: SplitText; hover?: SplitText }>({});

//     // Setup SplitText on mount and when text changes
//     useEffect(() => {
//       if (originalTextRef.current && hoverTextRef.current) {
//         // Split the text into characters
//         const originalSplit = new SplitText(originalTextRef.current, { type: "chars" });
//         const hoverSplit = new SplitText(hoverTextRef.current, { type: "chars" });
        
//         // Store instances in ref for access in handlers
//         splitRefs.current = { original: originalSplit, hover: hoverSplit };
  
//         // Set initial positions
//         gsap.set(hoverSplit.chars, { y: "100%" }); // Move hover text down, out of view
//         gsap.set(originalSplit.chars, { y: "0%" }); // Ensure original text is in view
  
//         // Cleanup on unmount
//         return () => {
//           originalSplit.revert();
//           hoverSplit.revert();
//         };
//       }
//     }, [text]);

//   const handleMouseEnter = () => {

//     const { original, hover } = splitRefs.current;
//     if (!original || !hover) return;

//     // Animate underline
//     const underline = containerRef.current?.querySelector('.underline');
//     if (underline) {
//       gsap.set(underline, { transformOrigin: "left center" });
//       gsap.to(underline, { scaleX: 1, duration: 0.2, ease: "power2.out" });
//     }


//     // Stagger out original text characters (upwards)
//     gsap.to(containerRef.current?.querySelector('.text-roll-original'), {
//       y: "-100%",
//       stagger: 0.02,
//       duration: 0.3,
//       // ease: "power2.in",
//       ease: "sine.in",
//     });

//         // Stagger in hover text characters (from below)
//         gsap.to(containerRef.current?.querySelector('.text-roll-hover'), {
//           y: "0%",
//           stagger: 0.02,
//           duration: 0.3,
//           // ease: "power2.out",
//           ease: "sine.out",
//         });
//       };

      

//     // Animate text
//   //   gsap.to(containerRef.current?.querySelector('.text-roll-original'), {
//   //     y: "-100%",
//   //     duration: 0.3,
      
//   //     ease: "sine.out",
//   //   });
//   //   gsap.to(containerRef.current?.querySelector('.text-roll-hover'), {
//   //     y: "0%",
//   //     duration: 0.3,
//   //     ease: "sine.in",
//   //   });
//   // };

//   const handleMouseLeave = () => {

//     const { original, hover } = splitRefs.current;
//     if (!original || !hover) return;


//     const underline = containerRef.current?.querySelector('.underline');
//     if (underline) {
//       gsap.set(underline, { transformOrigin: "right center" });
//       gsap.to(underline, { scaleX: 0, duration: 0.2, ease: "power2.in" });
//     }



//     // Stagger in original text characters (from below)
//     gsap.to(containerRef.current?.querySelector('.text-roll-original'), {
//       y: "0%",
//       stagger: 0.02,
//       duration: 0.3,
//       // ease: "power2.out",
//       ease: "sine.in",
//     });

//     // Stagger out hover text characters (upwards)
//     gsap.to(containerRef.current?.querySelector('.text-roll-hover'), {
//       y: "100%",
//       stagger: 0.02,
//       duration: 0.3,
//       // ease: "power2.in",
//       ease: "sine.out",
//     });
//   };


//     // Animate text back
//   //   gsap.to(containerRef.current?.querySelector('.text-roll-original'), {
//   //     y: "0%",
//   //     duration: 0.3,
//   //     ease: "sine.in",
//   //   });
//   //   gsap.to(containerRef.current?.querySelector('.text-roll-hover'), {
//   //     y: "100%",
//   //     duration: 0.3,
//   //     ease: "sine.out",
//   //   });
//   // };

//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         cn(
//           "relative inline-block text-sm transition-colors",
//           isActive && "text-gold"
//         )
//       }
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div ref={containerRef} className="text-roll-container">
//         <span className="text-roll text-roll-original">{text}</span>
//         <span className="text-roll text-roll-hover">{text}</span>
//         <span className="underline"></span>
//       </div>
//     </NavLink>
//   );
// }


// export default function Footer() {
//   return (
//     <footer className="relative mt-24 overflow-hidden"> {/* Added relative and overflow-hidden */}


// {/* NEW: Render DriftingWatches as a background layer
//         - It needs to be wrapped in a div to control its absolute positioning within the footer.
//         - Set a specific height (e.g., 50vh) or position it carefully, as the animation 
//           defaults to 100vh if not constrained by its parent's height. 
//         - For this case, we rely on the Footer's internal content setting the height, 
//           and contain the effect using 'overflow-hidden'.
//       */}


// <div className="absolute inset-0 pointer-events-none">
//         {/* We can temporarily use DriftingWatches here. Note: The animation targets 100vh. */}
//         {/* Since the container is 'absolute inset-0', it will adapt to the Footer's content height. */}
//         {/* We pass a custom style to override the 100vh default, setting it to the container's height */}
//         <DriftingWatches /> 
//       </div>



//       <div className="ws-container py-12 grid md:grid-cols-4 gap-8 text-sm relative z-10"> {/* Added relative z-10 */}


//         <div>
//           <div className="font-mono text-base">WatchStory_</div>
//           {/* <p className="font-sans text-offwhite/70 mt-2">Rare drops, deep-cut stories, no spam.</p> */}
//           <form className="mt-4 flex gap-2" onSubmit={(e)=>e.preventDefault()}>
//             <input 
//               aria-label="email" 
//               type="email" 
//               required 
//               placeholder="Your email" 
//               className="w-full bg-transparent border px-3 py-2 rounded-md placeholder:text-offwhite/40" 
//             />
//             <button className="ws-button-primary">Subscribe</button>
//           </form>
//         </div>
//         <div>
//           <div className="font-sans text-offwhite/60 mb-3">Explore</div>
                  

//           <ul className="font-sans space-y-2">
//             <li><MenuLink to="/buy" text="Buy" /></li>
//             <li><MenuLink to="/sell" text="Sell" /></li>
//             <li><MenuLink to="/blog" text="Journal" /></li>
//             <li><MenuLink to="/about" text="About" /></li>
//             <li><MenuLink to="/contact" text="Contact" /></li>
//           </ul>
//         </div>
//         <div>
//           <div className="font-sans text-offwhite/60 mb-3">Help</div>
//           {/* <ul className="font-sans space-y-2">
//             <li>Authentication</li>
//             <li>Insured Shipping</li>
//             <li>Escrow & Trust</li>
//             <li>Privacy</li>
//           </ul> */}

//           <ul className="font-sans space-y-2">
//             <li><MenuLink to="/buy" text="Authentication" /></li>
//             <li><MenuLink to="/sell" text="Insured Shipping" /></li>
//             <li><MenuLink to="/blog" text="Escrow & Trust" /></li>
//             <li><MenuLink to="/about" text="Privacy" /></li>
//             {/* <li><MenuLink to="/contact" text="Contact" /></li> */}
//           </ul>
//         </div>
//         <div>
//           <div className="font-sans text-offwhite/60 mb-3">WhatsApp</div>
//           <a 
//             href="https://wa.me/0000000000" 
//             target="_blank" 
//             rel="noreferrer" 
//             className="inline-flex items-center gap-2 text-gold"
//           >

//             <MenuLink to="/buy" text="Enquire on WhatsApp →" />
            
//           </a>
//         </div>
//       </div>
//       <div className="py-6 text-center text-xs text-offwhite/50">
//         © {new Date().getFullYear()} WatchStory. Every watch tells a story.
//       </div>
//     </footer>
//   );
// }






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
      <div className="absolute inset-0 pointer-events-none">
        <DriftingWatches /> 
      </div>

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