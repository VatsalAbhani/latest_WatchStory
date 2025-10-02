// import { Link, NavLink } from "react-router-dom";
// import { Sparkles, ShoppingCart, Volume2, VolumeX, Menu } from "lucide-react";
// import { useStory } from "@/state/story";
// import { useCart } from "@/state/cart";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap";

// // function MenuLink({ to, text }: { to: string; text: string }) {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const timelineRef = useRef<gsap.core.Timeline>();

// //   useEffect(() => {
// //     const tl = gsap.timeline({ paused: true });

// //     tl.to(containerRef.current?.querySelector('.text-roll-original'), {
// //       y: "-100%",
// //       duration: 0.3,
// //       ease: "sine.out",
// //     })
// //       .to(containerRef.current?.querySelector('.text-roll-hover'), {
// //         y: "0%",
// //         duration: 0.3,
// //         ease: "sine.in",
// //       }, 0)
// //       .to(containerRef.current?.querySelector('.underline'), {
// //         scaleX: 1,
// //         duration: 0.25,
// //         ease: "power2.out",
// //       }, 0.05);

// //     timelineRef.current = tl;

// //     return () => {
// //       tl.kill();
// //     };
// //   }, []);

// //   const handleMouseEnter = () => {
// //     timelineRef.current?.play();
// //   };

// //   const handleMouseLeave = () => {
// //     timelineRef.current?.reverse();
// //   };

// //   return (
// //     <NavLink
// //       to={to}
// //       className={({ isActive }) =>
// //         cn(
// //           "relative block text-sm transition-colors",
// //           isActive && "text-gold"
// //         )
// //       }
// //       onMouseEnter={handleMouseEnter}
// //       onMouseLeave={handleMouseLeave}
// //     >
// //       <div ref={containerRef} className="text-roll-container">
// //         <span className="text-roll text-roll-original">{text}</span>
// //         <span className="text-roll text-roll-hover">{text}</span>
// //         <span className="underline"></span> {/* Place ONLY inside here */}
// //       </div>
// //     </NavLink>
// //   );
// // }




// function MenuLink({ to, text }: { to: string; text: string }) {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const handleMouseEnter = () => {
//     const underline = containerRef.current?.querySelector('.underline');
//     if (underline) {
//       gsap.set(underline, { transformOrigin: "left center" });
//       gsap.to(underline, { scaleX: 1, duration: 0.2, ease: "power2.out" });
//     }
//     // Animate text
//     gsap.to(containerRef.current?.querySelector('.text-roll-original'), {
//       y: "-100%",
//       duration: 0.3,
//       ease: "sine.out",
//     });
//     gsap.to(containerRef.current?.querySelector('.text-roll-hover'), {
//       y: "0%",
//       duration: 0.3,
//       ease: "sine.in",
//     });
//   };

//   const handleMouseLeave = () => {
//     const underline = containerRef.current?.querySelector('.underline');
//     if (underline) {
//       gsap.set(underline, { transformOrigin: "right center" });
//       gsap.to(underline, { scaleX: 0, duration: 0.2, ease: "power2.in" });
//     }
//     // Animate text back
//     gsap.to(containerRef.current?.querySelector('.text-roll-original'), {
//       y: "0%",
//       duration: 0.3,
//       ease: "sine.in",
//     });
//     gsap.to(containerRef.current?.querySelector('.text-roll-hover'), {
//       y: "100%",
//       duration: 0.3,
//       ease: "sine.out",
//     });
//   };

//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         cn(
//           "relative block text-sm transition-colors",
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









// export default function TerminalStoryBar() {
//   const { typedText, dots, currentLineIndex, toggleSound, soundOn } = useStory();
//   const { count } = useCart();

//   const Nav = () => (
//     <nav className="hidden md:flex items-center gap-6">
//       <MenuLink to="/buy" text="Buy" />
//       <MenuLink to="/sell" text="Sell" />
//       <MenuLink to="/blog" text="Blog" />
//       <MenuLink to="/about" text="About" />
//       <Link to="/cart" className="relative ml-6">
//         <ShoppingCart className="h-5 w-5 hover:text-gold transition" />
//         <span aria-label="cart count" className="absolute -right-2 -top-1 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">{count}</span>
//       </Link>
//     </nav>
//   );

//   return (
//     <div className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur">
//       <div className="ws-container h-14 flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-2 font-mono group">
//           <span className="text-sm tracking-tight">WatchStory_</span>
//           <Sparkles className="h-4 w-4 text-gold group-hover:scale-110 transition-transform" />
//         </Link>

//         <div className="flex-1 flex flex-col items-center px-3">
//           <div className="w-full md:w-[70%] truncate text-center text-[13px] md:text-sm text-offwhite/90">
//             <span className="align-middle">{typedText}</span>
//             <span aria-hidden className="ws-cursor align-middle">▌</span>
//           </div>
//           <div className="mt-1 hidden md:flex items-center gap-1" aria-label="story progress">
//             {dots.map((d, i) => (
//               <span key={d} className={cn("h-1.5 w-1.5 rounded-full", i === currentLineIndex ? "bg-gold" : "bg-offwhite/20")} />
//             ))}
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           <button aria-label="toggle sound" onClick={toggleSound} className="text-offwhite/80 hover:text-offwhite transition">
//             {soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
//           </button>
//           <Nav />
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon" className="md:hidden bg-transparent border-border/60"><Menu className="h-5 w-5" /></Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="bg-card">
//               <div className="flex flex-col gap-5 mt-8 text-lg">
//                 <NavLink to="/buy">Buy</NavLink>
//                 <NavLink to="/sell">Sell</NavLink>
//                 <NavLink to="/blog">Blog</NavLink>
//                 <NavLink to="/about">About</NavLink>
//                 <NavLink to="/cart">Cart ({count})</NavLink>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </div>
//   );
// }



import { Link, NavLink } from "react-router-dom";
import { Sparkles, ShoppingCart, Volume2, VolumeX, Menu } from "lucide-react";
import { useStory } from "@/state/story";
import { useCart } from "@/state/cart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

function MenuLink({ to, text }: { to: string; text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    const underline = containerRef.current?.querySelector('.underline');
    if (underline) {
      gsap.set(underline, { transformOrigin: "left center" });
      gsap.to(underline, { scaleX: 1, duration: 0.2, ease: "power2.out" });
    }
    // Animate text
    gsap.to(containerRef.current?.querySelector('.text-roll-original'), {
      y: "-100%",
      duration: 0.3,
      ease: "sine.out",
    });
    gsap.to(containerRef.current?.querySelector('.text-roll-hover'), {
      y: "0%",
      duration: 0.3,
      ease: "sine.in",
    });
  };

  const handleMouseLeave = () => {
    const underline = containerRef.current?.querySelector('.underline');
    if (underline) {
      gsap.set(underline, { transformOrigin: "right center" });
      gsap.to(underline, { scaleX: 0, duration: 0.2, ease: "power2.in" });
    }
    // Animate text back
    gsap.to(containerRef.current?.querySelector('.text-roll-original'), {
      y: "0%",
      duration: 0.3,
      ease: "sine.in",
    });
    gsap.to(containerRef.current?.querySelector('.text-roll-hover'), {
      y: "100%",
      duration: 0.3,
      ease: "sine.out",
    });
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "relative block text-sm transition-colors",
          isActive && "text-gold"
        )
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={containerRef} className="text-roll-container">
        <span className="text-roll text-roll-original">{text}</span>
        <span className="text-roll text-roll-hover">{text}</span>
        <span className="underline"></span>
      </div>
    </NavLink>
  );
}

export default function TerminalStoryBar() {
  const { typedText, dots, currentLineIndex, toggleSound, soundOn } = useStory();
  const { count } = useCart();

  const Nav = () => (
    <nav className="hidden md:flex items-center gap-6">
      <MenuLink to="/buy" text="Buy" />
      <MenuLink to="/sell" text="Sell" />
      <MenuLink to="/blog" text="Blog" />
      <MenuLink to="/about" text="About" />
      <Link to="/cart" className="relative ml-6">
        <ShoppingCart className="h-5 w-5 hover:text-gold transition" />
        <span aria-label="cart count" className="absolute -right-2 -top-1 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">{count}</span>
      </Link>
    </nav>
  );

  return (
    <div className="sticky top-0 z-50 bg-card/90 backdrop-blur">
      <div className="ws-container h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-mono group">
          <span className="text-sm tracking-tight">WatchStory_</span>
          <Sparkles className="h-4 w-4 text-gold group-hover:scale-110 transition-transform" />
        </Link>

        {/* <div className="flex-1 flex flex-col items-center px-3">
          <div className="w-full md:w-[70%] truncate text-center text-[13px] md:text-sm text-offwhite/90">
            <span className="align-middle">{typedText}</span>
            <span aria-hidden className="ws-cursor align-middle">▌</span>
          </div>
          <div className="mt-1 hidden md:flex items-center gap-1" aria-label="story progress">
            {dots.map((d, i) => (
              <span key={d} className={cn("h-1.5 w-1.5 rounded-full", i === currentLineIndex ? "bg-gold" : "bg-offwhite/20")} />
            ))}
          </div>
        </div> */}

        <div className="flex items-center gap-4">
          {/* <button aria-label="toggle sound" onClick={toggleSound} className="text-offwhite/80 hover:text-offwhite transition">
            {soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button> */}
          <Nav />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden bg-transparent border-border/60"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card">
              <div className="flex flex-col gap-5 mt-8 text-lg">
                <NavLink to="/buy">Buy</NavLink>
                <NavLink to="/sell">Sell</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/cart">Cart ({count})</NavLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}