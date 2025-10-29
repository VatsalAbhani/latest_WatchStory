


// client/components/MagneticBlogCard.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Article } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

type BlogPost = Article & {
  // Add externalUrl from the data interface
  externalUrl?: string; // This is crucial for determining the link type
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
  headingTag?: 'h2' | 'h3';
}

export default function MagneticBlogCard({ 
  post, 
  index, 
  variant = 'grid',
  headingTag: HeadingTag = 'h3'
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
    // ... (Your existing GSAP/Magnetic logic remains the same) ...

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
    const xTo = gsap.quickTo(card, "x", { duration: 0.6, ease: "power2.out" }); 
    const yTo = gsap.quickTo(card, "y", { duration: 0.6, ease: "power2.out" });

    // Initial state setup
    gsap.set(overlay, { scaleY: 0, transformOrigin: "bottom" });
    gsap.set(glow, { scale: 0.8, opacity: 0 });
    gsap.set([title, excerpt, meta], { y: 0, opacity: 1 });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = card.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.15);
      yTo(y * 0.15);
    };

    const handleMouseEnter = () => {
      const tl = gsap.timeline();
      
      tl.to(card, {
        rotationY: 2,
        rotationX: 1,
        duration: 0.6,
        ease: "power3.out"
      })
      .to(image, {
        duration: 1.2,
        ease: "power3.out"
      }, 0)
      .to(overlay, {
        scaleY: 1,
        duration: 0.8,
        ease: "power3.out"
      }, 0.1)
      .to(glow, {
        scale: 1,
        opacity: 0.6,
        duration: 1,
        ease: "power2.out"
      }, 0);
    };

    const handleMouseLeave = () => {
      const tl = gsap.timeline();
      
      xTo(0);
      yTo(0);

      tl.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(image, {
        duration: 0.8,
        ease: "power2.out"
      }, 0)
      .to(overlay, {
        scaleY: 0,
        duration: 0.6,
        ease: "power2.out"
      }, 0.1)
      .to(glow, {
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

  // --- CORRECTED LINKING LOGIC ---
  const isExternal = !!post.externalUrl;
  const destinationUrl = isExternal ? post.externalUrl : `/blog/${post.slug}`;

  // Render correct tag (Link or a) with explicit props to satisfy TypeScript
  // ------------------------------

  // The content of the card to be wrapped
  const cardContent = (
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
        className="absolute -inset-2 bg-gradient-radial from-platinum/30 via-transparent to-transparent blur-xl -z-10"
      />
      
      {/* Image container */}
      <div className="relative h-64 md:h-72 overflow-hidden rounded-lg will-change-transform">
        <div 
          ref={imageRef}
          className="w-full h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        
        {/* Dark overlay for text contrast */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-brand-carbon/90 via-brand-carbon/40 to-transparent"
        />
        
        {/* Category tag */}
        <div className="absolute top-4 z-10">
          <span className="px-3 py-1 text-xs font-semibold text-platinum bg-white/90 backdrop-blur-sm rounded-tag border border-primary">
            {category}
          </span>
        </div>
      </div>
      
      {/* Content overlay */}
      <div 
        ref={contentRef}
        className="absolute bottom-0 left-0 top-44 right-0 p-6 text-white z-20"
      >
        <HeadingTag
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
        </HeadingTag>
        
        {/* <p 
          ref={excerptRef}
          className="text-offwhite/80 text-sm md:text-base mb-4 line-clamp-2"
        >
          {post.excerpt}
        </p> */}
        
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
        <div className="w-8 h-8 rounded-full bg-offwhite/80 backdrop-blur-sm flex items-center justify-center">
          <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </article>
  );

  return (
    <>
      {/* Conditionally render the Link or Anchor tag wrapper */}
      {isExternal ? (
        <a
          className="block"
          href={destinationUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {cardContent}
        </a>
      ) : (
        <Link
          className="block"
          to={destinationUrl}
        >
          {cardContent}
        </Link>
      )}
    </>
  );
}