
// // client/components/HorizontalWatchShowcase.tsx
// import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Link } from 'react-router-dom';
// import TypewriterHeading from './TypewriterHeading';
// import MagneticButton from './MagneticButton';
// import { 
//   Carousel, 
//   CarouselContent, 
//   CarouselItem, 
//   CarouselNext, 
//   CarouselPrevious // Added Carousel Imports
// } from "@/components/ui/carousel";

// gsap.registerPlugin(ScrollTrigger);

// interface Watch {
//   id: string;
//   name: string;
//   brand: string;
//   price: string;
//   imageUrl: string;
//   slug: string;
//   year: string;
//   movement: string;
//   reference: string;
//   condition: string;
//   // --- NEW: Dynamic theme classes for premium look ---
//   bgColor: string;   // e.g., 'bg-gray-900', 'bg-white', 'bg-slate-800'
//   textColor: string; // e.g., 'text-offwhite', 'text-black'
//   // -------------------------------------------------
// }
// // these watches (everything about this watches) can be changes from index.tsx 

// // ------------------------------------------------------------
// interface Props {
//   watches: Watch[];
// }


// const MIN_DESKTOP_WIDTH = 768; // Tailwind md breakpoint

// function SlideContent({ watch }: { watch: Watch }) {
//     // Extracted the common slide content into a reusable component
//     return (
//         <div className="w-full h-full max-w-8xl mx-auto px-8 md:px-12 bg-stone-200">
//             {/* <Link
//               to={`/watch/${watch.slug}`}
//               className="group block w-full max-w-8xl mx-auto"
//             > */}
//               <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center pt-16 pb-20">

//                 {/* Image Section */}
//                 <div className="relative border border-black/10 rounded-2xl">
//                   <div className="watch-image relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-offwhite/10 to-transparent backdrop-blur-sm border border-offwhite/10">
//                     <img
//                       src={watch.imageUrl}
//                       alt={`${watch.brand} ${watch.name}`}
//                       className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
//                       loading="lazy"
// decoding="async"

//                     />

//                     {/* Minimalistic Hover Overlay */}
//                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                   </div>

//                   {/* Badge */}
//                   <div className="watch-badge absolute -top-4 -right-4 bg-gold text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg">
//                     {watch.condition}
//                   </div>

//                   {/* Details Bar */}
//                   <div className={`absolute -bottom-6 left-6 right-6 backdrop-blur-md rounded-xl p-4 border border-black/40`}>
//                     <div className="text-medium  text-center">
//                       <span className="opacity-90 font-medium">Ref. {watch.reference}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Text Content Section */}
//                 <div className="watch-content space-y-6 md:space-y-8">
//                   <div className="space-y-4">
//                     <div className="font-sans text-gold text-lg font-semibold tracking-wide">
//                       {watch.brand}
//                     </div>
//                     <h3 className={`font-title text-3xl md:text-5xl leading-tight ${watch.textColor}`}>
//                       {watch.name}
//                     </h3>
//                   </div>

//                   <div className="flex gap-4">
//                     <MagneticButton
//                       href={`/watch/${watch.slug}`}
//                       variant="primary"
//                       className="text-sm"
//                     >
//                       Details
//                     </MagneticButton>


//                     <MagneticButton
//                       href="https://wa.me/971545056156" 
//                       variant="secondary"
//                       className="text-sm"
//                       target="_blank" 
//                       rel="noopener noreferrer" 
//                     >
//                       Inquire
//                     </MagneticButton>
//                   </div>
//                 </div>
//               </div>
//             {/* </Link> */}
//           </div>
//     );
// }



// export default function HorizontalWatchShowcase({ watches }: Props) {
//   const containerRef = useRef<HTMLElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);
//   const slidesRef = useRef<HTMLDivElement[]>([]);
//   const progressRef = useRef<HTMLDivElement>(null);
//   const counterRef = useRef<HTMLSpanElement>(null);
//   const totalRef = useRef<HTMLSpanElement>(null);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const [isMobile, setIsMobile] = useState(false); // New state to track mobile view


//   // Client-side check for mobile/desktop
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < MIN_DESKTOP_WIDTH);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useLayoutEffect(() => {
//     const container = containerRef.current;
//     const track = trackRef.current;
//     slidesRef.current = slidesRef.current.filter(Boolean); // Clean up stale refs
//     const slides = slidesRef.current;
// // Only set up GSAP/ScrollTrigger for Desktop views
// if (!container || !track || slides.length === 0 || isMobile) {
//   // Cleanup existing ScrollTriggers if switching to mobile view
//   ScrollTrigger.getAll().forEach(t => t.kill());
//   gsap.set(track, { x: 0 }); // Ensure horizontal offset is reset
//   return () => {};
// } 

   

//     ScrollTrigger.getAll().forEach(t => t.kill());

//     const total = totalRef.current;
//     if (total) {
//       total.textContent = watches.length.toString().padStart(2, '0');
//     }

//     const trackWidth = track.scrollWidth;
//     const viewportWidth = window.innerWidth;
//     const distanceToScroll = trackWidth - viewportWidth;

//     if (distanceToScroll <= 0) {
//       return;
//     }

//     // Main horizontal scroll animation
//     const tween = gsap.to(track, {
//       x: -distanceToScroll,
//       ease: 'none',
//       force3D: true,
//       scrollTrigger: {
//         trigger: container,
//         pin: true,
//         pinType: 'transform',
//         pinSpacing: true,
//         anticipatePin: 1,
//         fastScrollEnd: true,
//         scrub: 1,
//         end: `+=${distanceToScroll}`,
//         // Add these lines:
//         pinReparent: true, // Forces re-insertion to fix potential Safari bugs
   
//     // ----------------------------------------------
//         onRefreshInit: (self) => {
//           window.scrollTo(0, self.start);
//         },
//         onUpdate(self) {
//           const progressBar = progressRef.current;
//           if (progressBar) {
//             gsap.set(progressBar, { scaleX: self.progress });
//           }

//           const counter = counterRef.current;
//           if (counter) {
//             const idx = Math.floor(self.progress * (slides.length - 1));
//             const current = Math.min(idx + 1, slides.length);
//             counter.textContent = current.toString().padStart(2, '0');
//           }
//         }
//       }
//     });

//     const mainScrollTrigger = tween.scrollTrigger; // <-- FIX: Capture the main ScrollTrigger instance
//     const slideTriggers: ScrollTrigger[] = []; // <-- NEW: Array to hold slide triggers



//     // Animate text in each slide
//     slides.forEach(slide => {
//       const animEls = slide.querySelectorAll<HTMLElement>('.anim');
//       if (!animEls.length) return;
//       const st = ScrollTrigger.create({
//         containerAnimation: tween,
//         trigger: slide,
//         start: 'left center',
//         animation: gsap.from(animEls, {
//           y: -130,
//           opacity: 0,
//           duration: 1.5,
//           ease: 'elastic.out(1,0.4)',
//           stagger: 0.1,
//           force3D: true,
//         })
//       });
//       slideTriggers.push(st); // <-- CAPTURE IT
//     });

//     return () => {
//       gsap.set(track, { x: 0 });
//       // FIX: Kill only the component's triggers
//       if (mainScrollTrigger) mainScrollTrigger.kill();
//       slideTriggers.forEach(t => t.kill());
//     };
//   }, [watches, isMobile]);


//   // --- Conditional Render Start ---
  
//   // Render Carousel for Mobile/Small Screens
//   if (isMobile) {
//     return (
//       <section className="ws-container relative py-16 bg-white overflow-hidden">
//         {/* Header (adjusted for static rendering on mobile) */}


//  {/* Header */}
//  {/* <div ref={headerRef} className="flex items-end justify-between mb-12"> */}
//         <div className="flex-1">
//         <h2 className="font-title text-2xl sm:text-3xl md:text-4xl">
//           <TypewriterHeading
//             lines={["Featured Watches"]}
//             charsPerSecond={30}
//             showDots={false}
//             loop={false}
//             triggerOnScroll={true}
//             className="font-title text-2xl sm:text-3xl md:text-4xl"
//           />
//         </h2>
//         {/* </div> */}






//           <MagneticButton
//             href="/buy"
//             variant="secondary"
//             className="group"
//           >
//             <span className="flex items-center gap-2 pr-2">
//               View Collection
//               <svg
//                   className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//             </span>
//           </MagneticButton>
//         </div>

//         {/* Carousel Implementation */}
//         <Carousel className="w-full mt-8">
//           <CarouselContent>
//             {watches.map((watch, i) => (
//               <CarouselItem key={watch.id} className="pt-4">
//                 {/* Use the SlideContent structure */}
//                 <SlideContent watch={watch} /> 
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           {/* Navigation buttons are placed outside the slide content container */}
//           <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 size-8" />
//           <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 size-8" />
//         </Carousel>
//       </section>
//     );
//   } 

//   return (
//     <section
//       ref={containerRef}
// // MODIFIED: Allow horizontal scrolling on mobile, hide on desktop (where GSAP takes over)
//       className="relative overflow-hidden min-h-screen bg-white md:overflow-hidden" 
//     >
//       {/* Background elements are fine */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
//         <div className="absolute bottom-20 left-20 w-80 h-80 bg-offwhite/5 rounded-full blur-3xl" />
//       </div>

//       {/* Header and Controls */}
//       <div className="absolute top-0 left-0 right-0 z-30 p-8 md:p-12">
//         <div className="flex items-start justify-between">
//           <div className="max-w-md">
//           <h2 className="font-title font-bold text-4xl md:text-5xl text-white mb-4">
//             <TypewriterHeading
//               lines={["Featured Watches"]}
//               charsPerSecond={40}
//               showDots={false}
//               loop={false}
//               triggerOnScroll={false}
//               className="font-title font-bold text-4xl md:text-5xl text-white mb-4" // Changed text-offwhite to text-white for clarity
//             />
//           </h2>
//           </div>

//           <MagneticButton
//             href="/buy"
//             variant="secondary"
//             className="group"
//           >
//             <span className="flex items-center gap-2 pr-2">
//               View Collection
//               <svg
//                   className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg> */}
//             </span>
//           </MagneticButton>
//         </div>
//       </div>

//       {/* Horizontal Track */}
//       <div
//         ref={trackRef}
//        // MODIFIED: Added utility classes to ensure native horizontal scrolling works on mobile
//         className="watch-track flex items-center h-full w-full overflow-x-scroll md:overflow-x-visible"
//         style={{
//           width: 'max-content',
//           willChange: 'transform',
//           transform: 'translate3d(0, 0, 0)'
//         }}
//       >
//         {watches.map((watch, i) => (
//           <div
//             key={watch.id}
//             ref={el => (el ? (slidesRef.current[i] = el) : null)}
//             // 👈 Dynamic Background Class Applied Here
//             // w-[50vw] md:w-[50w] lg:w-[50vw]
//             className={
//               `watch-slide flex-none w-[90vw] md:w-[60vw] lg:w-[60vw] h-[65vh] flex items-center justify-center`
//             }
//           >
//             <SlideContent watch={watch} />


// {/*             
//             <div className="w-full h-full max-w-8xl mx-auto px-8 md:px-12 bg-stone-200">
//             <Link
//               to={`/watch/${watch.slug}`}
//               className="group block w-full max-w-8xl mx-auto"
//             >
//               <div className="grid  md:grid-cols-2 gap-8 md:gap-16 items-center pt-16 pb-20">

                
//                 <div className="relative border border-black/10 rounded-2xl">
//                   <div className="watch-image relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-offwhite/10 to-transparent backdrop-blur-sm border border-offwhite/10">
//                     <img
//                       src={watch.imageUrl}
//                       alt={`${watch.brand} ${watch.name}`}
//                       className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
//                     />

                    
//                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                   </div>

                  
//                   <div className="watch-badge absolute -top-4 -right-4 bg-gold text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg">
//                     {watch.condition}
//                   </div>

                 
//                   <div className={`absolute -bottom-6 left-6 right-6 backdrop-blur-md rounded-xl p-4 border border-black/40`}>
//                     <div className="text-medium  text-center">

//                       <span className="opacity-90 font-medium">Ref. {watch.reference}</span>
//                     </div>
//                   </div>
//                 </div>

                
//                 <div className="watch-content space-y-6 md:space-y-8">
//                   <div className="space-y-4">
//                     <div className="font-sans text-gold text-lg font-semibold tracking-wide">
//                       {watch.brand}
//                     </div>
                    
//                     <h2 className={`font-title text-3xl md:text-5xl leading-tight ${watch.textColor}`}>
//                       {watch.name}
//                     </h2>
                    

//                   </div>

//                   <div className="flex gap-4">
//                     <MagneticButton
//                       href={`/watch/${watch.slug}`}
//                       variant="primary"
//                       className="text-sm"
//                     >
//                       Details
//                     </MagneticButton>
//                     <MagneticButton
//                       href="https://wa.me/971501234567" 
//                       variant="secondary"
//                       className="text-sm"
//                       target="_blank" // <--- Recommended addition
//                       rel="noopener noreferrer" // <--- Recommended addition
//                     >
//                       Inquire
//                     </MagneticButton>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div> */}
//           </div>
//         ))}
//       </div>

//       {/* Footer Controls */}
//       <div className="absolute bottom-0 left-0 right-0 z-30 p-8 md:p-12">
//         <div className="flex items-center justify-between">
//           <div className="flex-1 max-w-xs">
//             {/* Removed progress bar and counter for a cleaner, more minimal look */}
//           </div>

//           <div className="hidden md:flex items-center gap-3 text-white/50 text-sm"> {/* Changed text-offwhite/50 to text-white/50 */}
//             <span>Scroll to explore</span>
//             <div className="flex gap-1">
//               <div className="w-1 h-6 bg-white/20 rounded-full overflow-hidden">
//                 <div className="w-full h-2 bg-gold rounded-full animate-bounce" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



// client/components/HorizontalWatchShowcase.tsx
import React from 'react';
import TypewriterHeading from './TypewriterHeading';
import MagneticButton from './MagneticButton';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

// Removed: gsap.registerPlugin(ScrollTrigger);

interface Watch {
  id: string;
  name: string;
  brand: string;
  price: string;
  imageUrl: string;
  slug: string;
  year: string;
  movement: string;
  reference: string;
  condition: string;
  bgColor: string;   
  textColor: string; 
}

interface Props {
  watches: Watch[];
}


// Removed: MIN_DESKTOP_WIDTH since we no longer need the distinction

function SlideContent({ watch }: { watch: Watch }) {
    // Extracted the common slide content into a reusable component
    // MODIFIED: Changed bg-stone-200 to bg-card/50 for a theme-consistent look
    return (
        <div className="w-full h-full max-w-8xl mx-auto px-8 md:px-12 bg-card/50 rounded-2xl"> 
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center pt-16 pb-20">

                {/* Image Section */}
                <div className="relative border border-white/10 rounded-2xl group">
                  <div className="watch-image relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-offwhite/10 to-transparent backdrop-blur-sm border border-offwhite/10">
                    <img
                      src={watch.imageUrl}
                      alt={`${watch.brand} ${watch.name}`}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Minimalistic Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Badge */}
                  <div className="watch-badge absolute -top-4 -right-4 bg-primary text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    {watch.condition}
                  </div>

                  {/* Details Bar */}
                  <div className={`absolute -bottom-6 left-6 right-6 backdrop-blur-md rounded-xl p-4 border border-black/40`}>
                    <div className="text-medium  text-center">
                      <span className="opacity-90 font-medium text-offwhite">Ref. {watch.reference}</span>
                    </div>
                  </div>
                </div>

                {/* Text Content Section */}
                <div className="watch-content space-y-6 md:space-y-8">
                  <div className="space-y-4">
                    <div className="font-sans text-gold text-lg font-semibold tracking-wide">
                      {watch.brand}
                    </div>
                    <h3 className={`font-title text-3xl md:text-5xl leading-tight text-white`}>
                      {watch.name}
                    </h3>
                  </div>

                  <div className="flex gap-4">
                    <MagneticButton
                      href={`/watch/${watch.slug}`}
                      variant="primary"
                      className="text-sm"
                    >
                      Details
                    </MagneticButton>


                    <MagneticButton
                      href="https://wa.me/971545056156" 
                      variant="secondary"
                      className="text-sm"
                      target="_blank" 
                      rel="noopener noreferrer" 
                    >
                      Inquire
                    </MagneticButton>
                  </div>
                </div>
              </div>
          </div>
    );
}



export default function HorizontalWatchShowcase({ watches }: Props) {
  // Removed: containerRef, trackRef, slidesRef, progressRef, counterRef, totalRef, headerRef, isMobile state
  // Removed: useEffect and useLayoutEffect containing GSAP logic

  return (
    <section 
      // Changed base class from min-h-screen bg-white to use ws-container for standard padding
      className="ws-container relative py-28 md:py-32 overflow-hidden bg-transparent" 
    >

      {/* Header and Controls (Unified for all screens) */}
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div className="max-w-md">
          <h2 className="font-title font-bold text-3xl md:text-5xl text-white relative z-10">
            <TypewriterHeading
              lines={["Featured Watches"]}
              charsPerSecond={40}
              showDots={false}
              loop={false}
              triggerOnScroll={false} // Re-enabled for scroll effect if placed far down the page
              className="font-title font-bold text-3xl md:text-5xl text-white"
            />
          </h2>
        </div>

        <MagneticButton
          href="/buy"
          variant="secondary"
          className="group"
        >
          <span className="flex items-center gap-2 pr-2">
            View Collection
            <svg
                className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
          </span>
        </MagneticButton>
      </div>

      {/* Carousel Implementation (Used unconditionally) */}
      <Carousel className="w-full mt-8">
        <CarouselContent>
          {watches.map((watch, i) => (
            // Adjusted padding to look better on a grid item
            <CarouselItem key={watch.id} className="pl-4 basis-full md:basis-5/6 lg:basis-3/4"> 
              <SlideContent watch={watch} /> 
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Navigation buttons are placed outside the slide content container */}
        <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 z-10 size-10 bg-black/50 text-white border-white/20 hover:bg-primary" />
        <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 z-10 size-10 bg-black/50 text-white border-white/20 hover:bg-primary" />
      </Carousel>
      
      {/* Removed Footer Controls */}

    </section>
  );
}