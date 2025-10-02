// // HorizontalWatchShowcase.tsx
// import React, { useRef, useLayoutEffect } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Link } from 'react-router-dom';
// import TypewriterHeading from './TypewriterHeading';
// import MagneticButton from './MagneticButton';

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
// }

// interface HorizontalWatchShowcaseProps {
//   watches: Watch[];
// }

// export default function HorizontalWatchShowcase({ 
//   watches 
// }: HorizontalWatchShowcaseProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);
//   const watchesRef = useRef<HTMLDivElement[]>([]);
//   const progressRef = useRef<HTMLDivElement>(null);
//   const counterRef = useRef<HTMLSpanElement>(null);
//   const totalRef = useRef<HTMLSpanElement>(null);
//   const slides = useRef<HTMLDivElement[]>([]);

//   // Use useLayoutEffect to ensure DOM is measured before animations run
//   useLayoutEffect(() => {
//     const container = containerRef.current;
//     const track = trackRef.current;
//     const progressBar = progressRef.current;
//     const counter = counterRef.current;
//     const total = totalRef.current;

//     if (!container || !track || !progressBar || !counter || !total) {
//       console.error("Missing refs for horizontal showcase.");
//       return;
//     }

//     // Clear previous ScrollTriggers to prevent duplicates on re-render
//     ScrollTrigger.getAll().forEach(trigger => trigger.kill());

//     // Set total count
//     if (totalRef.current) {
//         totalRef.current.textContent = watches.length.toString().padStart(2, '0');
//       }
//       if (counterRef.current) counterRef.current.textContent = '01';




//     // Calculate the total horizontal width
//     const trackWidth = track.scrollWidth;
//     const viewportWidth = track.clientWidth;
//     const distanceToScroll = trackWidth - viewportWidth;


//     console.log('scrollWidth', track.scrollWidth, 
//         'clientWidth', track.clientWidth, 
//         'distance', distanceToScroll);


//     console.log({
//         trackScrollWidth: track.scrollWidth,
//         trackClientWidth: track.clientWidth,
//         slideCount: watches.length
//       });

//     if (distanceToScroll <= 0) {
//       console.log("Content fits without scrolling.");
//       return;
//     }

//     // Main horizontal scroll animation
//     const horizontalScroll = gsap.to(track, {
//       x: -distanceToScroll,
//       ease: "none",
//       scrollTrigger: {
//         trigger: container,
//         start: "top left",
//         pin: true,
//         anticipatePin: 1,
//         scrub: 1,
//         end: `+=${distanceToScroll}`,
//         markers: true,
//         // markers: true, // Uncomment for debugging
//         onUpdate: (self) => {
//           // Update progress bar
//           gsap.set(progressBar, { scaleX: self.progress });
          
//           // Update counter based on scroll progress
//           const currentWatch = Math.floor(self.progress * watches.length) + 1;
//           const clampedWatch = Math.min(Math.max(currentWatch, 1), watches.length);
//           counter.textContent = clampedWatch.toString().padStart(2, '0');
//         },
//       }
//     });

//     // Individual watch animations as they come into view
//     watchesRef.current.forEach((watchEl, index) => {
//       if (!watchEl) return;
//       const image = watchEl.querySelector('.watch-image') as HTMLElement;
//       const content = watchEl.querySelector('.watch-content') as HTMLElement;
//       const badge = watchEl.querySelector('.watch-badge') as HTMLElement;

//       if (image && content && badge) {
//         // Parallax effect for watch images
//         gsap.fromTo(image,
//           { scale: 1.2, opacity: 0.8 },
//           {
//             scale: 1,
//             opacity: 1,
//             ease: "elastic",
//             scrollTrigger: {
//               trigger: watchEl,
//               containerAnimation: horizontalScroll,
//               start: "left 80%",
//               end: "left 20%",
//               scrub: true,
//             }
//           }
//         );

//         // Content reveal animation
//         gsap.fromTo(content.children,
//           { y: 60, opacity: 0, stagger: 0.1 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 1,
//             stagger: 0.1,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: watchEl,
//               containerAnimation: horizontalScroll,
//               start: "left 70%",
//               end: "left 30%",
//               toggleActions: "play reverse play reverse",
//             }
//           }
//         );

//         // Badge animation
//         gsap.fromTo(badge,
//           { scale: 0, rotation: -180 },
//           {
//             scale: 1,
//             rotation: 0,
//             duration: 0.8,
//             ease: "back.out(1.7)",
//             scrollTrigger: {
//               trigger: watchEl,
//               containerAnimation: horizontalScroll,
//               start: "left 60%",
//               end: "left 40%",
//               toggleActions: "play reverse play reverse",
//             }
//           }
//         );
//       }
//     });

//     // Cleanup function
//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, [watches]);

//   return (
//     <section 
//       ref={containerRef}
//       className="relative h-screen w-full overflow-hidden"
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
//         <div className="absolute bottom-20 left-20 w-80 h-80 bg-offwhite/5 rounded-full blur-3xl" />
//       </div>

//       {/* Fixed Header */}
//       <div className="absolute top-0 left-0 right-0 z-30 p-8 md:p-12">
//         <div className="flex items-start justify-between">
//           <div className="max-w-md">
//             <TypewriterHeading
//               lines={["Featured Stories"]}
//               charsPerSecond={40}
//               showDots={false}
//               loop={false}
//               triggerOnScroll={true}
//               className="font-title text-4xl md:text-5xl text-offwhite mb-4"
//             />
//             <p className="text-offwhite/70 text-lg leading-relaxed">
//               Discover exceptional timepieces from the world's most prestigious watchmakers. 
//               Each watch tells a unique story of craftsmanship and heritage.
//             </p>
//           </div>
          
//           <MagneticButton 
//             href="/buy" 
//             variant="secondary"
//             className="hidden md:block"
//           >
//             <span className="flex items-center gap-2">
//               View Collection
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </span>
//           </MagneticButton>
//         </div>
//       </div>

//       {/* Horizontal Scrolling Track */}
//       <div 
//         ref={trackRef}
//         className="watch-track items-center h-full pl-8 md:pl-12"
//         style={{ 
//           willChange: 'transform',
//           transform: 'translate3d(0, 0, 0)'
//         }}
//       >
//         {watches.map((watch, i) => (
//             <div
//             key={watch.id}
//             className={`watch-slide ${i === watches.length - 1 ? 'mr-0' : ''}`}
//           >
//             <Link 
//               to={`/buy/${watch.slug}`}
//               className="group block w-full max-w-6xl mx-auto"
//             >
//               <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center h-full py-20">
//                 {/* Watch Image */}
//                 <div className="relative">
//                   <div className="watch-image relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-offwhite/10 to-transparent backdrop-blur-sm border border-offwhite/10">
//                     <img
//                       src={watch.imageUrl}
//                       alt={`${watch.brand} ${watch.name}`}
//                       className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
//                     />
                    
//                     {/* Luxury glow overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-brand-carbon/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                   </div>

//                   {/* Condition Badge */}
//                   <div className="watch-badge absolute -top-4 -right-4 bg-gold text-brand-carbon px-4 py-2 rounded-full font-bold text-sm shadow-lg">
//                     {watch.condition}
//                   </div>

//                   {/* Floating Details */}
//                   <div className="absolute -bottom-6 left-6 right-6 bg-offwhite/10 backdrop-blur-md rounded-xl p-4 border border-offwhite/10">
//                     <div className="flex justify-between items-center text-sm text-offwhite/80">
//                       <span>{watch.year}</span>
//                       <span>{watch.movement}</span>
//                       <span>Ref. {watch.reference}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Watch Information */}
//                 <div className="watch-content space-y-6 md:space-y-8">
//                   <div className="space-y-4">
//                     <div className="text-gold text-lg font-semibold tracking-wide">
//                       {watch.brand}
//                     </div>
//                     <h2 className="font-title text-4xl md:text-6xl text-offwhite leading-tight">
//                       {watch.name}
//                     </h2>
//                     <div className="text-2xl md:text-3xl text-offwhite font-light">
//                       {watch.price}
//                     </div>
//                   </div>

//                   <div className="flex gap-4">
//                     <MagneticButton 
//                       href={`/buy/${watch.slug}`} 
//                       variant="primary"
//                     >
//                       View Details
//                     </MagneticButton>
//                     <MagneticButton 
//                       href="/contact" 
//                       variant="secondary"
//                     >
//                       Inquire
//                     </MagneticButton>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>

//       {/* Fixed Footer with Progress */}
//       <div className="absolute bottom-0 left-0 right-0 z-30 p-8 md:p-12">
//         <div className="flex items-center justify-between">
//           {/* Progress Bar */}
//           <div className="flex-1 max-w-xs">
//             <div className="h-px bg-offwhite/20 relative">
//               <div 
//                 ref={progressRef}
//                 className="h-full bg-gold origin-left scale-x-0"
//               />
//             </div>
//           </div>

//           {/* Counter */}
//           <div className="text-offwhite/70 font-mono text-lg ml-8">
//             <span ref={counterRef}>01</span>
//             <span className="mx-2">/</span>
//             <span ref={totalRef}>00</span>
//           </div>

//           {/* Scroll Indicator */}
//           <div className="hidden md:flex items-center gap-3 text-offwhite/50 text-sm">
//             <span>Scroll to explore</span>
//             <div className="flex gap-1">
//               <div className="w-1 h-6 bg-offwhite/20 rounded-full overflow-hidden">
//                 <div className="w-full h-2 bg-gold rounded-full animate-bounce" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


























// // HorizontalWatchShowcase.tsx
// import React, { useRef, useLayoutEffect } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Link } from 'react-router-dom';
// import TypewriterHeading from './TypewriterHeading';
// import MagneticButton from './MagneticButton';

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
// }

// interface Props {
//   watches: Watch[];
// }

// export default function HorizontalWatchShowcase({ watches }: Props) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const slidesRef = useRef<HTMLDivElement[]>([]);
//   const progressRef = useRef<HTMLDivElement>(null);
//   const counterRef = useRef<HTMLSpanElement>(null);
//   const totalRef = useRef<HTMLSpanElement>(null);

//   useLayoutEffect(() => {
//     const container = containerRef.current;
//     const slides = slidesRef.current;
//     if (!container || slides.length === 0) return;

//     // Clear any existing triggers
//     ScrollTrigger.getAll().forEach(t => t.kill());

//     // Initialize counters
//     totalRef.current!.textContent = watches.length.toString().padStart(2, '0');
//     counterRef.current!.textContent = '01';

//     // Create horizontal scroll tween
//     const tween = gsap.to(slidesRef, {
//       xPercent: -100 * (slidesRef.current.length - 1),
//       ease: 'none',
//       scrollTrigger: {
//         trigger: container,
//         pin: true,
//         scrub: 1,
//         end: () => `+=${container.offsetWidth * (slidesRef.current.length - 1)}`,
//         markers: true,
//         onUpdate(self) {
//           // progress bar
//           gsap.set(progressRef.current, { scaleX: self.progress });
//           // counter
//           const idx = Math.floor(self.progress * slides.length);
//           const current = Math.min(idx + 1, slides.length);
//           counterRef.current!.textContent = current.toString().padStart(2, '0');
//         }
//       }
//     });

//     // Animate text in each slide
//     slides.forEach(slide => {
//       const animEls = slide.querySelectorAll<HTMLElement>('.anim');
//       if (!animEls.length) return;
//       gsap.from(animEls, {
//         y: -130,
//         opacity: 0,
//         duration: 1.5,
//         ease: 'elastic.out(1,0.4)',
//         stagger: 0.1,
//         scrollTrigger: {
//           containerAnimation: tween,
//           trigger: slide,
//           start: 'left center',
//           markers: true
//         }
//       });
//     });

//     return () => ScrollTrigger.getAll().forEach(t => t.kill());
//   }, [watches]);

//   return (
//     <section className="relative h-screen w-full overflow-hidden">
//       <div ref={containerRef} className="watch-track h-full">
//         {watches.map((watch, i) => (
//           <div
//             key={watch.id}
//             ref={el => (el ? (slidesRef.current[i] = el) : null)}
//             className="watch-slide flex flex-col items-center justify-center px-8"
//           >
//             <TypewriterHeading
//               lines={[watch.brand, watch.name]}
//               charsPerSecond={40}
//               showDots={false}
//               loop={false}
//               triggerOnScroll={false}
//               className="font-title text-4xl text-offwhite mb-4 anim"
//             />
//             <p className="text-offwhite/70 mb-4 anim">{watch.price}</p>
//             <MagneticButton href={`/buy/${watch.slug}`} variant="primary" className="anim">
//               View Details
//             </MagneticButton>
//           </div>
//         ))}
//       </div>

//       {/* Progress Bar */}
//       <div className="absolute bottom-6 left-6 right-6 h-px bg-offwhite/20">
//         <div ref={progressRef} className="h-full bg-gold origin-left scale-x-0" />
//       </div>

//       {/* Counter */}
//       <div className="absolute bottom-6 right-6 text-offwhite font-mono text-lg">
//         <span ref={counterRef}>01</span>/<span ref={totalRef}>00</span>
//       </div>
//     </section>
//   );
// }



































// new

// HorizontalWatchShowcase.tsx
// HorizontalWatchShowcase.tsx
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import TypewriterHeading from './TypewriterHeading';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

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
}

interface Props {
  watches: Watch[];
}

export default function HorizontalWatchShowcase({ watches }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const slides = slidesRef.current;

    if (!container || !track || slides.length === 0) return;

    // ScrollTrigger.getAll().forEach(t => t.kill());

    const total = totalRef.current;
    if (total) {
      total.textContent = watches.length.toString().padStart(2, '0');
    }

    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const distanceToScroll = trackWidth - viewportWidth;

    if (distanceToScroll <= 0) {
      return;
    }

    // Main horizontal scroll animation
    const tween = gsap.to(track, {
      x: -distanceToScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        pinType: 'transform',
        pinSpacing: true,
        scrub: 1,
        end: `+=${distanceToScroll}`,
        onUpdate(self) {
          const progressBar = progressRef.current;
          if (progressBar) {
            gsap.set(progressBar, { scaleX: self.progress });
          }

          const counter = counterRef.current;
          if (counter) {
            const idx = Math.floor(self.progress * (slides.length - 1));
            const current = Math.min(idx + 1, slides.length);
            counter.textContent = current.toString().padStart(2, '0');
          }
        }
      }
    });

    // Animate text in each slide
    slides.forEach(slide => {
      const animEls = slide.querySelectorAll<HTMLElement>('.anim');
      if (!animEls.length) return;
      gsap.from(animEls, {
        y: -130,
        opacity: 0,
        duration: 1.5,
        ease: 'elastic.out(1,0.4)',
        stagger: 0.1,
        scrollTrigger: {
          containerAnimation: tween,
          trigger: slide,
          start: 'left center',
          pin: true,
          pinType: 'fixed',  
          pinSpacing: true,
        }
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [watches]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-offwhite/5 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-0 left-0 right-0 z-30 p-8 md:p-12">
        <div className="flex items-start justify-between">
          <div className="max-w-md">
            <TypewriterHeading 
              lines={["Featured Stories"]}
              charsPerSecond={40}
              showDots={false}
              loop={false}
              triggerOnScroll={false}
              className="font-title font-bold text-4xl md:text-5xl text-offwhite mb-4"
            />
            <p className="font-sans text-offwhite/70 text-lg leading-relaxed">
              ggggDiscover exceptional timepieces from the world's most prestigious watchmakers. 
              Each watch tells a unique story of craftsmanship and heritage.
            </p>
          </div>
          
          <MagneticButton 
            href="/buy" 
            variant="secondary"
            className="hidden md:block"
          >
            <span className="flex items-center gap-2">
              View Collection
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </MagneticButton>
        </div>
      </div>

      <div 
        ref={trackRef}
        className="watch-track flex items-center h-full pl-8 md:pl-12"
        style={{ 
          width: 'max-content',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        {watches.map((watch, i) => (
          <div
            key={watch.id}
            ref={el => (el ? (slidesRef.current[i] = el) : null)}
            className="watch-slide flex-none w-[90vw] md:w-[60vw] lg:w-[50vw] h-full flex items-center justify-center px-6 md:px-10"
          >
            <Link 
              to={`/buy/${watch.slug}`}
              className="group block w-full max-w-6xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center h-full py-20">
                <div className="relative">
                  <div className="watch-image relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-offwhite/10 to-transparent backdrop-blur-sm border border-offwhite/10">
                    <img
                      src={watch.imageUrl}
                      alt={`${watch.brand} ${watch.name}`}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-carbon/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="watch-badge absolute -top-4 -right-4 bg-gold text-brand-carbon px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    {watch.condition}
                  </div>

                  <div className="absolute -bottom-6 left-6 right-6 bg-offwhite/10 backdrop-blur-md rounded-xl p-4 border border-offwhite/10">
                    <div className="flex justify-between items-center text-sm text-offwhite/80">
                      <span>{watch.year}</span>
                      <span>{watch.movement}</span>
                      <span>Ref. {watch.reference}</span>
                    </div>
                  </div>
                </div>

                <div className="watch-content space-y-6 md:space-y-8">
                  <div className="space-y-4">
                    <div className="text-gold text-lg font-semibold tracking-wide">
                      {watch.brand}
                    </div>
                    <h2 className="font-title text-4xl md:text-6xl text-offwhite leading-tight">
                      {watch.name}
                    </h2>
                    <div className="text-2xl md:text-3xl text-offwhite font-light">
                      {watch.price}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MagneticButton 
                      href={`/buy/${watch.slug}`} 
                      variant="primary"
                    >
                      View Details
                    </MagneticButton>
                    <MagneticButton 
                      href="/contact" 
                      variant="secondary"
                    >
                      Inquire
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 p-8 md:p-12">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-xs">
            <div className="h-px bg-offwhite/20 relative">
              <div 
                ref={progressRef}
                className="h-full bg-gold origin-left scale-x-0"
              />
            </div>
          </div>

          <div className="text-offwhite/70 font-mono text-lg ml-8">
            <span ref={counterRef}>01</span>/<span ref={totalRef}>00</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-offwhite/50 text-sm">
            <span>Scroll to explore</span>
            <div className="flex gap-1">
              <div className="w-1 h-6 bg-offwhite/20 rounded-full overflow-hidden">
                <div className="w-full h-2 bg-gold rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}