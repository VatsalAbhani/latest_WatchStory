



import { Link, NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react";
import DriftingWatches from "./DriftingWatches";
import { Instagram, Linkedin, Facebook } from "lucide-react"; 
import Xlogo from "/X(twitter)-icon.svg";

// Create a React component for the X logo
const XIcon = ({ className }: { className?: string }) => (
  <img src={Xlogo} alt="X" className={className} />
);
import { AnimatedButton } from "@/components/AnimatedButton";


// The static path to the uploaded WhatsApp icon (Assuming it is accessible at the root)
const WHATSAPP_ICON_SRC = "/whatsapp-icon.png";

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

// --- RENAMED & REFACTORED COMPONENT: Now renders text structure without navigation logic ---
// It accepts a `children` prop and applies animation handlers to the wrapping element.
function AnimatedTextLink({ to, text }: { to: string; text: string }) {
  const linkRef = useRef<HTMLDivElement>(null);
  const originalTextRef = useRef<HTMLSpanElement>(null);
  const hoverTextRef = useRef<HTMLSpanElement>(null);
  const splitRefs = useRef<{ original?: SplitText; hover?: SplitText }>({});

  // Setup SplitText on mount and when text changes
  useEffect(() => {
    // The parent element might be <NavLink> (for nav links) or <a> (for WhatsApp link)
    const wrapperElement = linkRef.current;
    
    if (originalTextRef.current && hoverTextRef.current && wrapperElement) {
      const originalSplit = new SplitText(originalTextRef.current, { type: "chars" });
      const hoverSplit = new SplitText(hoverTextRef.current, { type: "chars" });
      
      splitRefs.current = { original: originalSplit, hover: hoverSplit };

      gsap.set(hoverSplit.chars, { y: "100%" });
      gsap.set(originalSplit.chars, { y: "0%" }); 

      // Define handlers here (using refs to access split text)
      const handleMouseEnter = () => {
        const { original, hover } = splitRefs.current;
        if (!original || !hover) return;

        // Animate underline (Only available for NavLinks, safely ignore for buttons)
        const underline = linkRef.current?.querySelector('.underline');
        if (underline) {
          gsap.set(underline, { transformOrigin: "left center" });
          gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
        }
        
        gsap.to(original.chars, { y: "-100%", stagger: 0.01, duration: 0.3, ease: "sine.in" });
        gsap.to(hover.chars, { y: "0%", stagger: 0.01, duration: 0.4, ease: "sine.out" });
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

        gsap.to(original.chars, { y: "0%", stagger: 0.01, duration: 0.3, ease: "sine.out" });
        gsap.to(hover.chars, { y: "100%", stagger: 0.01, duration: 0.3, ease: "sine.in" });
      };
      
      // Attach handlers to the wrapper (NavLink or custom <a>)
      // NOTE: We rely on the parent wrapper (like the WhatsAppLink or the <li>) to handle the mouse events when used in the footer link columns. 
      // For standalone usage, we use the internal ref.
      linkRef.current?.addEventListener('mouseenter', handleMouseEnter);
      linkRef.current?.addEventListener('mouseleave', handleMouseLeave);


      return () => {
        linkRef.current?.removeEventListener('mouseenter', handleMouseEnter);
        linkRef.current?.removeEventListener('mouseleave', handleMouseLeave);
        originalSplit.revert();
        hoverSplit.revert();
      };
    }
  }, [text]);

  const classes = ({ isActive }: { isActive: boolean }) =>
      cn(
        "relative inline-block text-sm transition-colors",
        isActive && "text-gold"
      );

  const content = (
      <div ref={linkRef} className={cn("relative inline-block text-sm transition-colors")}>
          <div className="relative h-[1.5em] overflow-hidden grid">
              <span ref={originalTextRef} className="col-start-1 row-start-1 whitespace-nowrap">
                  {text}
              </span>
              <span ref={hoverTextRef} className="col-start-1 row-start-1 whitespace-nowrap">
                  {text}
              </span>
          </div>
          {/* Underline targetting this specific link */}
          {/* Only render underline for navigation links */}
          {to && <span className="underline absolute bottom-[-2px] left-0 block h-[1px] w-full bg-current scale-x-0"></span>}
      </div>
  );

  // If a `to` prop is provided, render as NavLink (for primary menu/footer links)
  if (to) {
      return (
          <NavLink
              to={to}
              className={classes}
              // Handlers attached inside useEffect now
          >
              <div ref={linkRef} className="relative inline-block text-sm transition-colors">
                  <div className="relative h-[1.5em] overflow-hidden grid">
                      <span ref={originalTextRef} className="col-start-1 row-start-1 whitespace-nowrap">
                          {text}
                      </span>
                      <span ref={hoverTextRef} className="col-start-1 row-start-1 whitespace-nowrap">
                          {text}
                      </span>
                  </div>
                  <span className="underline absolute bottom-[-2px] left-0 block h-[1px] w-full bg-current scale-x-0"></span>
              </div>
          </NavLink>
      );
  }

  // If `to` is not provided, render only the animated text structure
  return (
    <div 
        ref={linkRef} 
        className="relative inline-block text-sm transition-colors"
    >
        <div className="relative h-[1.5em] overflow-hidden grid">
            <span ref={originalTextRef} className="col-start-1 row-start-1 whitespace-nowrap">
                {text}
            </span>
            <span ref={hoverTextRef} className="col-start-1 row-start-1 whitespace-nowrap">
                {text}
            </span>
        </div>
    </div>
  );
}


// --- WHATSAPP LINK COMPONENT (ANIMATION REMOVED) ---
function WhatsAppLink() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const originalTextRef = useRef<HTMLSpanElement>(null);
  const hoverTextRef = useRef<HTMLSpanElement>(null);
  const splitRefs = useRef<{ original?: SplitText; hover?: SplitText }>({});

  const text = "Enquire on WhatsApp →";

// Setup SplitText on mount (copied from MenuLink, running here)
useEffect(() => {
  if (originalTextRef.current && hoverTextRef.current) {
    const originalSplit = new SplitText(originalTextRef.current, { type: "chars" });
    const hoverSplit = new SplitText(hoverTextRef.current, { type: "chars" });
    
    splitRefs.current = { original: originalSplit, hover: hoverSplit };

    gsap.set(hoverSplit.chars, { y: "100%" }); // Hover text hidden below
    gsap.set(originalSplit.chars, { y: "0%" }); // Original text visible

    return () => {
      originalSplit.revert();
      hoverSplit.revert();
    };
  }
}, [text]);

// HandleMouseEnter logic (copied from MenuLink, running on outer <a>)
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
    ease: "sine.in",
  });

  gsap.to(hover.chars, {
    y: "0%",
    stagger: 0.01,
    duration: 0.4,
    ease: "sine.out",
  });
};

// HandleMouseLeave logic (copied from MenuLink, running on outer <a>)
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
    ease: "sine.out",
  });

  gsap.to(hover.chars, {
    y: "100%",
    stagger: 0.01,
    duration: 0.3,
    ease: "sine.in",
  });
};

return (
  <a 
    ref={linkRef}
    href="https://wa.me/971545056156" // Example Dubai number
    target="_blank" 
    rel="noreferrer" 
    // The entire <a> tag is the unified hover trigger
    className="inline-flex items-center gap-2 text-sm ws-button-secondary py-2 px-4 relative group/whatsapp"
    onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave}
  >
    <img 
      src={WHATSAPP_ICON_SRC} 
      alt="WhatsApp" 
      className="w-5 h-5" 
    />
    
    {/* Manually embedded text content for animation */}
    <div className="relative inline-block font-sans text-base font-semibold
 transition-colors">
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
      {/* Underline targetting this specific link */}
      <span className="underline absolute bottom-[-2px] left-0 block h-[1px] w-full bg-current scale-x-0"></span>
    </div>
  </a>
);
}




// --- SOCIAL MEDIA ICON COMPONENT (UNMODIFIED) ---
function SocialLink({ Icon, href, label }: { Icon: React.ElementType, href: string, label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label={label}
      className="text-offwhite/50 hover:text-gold transition-colors duration-200"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}


export default function Footer() {

      // 1. Define loading state for the subscription form
      const [isSubscribing, setIsSubscribing] = useState(false);

// --- NEW FUNCTION: AJAX Submission for Netlify Form ---
const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}
// ----------------------------------------------------
          // 2. Define a simple handler for the form
    const handleSubscribe = async (e) => {
      e.preventDefault();
      setIsSubscribing(true);

      const form = e.target;
        const emailInput = form.querySelector('input[name="email"]');
        const email = emailInput ? emailInput.value : '';

        if (!email) {
          alert("Please enter a valid email address.");
          setIsSubscribing(false);
          return;
      }
      try {
        // Netlify requires POST to the same URL the form is on,
        // with a specific Content-Type for encoded data.
        await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ 
                "form-name": form.getAttribute("name"), 
                "email": email 
            })
        });

        alert("Subscribed successfully! Thank you for joining our Journal.");
        if (emailInput) emailInput.value = ''; // Clear the input field

    } catch (error) {
        console.error("Netlify form submission failed:", error);
        alert("Subscription failed. Please try again later.");
    } finally {
        setIsSubscribing(false);
    }

// ----------------------------------------------------------------------
  };
  return (
    <footer className="relative mt-8 overflow-hidden">
      
      <div className="ws-container py-8 relative z-10">
        
        {/* TOP ROW: LOGO, EMAIL, AND WHATSAPP BUTTON (Spans full width) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between  pb-8  mb-8">
          
          {/* 1. Logo/Branding */}
          <Link to="/" className="flex items-center ml-[-6] gap-2 font-mono group">
          {/* -mb-8 h-16 sm:h-40 w-auto */}
            <img src="/F1.png" alt="WatchStory Logo" className="h-52 sm:h-32 md:h-44 w-auto mb-8 md:mb-0" />
            
          </Link>

          {/* 2. Email Signup Form (Covers most space) */}
          <form 
              className=" md:mt-0 mb-4 flex flex-col md:flex-1 md:max-w-xl lg:max-w-2xl" 
              onSubmit={handleSubscribe} // Use the new handler
              name="email-subscription" // MANDATORY: Gives the form a name for Netlify
              data-netlify="true"        // MANDATORY: Tells Netlify to process it
              netlify-honeypot="bot-field"
              >
                <input type="hidden" name="form-name" value="email-subscription" />
                <input type="hidden" name="bot-field" />
            {/* NEW TEXT HEADER */}
            <div className="mb-4 font-sans font-extrabold text-offwhite/60 text-sm mb-2 md:text-left">Connect for Exclusive Updates</div>

            <div className="flex flex-col sm:flex-row gap-2">
                <input 
                aria-label="email" 
                type="email" 
                required 
                placeholder="Enter your email" 
                className="w-full bg-transparent border px-3 py-2 rounded-md placeholder:text-black/40 text-sm" 
                name="email" // MANDATORY: Field name for Netlify
                />
                {/* <button className="ws-button-primary flex-shrink-0"> */}
                  {/* FIX: Reusing the AnimatedTextLink component here */}
                  {/* <AnimatedTextLink to="" text="Subscribe" /> */}
                {/* </button> */}



                  {/* --- SUBMIT BUTTON --- */}
              {/* <div className="md:col-span-2 flex justify-end pt-2"> */}
                <AnimatedButton
                                // Pass necessary props for the subscribe button
                                text="Subscribe"
                                hoverText="Join Now" 
                                loading={isSubscribing}
                                className="ws-button-primary flex-shrink-0" // Add primary styling and flex-shrink
                                type="submit" // Ensure it triggers the form submission
                            />
                {/* </div> */}
            </div>
          </form>

          {/* 3. WhatsApp Link (Right side) */}
          <div className="mt-6 mb-4 md:mt-0 flex justify-start md:justify-end">
            <WhatsAppLink /> 

            
          </div>
        </div>

        {/* BOTTOM SECTION: LINKS GRID (3 Columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-x-2 gap-y-4 text-sm">
          
          {/* Column 1: Explore */}
          <div>
            <div className="font-sans font-extrabold text-offwhite/60 mb-3">Explore</div>
            <ul className="font-sans font-semibold space-y-2">
              {/* Using the standard component here */}
              <li><AnimatedTextLink to="/buy" text="Buy" /></li>
              <li><AnimatedTextLink to="/sell" text="Sell" /></li>
              <li><AnimatedTextLink to="/blog" text="Blog" /></li>
              <li><AnimatedTextLink to="/about" text="About" /></li>
              <li><AnimatedTextLink to="/contact" text="Contact" /></li>
            </ul>
          </div>

          {/* Column 2: Trust & Service */}
          
          <div>
  <div className="font-sans font-extrabold text-offwhite/60 mb-3">Trust & Service</div>
  <ul className="font-sans font-semibold space-y-2">
    <li><AnimatedTextLink to="/terms-conditions#authentication" text="Authenticity Guarantee" /></li>
    <li><AnimatedTextLink to="/terms-conditions#warranty" text="Mechanical Warranty" /></li>
    <li><AnimatedTextLink to="/terms-conditions#valuation" text="Expert Valuation & Sourcing" /></li>
    <li><AnimatedTextLink to="/terms-conditions#security" text="Insured Global Shipping" /></li>
  </ul>
</div>

          
          {/* Column 3 (or 3/4): Social Media Links */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <div className="font-sans font-extrabold text-offwhite/60 mb-3">Connect</div>
            <div className="flex gap-4">
              <SocialLink 
                Icon={Instagram} 
                href="https://www.instagram.com/watchstory.uae/" 
                label="Instagram" 
                
              />
              <SocialLink 
                Icon={XIcon} 
                href="https://x.com/WatchStoryUAE" 
                label="X (Twitter)" 
              />
              <SocialLink 
                Icon={Linkedin} 
                href="https://www.linkedin.com/company/watchstory" 
                label="LinkedIn" 
              />
              <SocialLink 
                Icon={Facebook} 
                href="https://www.facebook.com/watchstory" 
                label="Facebook" 
              />
            </div>
          </div>
          
          {/* Remaining column for large screens */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <div className="font-sans font-extrabold text-offwhite/60 mb-3">Contact Us</div>
                    {/* Email + Location */}
  <div className="space-y-2 font-sans font-semibold">




  <a
      href="https://www.google.com/maps?q=The+Bureau+Business+Center+-+Opera+Grand+Opera+Grand,+The+Residences+-+Emaar+Blvd+-+Downtown+Dubai+-+Burj+Residence+Phase+I+%26+II+-+Dubai"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open WatchStory location in Google Maps"
      className="block  hover:text-primary transition-colors leading-snug"
    >
      The Bureau Business Center — Opera Grand<br />
      Downtown Dubai<br />
    </a>
    <a
      href="mailto:info@watchstory.ae"
      aria-label="Email WatchStory"
      className="block  hover:text-primary transition-colors"
    >
      info@watchstory.ae
    </a>


             
              
            </div>
          </div>
        </div>









        
      </div>

      {/* === NEW LEGAL LINKS SECTION === */}
      <div className="py-6 ws-container border-t border-offwhite/10">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center text-xs text-offwhite/50">
            {/* 1. Copyright Text (Order 2 on mobile, 1 on desktop) */}
            <div className="order-2 sm:order-1 mt-3 sm:mt-0">
                © {new Date().getFullYear()} WatchStory Trading LLC. All rights reserved.
            </div>
            
            {/* 2. Legal Links (Order 1 on mobile, 2 on desktop) */}
            <div className="order-1 sm:order-2 flex gap-4 text-sm font-semibold">
                <Link to="/privacy-policy" className="hover:text-gold transition-colors text-primary">
                    Privacy Policy
                </Link>
                <Link to="/terms-conditions" className="hover:text-gold transition-colors text-primary">
                    Terms & Conditions
                </Link>
            </div>
        </div>
      </div>
      {/* =============================== */}
    </footer>
  );
}