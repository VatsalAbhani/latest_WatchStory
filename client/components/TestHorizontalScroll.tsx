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

interface HorizontalWatchShowcaseProps {
  watches: Watch[];
}

export default function HorizontalWatchShowcase({ watches }: HorizontalWatchShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slides = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    ScrollTrigger.getAll().forEach(t => t.kill());

    // Set total count
    if (totalRef.current) {
      totalRef.current.textContent = watches.length.toString().padStart(2, '0');
    }
    if (counterRef.current) counterRef.current.textContent = '01';

    // Create horizontal scroll tween on the slides
    const scrollTween = gsap.to(slides.current, {
      xPercent: -100 * (slides.current.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${container.offsetWidth * (slides.current.length - 1)}`,
        markers: true,
        onRefreshInit: (self) => {
          // ensure accurate update after refresh
          self.refresh();
        },
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: self.progress });
          }
          if (counterRef.current) {
            const idx = Math.floor(self.progress * slides.current.length);
            const current = Math.min(idx + 1, slides.current.length);
            counterRef.current.textContent = current.toString().padStart(2, '0');
          }
        }
      }
    });

    // Animate in-text elements per slide
    slides.current.forEach((slide, i) => {
      const elems = slide.querySelectorAll<HTMLElement>('.anim');
      if (!elems.length) return;
      gsap.from(elems, {
        y: -130,
        opacity: 0,
        duration: 1.5,
        ease: 'elastic.out(1,0.4)',
        stagger: 0.1,
        scrollTrigger: {
          containerAnimation: scrollTween,
          trigger: slide,
          start: 'left center',
          markers: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [watches]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div ref={containerRef} className="flex h-full">
        {watches.map((watch, i) => (
          <div
            key={watch.id}
            ref={el => el && slides.current.push(el)}
            className="flex-none w-screen flex items-center justify-center"
          >
            <div className="max-w-4xl p-8">
              <TypewriterHeading
                lines={[watch.brand, watch.name]}
                charsPerSecond={40}
                showDots={false}
                loop={false}
                triggerOnScroll={false}
                className="font-title text-4xl text-offwhite mb-4 anim"
              />
              <p className="text-offwhite/70 mb-6 anim">{watch.price}</p>
              <MagneticButton href={`/buy/${watch.slug}`} variant="primary" className="anim">
                View Details
              </MagneticButton>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-6 left-6 right-6 h-px bg-offwhite/20">
        <div ref={progressRef} className="h-full bg-gold origin-left scale-x-0" />
      </div>

      {/* Counter */}
      <div className="absolute bottom-6 right-6 text-offwhite font-mono text-lg">
        <span ref={counterRef}>01</span>/<span ref={totalRef}>00</span>
      </div>
    </section>
  );
}
