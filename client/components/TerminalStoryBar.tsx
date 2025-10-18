
import { Link, NavLink } from "react-router-dom";
import { useStory } from "@/state/story";
import { useCart } from "@/state/cart";
import { cn } from "@/lib/utils";
import React from "react";

const WHATSAPP_ICON_SRC = "/whatsapp-icon.png";

// --- MAXIMALLY SIMPLIFIED CSS-ONLY MenuLink (Used for styling inside the <ul>) ---
function SimpleNavLink({ to, text }: { to: string; text: string }) {
  // This simple version uses minimal classes for functionality and basic hover effect.
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "inline-block text-lg font-sans font-semibold tracking-wider",
          // Base color logic: text black, hover to gold
          isActive ? "text-gold" : "text-black hover:text-gold transition-colors duration-200" 
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

  // Removed the unused Nav component definition

  return (
    <div className=" top-0 z-50 bg-white text-black">
      <div className="ws-container relative h-16 sm:h-20 flex items-center justify-between px-0">
        <Link to="/" className="flex items-center ml-[-6] gap-2 font-mono group">
        <img src="/Logo.svg" alt="WatchStory Logo" className="h-10 sm:h-12 w-auto" />
        </Link>

        {/* Centering Container */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          
          {/* --- REPLACED NAV STRUCTURE WITH UL/LI --- */}
          <ul className="flex items-center space-x-10 font-sans">
            <li>
              <SimpleNavLink to="/buy" text="Buy" />
            </li>
            <li>
              <SimpleNavLink to="/sell" text="Sell" />
            </li>
            <li>
              <SimpleNavLink to="/blog" text="Blog" />
            </li>
          </ul>
          {/* -------------------------------------- */}
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