// components/MagneticButton.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function MagneticButton({ 
  children, 
  href, 
  onClick, 
  variant = 'primary',
  className = '' 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  // const magneticRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    // const magnetic = magneticRef.current;
    const text = textRef.current;
    const underline = underlineRef.current;

    if (!button || !text || !underline) return;

    // Magnetic effect with GSAP quickTo for performance
    // const xTo = gsap.quickTo(magnetic, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    // const yTo = gsap.quickTo(magnetic, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    // const handleMouseMove = (e: MouseEvent) => {
    //   const { clientX, clientY } = e;
    //   const { height, width, left, top } = button.getBoundingClientRect();
    //   const x = clientX - (left + width / 2);
    //   const y = clientY - (top + height / 2);
      
    //   xTo(x * 0.35);
    //   yTo(y * 0.35);
    // };

    const handleMouseEnter = () => {
      // Text reveal animation
      gsap.to(text, {
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      });

      // Underline expand animation
      gsap.to(underline, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out"
      });

      // Subtle glow effect
      gsap.to(button, {
        boxShadow: variant === 'primary' 
          ? '0 0 30px rgba(212, 175, 55, 0.4)' 
          : '0 0 20px rgba(240, 238, 234, 0.2)',
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      // Reset magnetic position
      // xTo(0);
      // yTo(0);

      // Reset text
      gsap.to(text, {
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      // Collapse underline
      gsap.to(underline, {
        scaleX: 0,
        duration: 0.6,
        ease: "power3.out"
      });

      // Remove glow
      gsap.to(button, {
        boxShadow: 'none',
        duration: 0.4,
        ease: "power2.out"
      });
    };

    // button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      // button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [variant]);

  const baseClasses = `
    relative overflow-hidden cursor-pointer
    font-title text-lg tracking-wide
    transition-all duration-300 ease-out
    ${variant === 'primary' 
      ? 'text-offwhite' 
      : 'text-offwhite/80'
    }
    ${className}
  `;

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={buttonRef as any}
      href={href}
      onClick={onClick}
      className={baseClasses}
    >
      {/* <div ref={magneticRef} className="relative px-8 py-4"> */}
      <div className="relative px-8 py-4">
        {/* Background gradient that appears on hover */}
        <div className={`
          absolute inset-0 opacity-0 transition-opacity duration-500
          ${variant === 'primary' 
            ? 'bg-gradient-to-r from-gold/10 to-gold/5' 
            : 'bg-gradient-to-r from-offwhite/5 to-offwhite/2'
          }
        `} />
        
        {/* Text with slide-up effect */}
        <span 
          ref={textRef}
          // Removed magnetic transform class (it was transform translate-y-0 anyway, but clean up is good)
          className="relative z-10 block transform translate-y-0"
        >
          {children}
        </span>
        
        {/* Animated underline */}
        <div 
          ref={underlineRef}
          className={`
            absolute bottom-0 left-0 h-px w-full transform scale-x-0 origin-left
            ${variant === 'primary' ? 'bg-gold' : 'bg-offwhite/60'}
          `}
        />
      </div>
    </Component>
  );
}
