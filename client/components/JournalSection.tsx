// components/JournalSection.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import TypewriterHeading from './TypewriterHeading';
import MagneticBlogCard from './MagneticBlogCard';
import MagneticButton from './MagneticButton';
import { Article } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

interface JournalSectionProps {
  posts: Article[];
  showFeatured?: boolean;
}

export default function JournalSection({ posts, showFeatured = true }: JournalSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    // Section reveal animation
    gsap.fromTo([header, grid],
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        }
      }
    );

    // Parallax effect for section
    gsap.to(section, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="ws-container mt-32 mb-24 relative"
    >
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-carbon/10 rounded-full blur-3xl" />
      
      {/* Header */}
      <div ref={headerRef} className="flex items-end justify-between mb-12">
        <div className="flex-1">
          <TypewriterHeading
            lines={["From the Journal"]}
            charsPerSecond={30}
            showDots={false}
            loop={false}
            triggerOnScroll={true}
            className="font-title text-3xl md:text-4xl"
          />
          <p className="text-offwhite/70 mt-4 max-w-2xl">
            Explore the artistry, heritage, and stories behind the world's finest timepieces. 
            Our curated insights into horology, craftsmanship, and watch culture.
          </p>
        </div>
        
        <MagneticButton 
          href="/blog" 
          variant="secondary"
          className="hidden md:block"
        >
          <span className="flex items-center gap-2">
            Read all stories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </MagneticButton>
      </div>
      
      {/* Blog Grid */}
      <div 
        ref={gridRef}
        className={`
          grid gap-8 
          ${showFeatured 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }
        `}
      >
        {posts.map((post, index) => (
          <MagneticBlogCard
            key={post.id}
            post={post}
            index={index}
            variant={showFeatured && index === 0 ? 'featured' : 'grid'}
          />
        ))}
      </div>
      
      {/* Mobile "Read More" Button */}
      <div className="flex justify-center mt-12 md:hidden">
        <MagneticButton 
          href="/blog" 
          variant="primary"
        >
          Read all stories
        </MagneticButton>
      </div>
    </section>
  );
}
