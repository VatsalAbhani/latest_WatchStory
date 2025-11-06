
// import { Link, NavLink } from "react-router-dom";
// import { useStory } from "@/state/story";
// import { useCart } from "@/state/cart";
// import { cn } from "@/lib/utils";
// import React from "react";

// const WHATSAPP_ICON_SRC = "/whatsapp-icon.png";

// // --- MAXIMALLY SIMPLIFIED CSS-ONLY MenuLink (Used for styling inside the <ul>) ---
// function SimpleNavLink({ to, text }: { to: string; text: string }) {
//   // This simple version uses minimal classes for functionality and basic hover effect.
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         cn(
//           "inline-block  font-sans font-semibold tracking-wider",
//           // Base color logic: text black, hover to gold
//           isActive ? "text-gold" : "text-black hover:text-gold transition-colors duration-200" 
//         )
//       }
//     >
//       <span>{text}</span>
//     </NavLink>
//   );
// }
// // --- END MAXIMALLY SIMPLIFIED COMPONENT ---


// export default function TerminalStoryBar() {
//   const { typedText, dots, currentLineIndex, toggleSound, soundOn } = useStory();
//   const { count } = useCart(); 

//   // Removed the unused Nav component definition

//   return (
//     <div className=" top-0 z-50 bg-white text-black">
//       <div className="ws-container relative h-16 sm:h-20 flex items-center justify-between px-0">
//         <Link to="/" className="flex items-center ml-[-6] gap-2 font-mono group">
//         <img src="/F1.png" alt="WatchStory Logo" className="h-40 sm:h-48 w-auto" />
//         </Link>

//         {/* Centering Container */}
//         <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          
//           {/* --- REPLACED NAV STRUCTURE WITH UL/LI --- */}
//           <ul className="flex items-center space-x-10 font-sans text-sm sm:text-lg">
//             <li>
//               <SimpleNavLink to="/buy" text="Buy" />
//             </li>
//             <li>
//               <SimpleNavLink to="/sell" text="Sell" />
//             </li>
//             <li>
//               <SimpleNavLink to="/blog" text="Blog" />
//             </li>
//           </ul>
//           {/* -------------------------------------- */}
//         </div>

//         {/* WhatsApp Button */}
//         <a 
//           href="https://wa.me/971545056156" 
//           target="_blank" 
//           rel="noopener noreferrer" 
//           aria-label="WhatsApp Enquiry"
//           className="hover:opacity-80 transition-opacity" 
//         >
//           <img 
//             src={WHATSAPP_ICON_SRC} 
//             alt="WhatsApp" 
//             className="mr-4 w-8 h-8 sm:w-12 sm:h-12"
//             // h-16 sm:h-40 w-auto 
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
import React, { useState } from "react";

const WHATSAPP_ICON_SRC = "/whatsapp-icon.png";

// --- MAXIMALLY SIMPLIFIED CSS-ONLY MenuLink (Used for styling inside the <ul>) ---
function SimpleNavLink({ to, text, onClick }: { to: string; text: string; onClick?: () => void }) {
  // Added an onClick prop to allow closing the menu when a link is clicked
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "inline-block font-sans font-semibold tracking-wider p-2 rounded-lg",
          // Base color logic: text black, hover to gold
          isActive 
            ? "text-white bg-gold" 
            : "text-black hover:text-gold transition-colors duration-200" 
        )
      }
    >
      <span>{text}</span>
    </NavLink>
  );
}
// --- END MAXIMALLY SIMPLIFIED COMPONENT ---


export default function TerminalStoryBar() {
  const { typedText, dots, currentLineIndex, toggleSound, soundOn } = useStory();
  const { count } = useCart(); 
  
  // 1. STATE: Added state to manage the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  // Handler to toggle the menu open/closed
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Handler to close the menu, typically used after a link is clicked
  const closeMenu = () => setIsMenuOpen(false);


  return (
    // The main container needs z-50 to ensure it's always on top
    <div className=" top-0 z-50 bg-white text-black">
      <div className="ws-container relative h-auto sm:h-20 flex items-center justify-between px-4 sm:px-0">
        
        {/* Logo (Stays on the left) */}
        <Link to="/" className="flex items-center ml-[-2] gap-2 font-mono group">
            {/* Adjusted logo classes for better scale in navbar, assuming F1.png is the logo */}
            <img src="/F1.png" alt="WatchStory Logo" className="h-48 sm:h-48 w-auto" /> 
        </Link>

        {/* --- DESKTOP NAVIGATION LINKS (Visible only on screens larger than 'sm') --- */}
        <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul className="flex items-center space-x-10 font-sans text-sm sm:text-lg">
            <li>
              <SimpleNavLink to="/buy" text="Buy" />
            </li>
            <li>
              <SimpleNavLink to="/sell" text="Sell" />
            </li>
            <li>
              <SimpleNavLink to="/blog" text="Blog" />
            </li>
            {/* Include other links here if needed, e.g., /about and /contact us */}
          </ul>
        </div>
        {/* -------------------------------------------------------------------------- */}
        
        {/* --- RIGHT SIDE ICONS/BUTTONS --- */}
        <div className="flex items-center space-x-4">
            {/* WhatsApp Button (Always visible) */}
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
                className="w-10 h-10 sm:w-12 sm:h-12"
                
              />
            </a>

            {/* --- MOBILE HAMBURGER TOGGLE (Visible only on 'sm' and smaller screens) --- */}
            <button 
                className="sm:hidden p-2 text-black z-50"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                {/* Heroicons-style SVG for Hamburger/Close */}
                {isMenuOpen ? (
                    // 'X' Icon (Menu is open)
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    // Hamburger Icon (Menu is closed)
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>
            {/* ----------------------------------------------------------------------------- */}
        </div>

      </div>

      {/* 2. MOBILE MENU FLYOUT PANE */}
      <div 
        className={cn(
          "sm:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white z-40 transform transition-transform duration-300 ease-in-out shadow-lg",
          isMenuOpen ? "translate-x-0" : "-translate-x-full" // Slides the menu in/out
        )}
      >
        <div className="flex flex-col items-center justify-start py-8 space-y-4"> 
          {/* Note: The SimpleNavLink components now use the onClick prop to close the menu */}
          <SimpleNavLink to="/buy" text="Buy" onClick={closeMenu} />
          <SimpleNavLink to="/sell" text="Sell" onClick={closeMenu} />
          <SimpleNavLink to="/blog" text="Blog" onClick={closeMenu} />
          {/* Add your missing links here */}
          <SimpleNavLink to="/about" text="About" onClick={closeMenu} />
          <SimpleNavLink to="/contact" text="Contact Us" onClick={closeMenu} />
        </div>
      </div>
      {/* ----------------------------------------------------- */}
    </div>
  );
}