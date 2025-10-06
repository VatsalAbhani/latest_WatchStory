// client/components/HorizontalWatchShowcase.tsx
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

    // --- FIX 1: Clear existing triggers and force scroll to top on mount ---
    ScrollTrigger.getAll().forEach(t => t.kill());
    // Use window.scrollTo for a hard scroll reset (needed for re-entering from another page)
    window.scrollTo(0, container.offsetTop); 
    // ---------------------------------------------------------------------

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
        }
      });
    });

    // --- FIX 2: Crucial cleanup function ---
    return () => {
      // Manually reset horizontal position before killing the trigger
      gsap.set(track, { x: 0 }); 
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
    // ---------------------------------------
  }, [watches]);

  return (
    <section 
      ref={containerRef} 
      className="relative overflow-hidden"
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
            {/* <p className="font-sans text-offwhite/70 text-sm leading-relaxed">
              Discover exceptional timepieces from the world's most prestigious watchmakers. 
              Each watch tells a unique story of craftsmanship and heritage.
            </p> */}
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
        {/* <p className="font-sans text-offwhite/70 text-sm leading-relaxed">
              Discover exceptional timepieces from the world's most prestigious watchmakers. 
              Each watch tells a unique story of craftsmanship and heritage.
            </p> */}
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
            className="watch-slide flex-none w-[90vw] md:w-[60vw] lg:w-[50vw] flex items-center justify-center px-6 md:px-10"
          >
            <Link 
              to={`/buy/${watch.slug}`}
              className="group block w-full max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center pt-32 pb-20">
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
                    <h2 className="font-title text-3xl md:text-5xl text-offwhite leading-tight">
                      {watch.name}
                    </h2>
                    <div className="text-1xl md:text-2xl text-offwhite font-light">
                      {watch.price}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MagneticButton 
                      href={`/buy/${watch.slug}`} 
                      variant="primary"
                      className="text-sm"
                    >
                      Details
                    </MagneticButton>
                    <MagneticButton 
                      href="/contact" 
                      variant="secondary"
                      className="text-sm"
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
            {/* <div className="h-px bg-offwhite/20 relative">
              <div 
                ref={progressRef}
                className="h-full bg-gold origin-left scale-x-0"
              />
            </div> */}
          </div>

          {/* <div className="text-offwhite/70 font-mono text-lg ml-8">
            <span ref={counterRef}>01</span>/<span ref={totalRef}>00</span>
          </div> */}

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