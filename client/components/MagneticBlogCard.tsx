// components/MagneticBlogCard.tsx
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Article } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

type BlogPost = Article & {
  // Derived/optional presentation fields
  author?: string;
  readingTime?: string;
  imageUrl?: string;
  category?: string;
};

interface MagneticBlogCardProps {
  post: BlogPost;
  index: number;
  variant?: 'grid' | 'featured';
}

export default function MagneticBlogCard({ 
  post, 
  index, 
  variant = 'grid' 
}: MagneticBlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const excerptRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const excerpt = excerptRef.current;
    const meta = metaRef.current;
    const glow = glowRef.current;

    if (!card || !image || !overlay || !content || !title || !excerpt || !meta || !glow) return;

    // Magnetic effect with performance optimization
    // const xTo = gsap.quickTo(card, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    // const yTo = gsap.quickTo(card, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });


    const xTo = gsap.quickTo(card, "x", { duration: 0.6, ease: "power2.out" }); 
    const yTo = gsap.quickTo(card, "y", { duration: 0.6, ease: "power2.out" });

    // Initial state setup
    // gsap.set([title, excerpt, meta], { y: 20, opacity: 0 });
    gsap.set(overlay, { scaleY: 0, transformOrigin: "bottom" });
    gsap.set(glow, { scale: 0.8, opacity: 0 });

        // Add default positioning for the text so it starts visible at y=0
    // This overrides the previous gsap.set y: 20 which would look odd if opacity: 1
    gsap.set([title, excerpt, meta], { y: 0, opacity: 1 });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = card.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Reduced magnetic strength for elegance
      xTo(x * 0.15);
      yTo(y * 0.15);
    };

    const handleMouseEnter = () => {
      const tl = gsap.timeline();
      
      // Card elevation and glow
      tl.to(card, {
        // scale: 1.02,
        rotationY: 2,
        rotationX: 1,
        duration: 0.6,
        ease: "power3.out"
      })
      // Image zoom with overlay reveal
      .to(image, {
        // scale: 1.1,
        duration: 1.2,
        ease: "power3.out"
      }, 0)
      .to(overlay, {
        scaleY: 1,
        duration: 0.8,
        ease: "power3.out"
      }, 0.1)
      // Content reveal cascade
      // .to(title, {
      //   y: 0,
      //   opacity: 1,
      //   duration: 0.6,
      //   ease: "power3.out"
      // }, 0.2)
      // .to(excerpt, {
      //   y: 0,
      //   opacity: 1,
      //   duration: 0.6,
      //   ease: "power3.out"
      // }, 0.3)
      // .to(meta, {
      //   y: 0,
      //   opacity: 1,
      //   duration: 0.6,
      //   ease: "power3.out"
      // }, 0.4)
      // Luxury glow effect
      .to(glow, {
        scale: 1,
        opacity: 0.6,
        duration: 1,
        ease: "power2.out"
      }, 0);
    };

    const handleMouseLeave = () => {
      const tl = gsap.timeline();
      
      // Reset magnetic position
      xTo(0);
      yTo(0);

      // Reverse animations
      tl.to(card, {
        // scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(image, {
        // scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, 0)
      .to(overlay, {
        scaleY: 0,
        duration: 0.6,
        ease: "power2.out"
      }, 0.1)
      // .to([title, excerpt, meta], {
      //   y: 20,
      //   opacity: 0,
      //   duration: 0.4,
      //   stagger: 0.05,
      //   ease: "power2.out"
      // }, 0)
      .to(glow, {
        // scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, 0);
    };

    // Scroll animation for initial reveal
    gsap.fromTo(card, 
      { y: 60, opacity: 0, rotationX: 15 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        }
      }
    );

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  // Map Article fields to presentation fields with sensible defaults
  const imageUrl = post.heroImage ?? '/placeholder.svg';
  const category = (post as BlogPost).category ?? (post.brandTags?.[0] ?? 'Journal');
  const author = (post as BlogPost).author ?? 'WatchStory';
  const readingTime = (post as BlogPost).readingTime ?? '4 min read';
  const publishedDate = post.publishedAt;

  return (
    <Link to={`/blog`} className="block">
      <article 
        ref={cardRef}
        className={`
          relative group cursor-pointer
          ${variant === 'featured' 
            ? 'col-span-full md:col-span-2 lg:col-span-2' 
            : 'col-span-1'
          }
        `}
        style={{ perspective: '1000px' }}
      >
        {/* Luxury glow effect */}
        <div 
          ref={glowRef}
          className="absolute -inset-2 bg-gradient-radial from-gold/20 via-transparent to-transparent blur-xl -z-10"
        />
        
        {/* Image container */}
        <div className="relative h-64 md:h-72 overflow-hidden rounded-lg will-change-transform">
          <div 
            ref={imageRef}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          
          {/* Dark overlay for text contrast */}
          <div 
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-t from-brand-carbon/90 via-brand-carbon/40 to-transparent"
          />
          
          {/* Category tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 text-xs font-semibold text-gold bg-brand-carbon/80 backdrop-blur-sm rounded-full">
              {category}
            </span>
          </div>
        </div>
        
        {/* Content overlay */}
        <div 
          ref={contentRef}
          className="absolute bottom-0 left-0 right-0 p-6 text-white z-20"
        >
          <h3 
            ref={titleRef}
            className={`
              font-title font-bold mb-2 leading-tight
              ${variant === 'featured' 
                ? 'text-xl md:text-2xl' 
                : 'text-lg md:text-xl'
              }
            `}
          >
            {post.title}
          </h3>
          
          <p 
            ref={excerptRef}
            className="text-offwhite/80 text-sm md:text-base mb-4 line-clamp-2"
          >
            {post.excerpt}
          </p>
          
          <div 
            ref={metaRef}
            className="flex items-center justify-between text-xs text-offwhite/60"
          >
            <div className="flex items-center gap-4">
              <span>{author}</span>
              <span>•</span>
              <span>{readingTime}</span>
            </div>
            <span>{publishedDate}</span>
          </div>
        </div>
        
        {/* Read more indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
