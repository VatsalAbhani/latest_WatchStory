// client/components/DriftingWatches.tsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import WatchModal, { SelectedWatch } from './WatchModal';


// --- START: MODIFIED SECTION (background individual watch images) ---

// Placeholder: Replace these with the actual paths to your unique watch images
const watchImages = [
    '/watch-1.png', // Assuming you added this file to /public
    '/watch-2.jpg', // Assuming you added this file to /public
    '/watch-3.png',
    '/watch-4.jpg',
    '/watch-5.png',
    '/watch-6.jpg',
    '/watch-7.png',
    '/watch-8.jpg',
  ];
  
  // --- END: MODIFIED SECTION ---

export default function DriftingWatches() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedWatch, setSelectedWatch] = useState<SelectedWatch | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Set container to full size to capture the whole viewport of the parent
    container.style.position = 'absolute';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.top = '0';
    container.style.left = '0';

    const cleanupRefs: HTMLElement[] = []; 

    watchImages.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'drift-watch';
      img.dataset.index = i.toString();
      img.style.position = 'absolute';
      // Set fixed, small size for the drifting elements
      img.style.width = '100px'; 
      img.style.height = '100px';
      img.style.objectFit = 'cover';
      img.style.opacity = '0.3'; 
      img.style.cursor = 'pointer';
      
      // Random initial position, scale, and rotation for visual variety
      const initialScale = 0.5 + Math.random() * 0.5;
      gsap.set(img, { 
        rotation: Math.random() * 360, 
        scale: initialScale,
        x: Math.random() * (window.innerWidth * 0.8),
        y: Math.random() * (window.innerHeight * 0.8)
      }); 
      
      container.appendChild(img);
      cleanupRefs.push(img);

      // Infinite drift animation
      gsap.to(img, {
        duration: 30 + Math.random() * 20, 
        x: () => Math.random() * (container.clientWidth - 100),
        y: () => Math.random() * (container.clientHeight - 100),
        repeat: -1,
        ease: 'none', 
        onRepeat() {
          // Slight change in scale and rotation on each repeat for organic motion
          gsap.to(img, { 
            scale: 0.5 + Math.random() * 0.5, 
            duration: 5,
            ease: 'power1.inOut'
          });
          gsap.to(img, {
            rotation: '+=360',
            duration: 50 + Math.random() * 20,
            ease: 'none'
          });
        }
      });
      
      // Click handler to open modal
      img.addEventListener('click', () => {
        setSelectedWatch({ src, index: i });
      });
    });

    return () => {
      // cleanup on unmount
      cleanupRefs.forEach(img => {
        gsap.killTweensOf(img);
        img.remove();
      });
    };
  }, []);

  return (
    <>
      {/* The animation container takes up the full space of its parent (the hero section) */}
      <div 
        ref={containerRef}
        style={{ position: 'absolute', width: '100%', height: '100vh', overflow: 'hidden', top: 0, left: 0 }}>
      </div>
      {selectedWatch && (
        <WatchModal 
          watch={selectedWatch} 
          onClose={() => setSelectedWatch(null)} />
      )}
    </>
  );
}