
// import { Link, NavLink } from "react-router-dom";
// import { Sparkles, ShoppingCart, Volume2, VolumeX, Menu } from "lucide-react";
// import { useStory } from "@/state/story";
// import { useCart } from "@/state/cart";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import { SplitText } from "gsap/SplitText";


// const WHATSAPP_ICON_SRC = "/whatsapp-icon.png";


// // Drastic performance boost for multi-element animation:
// // 1. will-change: transform to promote animation to GPU.
// // 2. overwrite: true to prevent animation conflicts.
// // 3. Increased stagger for a smoother cascade.

// function MenuLink({ to, text }: { to: string; text: string }) {
//   const linkRef = useRef<HTMLAnchorElement>(null);
//   const originalTextRef = useRef<HTMLSpanElement>(null);
//   const hoverTextRef = useRef<HTMLSpanElement>(null);
//   const splitRefs = useRef<{ original?: SplitText; hover?: SplitText }>({});



//   useEffect(() => {
//     if (originalTextRef.current && hoverTextRef.current) {
//       const originalSplit = new SplitText(originalTextRef.current, { type: "chars" });
//       const hoverSplit = new SplitText(hoverTextRef.current, { type: "chars" });

//       splitRefs.current = { original: originalSplit, hover: hoverSplit };

//       gsap.set(hoverSplit.chars, { y: "100%" });
//       gsap.set(originalSplit.chars, { y: "0%" });

//       return () => {
//         originalSplit.revert();
//         hoverSplit.revert();
//       };
//     }
//   }, [text]);

//   const handleMouseEnter = () => {
//     const { original, hover } = splitRefs.current;
//     if (!original || !hover) return;




//     // Animate underline
//     const underline = linkRef.current?.querySelector('.underline');
//     if (underline) {
//       gsap.set(underline, { transformOrigin: "left center" });
//       gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
//     }


//   };

 




//   const handleMouseLeave = () => {
//     const { original, hover } = splitRefs.current;
//     if (!original || !hover) return;

//     // Animate underline
//     const underline = linkRef.current?.querySelector('.underline');
//     if (underline) {
//       gsap.set(underline, { transformOrigin: "right center" });
//       gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.in" });
//     }

//   };




  













//   return (
//     <NavLink
//       ref={linkRef}
//       to={to}
//       className={({ isActive }) =>
//         cn(
//           "relative inline-block text-lg font-semibold transition-colors",
//           "tracking-wider",
//           isActive && "text-gold"
//         )
//       }
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div className="relative h-[1.5em] overflow-hidden grid">
//         <span
//           ref={originalTextRef}
//           className="col-start-1 row-start-1 whitespace-nowrap will-change-transform" //  Added will-change-transform
//         >
//           {text}
//         </span>
//         <span
//           ref={hoverTextRef}
//           className="col-start-1 row-start-1 whitespace-nowrap will-change-transform" //  Added will-change-transform
//         >
//           {text}
//         </span>
//       </div>
//       <span className="underline absolute bottom-[-2px] left-0 block h-[1px] w-full bg-current scale-x-0"></span>
//     </NavLink>
//   );
// }

// export default function TerminalStoryBar() {
//   const { typedText, dots, currentLineIndex, toggleSound, soundOn } = useStory();
//   const { count } = useCart();

//   const Nav = () => (
//     <nav className="font-sans md:flex items-center gap-6">
//       <MenuLink to="/buy" text="Buy" />
//       <MenuLink to="/sell" text="Sell" />
//       <MenuLink to="/blog" text="Blog" />



      
//       {/* <MenuLink to="/about" text="About" /> */}
//       {/* <Link to="/cart" className="relative ml-6">
//         <ShoppingCart className="h-5 w-5 hover:text-gold transition" />
//         <span aria-label="cart count" className="absolute -right-2 -top-1 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">{count}</span>
//       </Link> */}




//     </nav>
//   );

//   return (
//     // backdrop-blur    bg-[#F6F4F0]
//     <div className=" top-0 z-50 bg-white text-black">
//       <div className="ws-container relative h-28 flex items-center justify-between px-0">
//         <Link to="/" className="flex items-center ml-[-6] gap-2 font-mono group">
//           {/* <img src="/F-1.svg" alt="WatchStory Logo" className="h-[150px] w-auto px-0" /> */}

//           <img src="/Logo.svg" alt="WatchStory Logo" className="h-56 w-auto" />


//         </Link>

//         {/* @apply container px-6 md:px-8; } */}


//         {/* Centering Container */}
//         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//           <Nav />
//         </div>

// {/* FIX: Wrapped the image in an <a> tag with the WhatsApp deep link */}
// <a 
//           href="https://wa.me/971545056156" 
//           target="_blank" 
//           rel="noopener noreferrer" 
//           aria-label="WhatsApp Enquiry"
//           className="hover:opacity-80 transition-opacity" // Optional hover effect
//         >
//           <img 
//             src={WHATSAPP_ICON_SRC} 
//             alt="WhatsApp" 
//             className="w-10 h-10" 
//           />
//         </a>



    


//       </div>
//     </div>
//   );
// }

import { Link, NavLink } from "react-router-dom";
import { useStory } from "@/state/story";
import { useCart } from "@/state/cart";
import { cn } from "@/lib/utils";
import React from "react";

const WHATSAPP_ICON_SRC = "/whatsapp-icon.png";


// --- MAXIMALLY SIMPLIFIED CSS-ONLY MenuLink ---

function MenuLink({ to, text }: { to: string; text: string }) {
  // All animation logic, handlers, refs, and the underline element are now removed.
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          // Simplified base styles: large text, no complex transitions, no 'group' class.
          "inline-block text-lg font-sans font-semibold tracking-wider",
          // Simple color change based on state (active is gold, inactive has a simple hover)
          isActive ? "text-gold" : "text-black hover:text-gold" 
        )
      }
    >
      {/* The span wrapper is kept only for rendering the text content */}
      <span>{text}</span>
    </NavLink>
  );
}
// --- END MAXIMALLY SIMPLIFIED COMPONENT ---


export default function TerminalStoryBar() {
  const { typedText, dots, currentLineIndex, toggleSound, soundOn } = useStory();
  const { count } = useCart(); 

  const Nav = () => (
    <nav className="font-sans md:flex items-center gap-6">
      <MenuLink to="/buy" text="Buy" />
      <MenuLink to="/sell" text="Sell" />
      <MenuLink to="/blog" text="Blog" />
    </nav>
  );

  return (
    <div className=" top-0 z-50 bg-white text-black">
      <div className="ws-container relative h-28 flex items-center justify-between px-0">
        <Link to="/" className="flex items-center ml-[-6] gap-2 font-mono group">
          <img src="/Logo.svg" alt="WatchStory Logo" className="h-56 w-auto" />
        </Link>

        {/* Centering Container */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Nav />
        </div>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/971545056156" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="WhatsApp Enquiry"
          className="hover:opacity-80 transition-opacity" 
        >
          <img 
            src={WHATSAPP_ICON_SRC} 
            alt="WhatsApp" 
            className="w-10 h-10" 
          />
        </a>
      </div>
    </div>
  );
}