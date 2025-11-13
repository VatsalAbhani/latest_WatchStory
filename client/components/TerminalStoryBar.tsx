



// import { Link, NavLink } from "react-router-dom";
// import { useStory } from "@/state/story";
// import { useCart } from "@/state/cart";
// import { cn } from "@/lib/utils";
// import React, { useState } from "react";

// const WHATSAPP_ICON_SRC = "/whatsapp-icon.png";

// // --- MAXIMALLY SIMPLIFIED CSS-ONLY MenuLink ---
// function SimpleNavLink({ to, text, onClick }: { to: string; text: string; onClick?: () => void }) {
//   return (
//     <NavLink
//       to={to}
//       onClick={onClick}
//       className={({ isActive }) =>
//         cn("inline-block font-sans font-semibold tracking-wider p-2")
//       }
//     >
//       {({ isActive }) => <span>{isActive ? text.toUpperCase() : text}</span>}
//     </NavLink>
//   );
// }

// export default function TerminalStoryBar() {
//   const { typedText, dots, currentLineIndex, toggleSound, soundOn } = useStory();
//   const { count } = useCart();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const closeMenu = () => setIsMenuOpen(false);

//   return (
//     // ⬇️ Make wrapper full-width, positioned, and relative so the blur strip anchors correctly
//     <div className="relative z-50 w-full text-white bg-black/30 backdrop-blur-xl text-white border-b border-white/10">
//       {/* Keep content centered inside ws-container */}
//       <div className="ws-container relative h-auto sm:h-20 flex items-center justify-between px-4 sm:px-0">
//         {/* Logo */}
//         <Link to="/" className="flex items-center ml-[-2] gap-2 font-mono group">
//           <img
//             src="/F1.png"
//             alt="WatchStory Logo"
//             className="-mt-4 h-48 sm:h-48 w-auto"
//           />
//         </Link>

//         {/* Desktop nav */}
//         <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//           <ul className="flex items-center space-x-10 font-sans text-sm sm:text-lg">
//             <li><SimpleNavLink to="/buy" text="Buy" /></li>
//             <li><SimpleNavLink to="/sell" text="Sell" /></li>
//             <li><SimpleNavLink to="/blog" text="Blog" /></li>
//           </ul>
//         </div>

//         {/* Right actions */}
//         <div className="flex items-center space-x-4">
//           <a
//             href="https://wa.me/971545056156"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="WhatsApp Enquiry"
//             className="hover:opacity-80 transition-opacity"
//           >
//             <img src={WHATSAPP_ICON_SRC} alt="WhatsApp" className="w-10 h-10 sm:w-12 sm:h-12" />
//           </a>

//           {/* Mobile toggle (white so it’s visible over video) */}
//           <button
//             className="sm:hidden p-2 text-white z-50"
//             onClick={toggleMenu}
//             aria-label="Toggle navigation menu"
//           >
//             {isMenuOpen ? (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div
//         className={cn(
//           "sm:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white z-40 transform transition-transform duration-300 ease-in-out shadow-lg",
//           isMenuOpen ? "translate-x-0" : "-translate-x-full"
//         )}
//       >
//         <div className="flex flex-col items-center justify-start py-8 space-y-4">
//           <SimpleNavLink to="/buy" text="Buy" onClick={closeMenu} />
//           <SimpleNavLink to="/sell" text="Sell" onClick={closeMenu} />
//           <SimpleNavLink to="/blog" text="Blog" onClick={closeMenu} />
//           <SimpleNavLink to="/about" text="About" onClick={closeMenu} />
//           <SimpleNavLink to="/contact" text="Contact Us" onClick={closeMenu} />
//         </div>
//       </div>

//       {/* Bottom blur to blend into video */}
//       <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 " />
//     </div>
//   );
// }






// TerminalStoryBar.tsx
import { Link, NavLink, useLocation } from "react-router-dom";
import { useStory } from "@/state/story";
import { useCart } from "@/state/cart";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";

type NavVariant = "auto" | "transparent" | "solid";


function SimpleNavLink({ to, text, onClick }: { to: string; text: string; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn("inline-block font-sans font-semibold tracking-wider p-2")
      }
    >
      {({ isActive }) => <span>{isActive ? text.toUpperCase() : text}</span>}
    </NavLink>
  );
}




export default function TerminalStoryBar({
  variant = "auto",
}: { variant?: NavVariant }){
  const { pathname } = useLocation();
  const { count } = useCart();

  // Transparent only on homepage top; solid elsewhere
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ detect mobile once per render
  const isMobile = useMemo(() => (typeof window !== "undefined" ? window.matchMedia("(max-width: 639px)").matches : false), []);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const effectiveTransparent =
  !isMobile && ((variant === "transparent") || (variant === "auto" && isHome && !scrolled));

  const barClass = cn(
    "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
    effectiveTransparent
      ? "bg-transparent text-white"
      : "bg-white/90 text-black backdrop-blur-md"
  );

  const linkClass = "inline-block font-sans font-semibold tracking-wider p-2";
  const iconColor = effectiveTransparent ? "text-white" : "text-black";
  const hamburgerClasses = cn("sm:hidden p-2", iconColor);

  const toggleMenu = () => setIsMenuOpen(p => !p);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={barClass}>
      <div className="ws-container relative h-28
       sm:h-20 flex items-center justify-between px-4 sm:px-0">

        {/* Logo */}
        <Link to="/" className="flex items-center ml-[-2] gap-2 font-mono group">
          {/* If your logo is dark, consider a light variant for transparency or use drop-shadow */}
          <img
            src="/F1.png"
            alt="WatchStory Logo"
            className={cn("-mt-4 h-48 sm:h-48 w-auto drop-shadow", effectiveTransparent && "drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]")}
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul className={cn("flex items-center space-x-10 font-sans text-sm sm:text-lg")}>
            {/* <li><NavLink to="/buy" className={linkClass}>Buy</NavLink></li>
            <li><NavLink to="/sell" className={linkClass}>Sell</NavLink></li>
            <li><NavLink to="/blog" className={linkClass}>Blog</NavLink></li> */}


                         <li><SimpleNavLink to="/buy" text="Buy" /></li>
            <li><SimpleNavLink to="/sell" text="Sell" /></li>
             <li><SimpleNavLink to="/blog" text="Blog" /></li>
          </ul>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <a
            href="https://wa.me/971545056156"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Enquiry"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src="/whatsapp-icon.png"
              alt="WhatsApp"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
          </a>

          {/* Mobile toggle */}
          <button
            className={hamburgerClasses}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (always white for readability) */}
      <div
        className={cn(
          "sm:hidden fixed top-28 left-0 w-4/5 h-[calc(100vh-4rem)] bg-white z-40 transform transition-transform duration-300 ease-in-out shadow-lg",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col items-center justify-start py-8 space-y-4">
          <NavLink to="/buy" className={linkClass} onClick={closeMenu}>Buy</NavLink>
          <NavLink to="/sell" className={linkClass} onClick={closeMenu}>Sell</NavLink>
          <NavLink to="/blog" className={linkClass} onClick={closeMenu}>Blog</NavLink>
          <NavLink to="/about" className={linkClass} onClick={closeMenu}>About</NavLink>
          <NavLink to="/contact" className={linkClass} onClick={closeMenu}>Contact Us</NavLink>
        </div>
      </div>
    </div>
  );
}
