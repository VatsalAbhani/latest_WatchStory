// // client/components/DriftingWatches.tsx
// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import WatchModal, { SelectedWatch } from './WatchModal';


// // --- START: MODIFIED SECTION (background individual watch images) ---

// // Placeholder: Replace these with the actual paths to your unique watch images
// const watchImages = [
//     '/Rolex-1.svg', // Assuming you added this file to /public
//     '/AP-1.svg', // Assuming you added this file to /public
//     '/RM-1.svg',
//     '/RM-2.svg',
//     '/RM-3.svg',
//     '/RM-4.svg',
//     '/Patek-1.svg',
//     '/Patek-2.svg',
//     '/Patek-3.svg',
//     '/Patek-4.svg',
//     '/Patek-5.svg', // Assuming you added this file to /public
//     '/Patek-6.svg', // Assuming you added this file to /public
//     '/Patek-7.svg',
//     '/Rolex-1.svg',
//     '/Rolex-1.svg',
//     '/Rolex-1.svg',
//     '/Rolex-1.svg',
//     '/Rolex-1.svg',
//     '/Rolex-1.svg',
//     '/Rolex-1.svg',
//   ];
  
//   // --- END: MODIFIED SECTION ---

// export default function DriftingWatches() {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [selectedWatch, setSelectedWatch] = useState<SelectedWatch | null>(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
    
//     // Set container to full size to capture the whole viewport of the parent
//     container.style.position = 'absolute';
//     container.style.width = '100%';
//     container.style.height = '100%';
//     container.style.top = '0';
//     container.style.left = '0';

//     const cleanupRefs: HTMLElement[] = []; 

//     watchImages.forEach((src, i) => {
//       const img = document.createElement('img');
//       img.src = src;
//       img.className = 'drift-watch';
//       img.dataset.index = i.toString();
//       img.style.position = 'absolute';
//       // Set fixed, small size for the drifting elements
//       img.style.width = '200px'; 
//       img.style.height = '200px';
//       img.style.objectFit = 'cover';
//       img.style.opacity = '0.9'; 
//       img.style.cursor = 'pointer';
      
//       // Random initial position, scale, and rotation for visual variety
//       const initialScale = 0.5 + Math.random() * 0.5;
//       gsap.set(img, { 
//         rotation: Math.random() * 360, 
//         scale: initialScale,
//         x: Math.random() * (window.innerWidth * 0.8),
//         y: Math.random() * (window.innerHeight * 0.8)
//       }); 
      
//       container.appendChild(img);
//       cleanupRefs.push(img);

//       // Infinite drift animation
//       gsap.to(img, {
//         duration: 30 + Math.random() * 20, 
//         x: () => Math.random() * (container.clientWidth - 100),
//         y: () => Math.random() * (container.clientHeight - 100),
//         repeat: -1,
//         ease: 'none', 
//         onRepeat() {
//           // Slight change in scale and rotation on each repeat for organic motion
//           gsap.to(img, { 
//             scale: 0.5 + Math.random() * 0.5, 
//             duration: 5,
//             ease: 'power1.inOut'
//           });
//           gsap.to(img, {
//             rotation: '+=360',
//             duration: 50 + Math.random() * 20,
//             ease: 'none'
//           });
//         }
//       });
      
//       // Click handler to open modal
//       img.addEventListener('click', () => {
//         setSelectedWatch({ src, index: i });
//       });
//     });

//     return () => {
//       // cleanup on unmount
//       cleanupRefs.forEach(img => {
//         gsap.killTweensOf(img);
//         img.remove();
//       });
//     };
//   }, []);

//   return (
//     <>
//       {/* The animation container takes up the full space of its parent (the hero section) */}
//       <div 
//         ref={containerRef}
//         style={{ position: 'absolute', width: '100%', height: '100vh', overflow: 'hidden', top: 0, left: 0 }}>
//       </div>
//       {selectedWatch && (
//         <WatchModal 
//           watch={selectedWatch} 
//           onClose={() => setSelectedWatch(null)} />
//       )}
//     </>
//   );
// }





// client/components/DriftingWatches.tsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import WatchModal, { SelectedWatch } from './WatchModal';

// --- Consolidated list of single watch images for cycling ---
// Using visible images from the public directory.
const ALL_WATCH_IMAGES = [
  '/watch-1.png', // Rolex Daytona
  '/watch-2.jpg', // Patek Philippe Nautilus
  '/watch-1.png', // Repeat for variety
  '/watch-2.jpg',
  '/watch-1.png',
  '/watch-2.jpg',
];

const NUM_CYCLERS = 4;

interface WatchCyclerProps {
  initialIndex: number;
  imageSources: string[];
}

function WatchCycler({ initialIndex, imageSources }: WatchCyclerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);

  const containerStyle = useMemo(() => {
    // Random initial position, scale, and rotation for visual variety
    const initialScale = 0.5 + Math.random() * 0.5;
    const x = Math.random() * 80;
    const y = Math.random() * 80;

    return {
      position: 'absolute' as 'absolute',
      width: '200px',
      height: '200px',
      opacity: 0.8,
      cursor: 'pointer',
      transform: `translate3d(${x}vw, ${y}vh, 0) scale(${initialScale}) rotate(${Math.random() * 360}deg)`,
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    // --- Animation Logic for Drift and Cycle ---

    let cycleIndex = currentImageIndex;

    const mainTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0 });
    
    // 1. Initial Drift Animation: Infinite loop for position/rotation change
    const driftTween = gsap.to(container, {
      duration: 30 + Math.random() * 20, 
      x: () => `${Math.random() * 80}vw`,
      y: () => `${Math.random() * 80}vh`,
      rotation: '+=360',
      ease: 'none',
      repeat: -1,
      paused: true,
    });

    // 2. Image Cycling Timeline: Fade out, swap src, fade in
    const cycleTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2.0 });

    cycleTimeline
      .to(image, {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.in',
      })
      .add(() => {
        // Swap image source and update position/scale/rotation to appear independent
        cycleIndex = (cycleIndex + 1) % imageSources.length;
        image.src = imageSources[cycleIndex];
        
        const newScale = 0.5 + Math.random() * 0.5;
        gsap.set(container, {
          x: `${Math.random() * 80}vw`,
          y: `${Math.random() * 80}vh`,
          scale: newScale,
          rotation: Math.random() * 360,
        });

      }, "+=0.1") // Slight pause after fade-out to ensure change
      .to(image, {
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
      }, "+=0.1") // Fade in

    // Start both animations
    driftTween.play();
    cycleTimeline.play();

    return () => {
      driftTween.kill();
      cycleTimeline.kill();
    };
  }, [imageSources]);

  return (
    <div ref={containerRef} style={containerStyle}>
      <img
        ref={imageRef}
        src={imageSources[currentImageIndex]}
        alt={`Drifting Watch ${currentImageIndex}`}
        className='drift-watch'
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain', // Changed from 'cover' to 'contain' for better display
          pointerEvents: 'none', // Disable click to avoid modal for this background effect
          mixBlendMode: 'soft-light', // Apply a blend mode for atmosphere
        }}
      />
    </div>
  );
}


export default function DriftingWatches() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedWatch, setSelectedWatch] = useState<SelectedWatch | null>(null);

  // Array of numbers [0, 1, 2, 3] to map over for the cycler instances
  const cyclerIndices = useMemo(() => Array.from({ length: NUM_CYCLERS }, (_, i) => i), []);

  return (
    <>
      {/* The animation container takes up the full space of its parent (the hero section) */}
      <div 
        ref={containerRef}
        style={{ 
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
          overflow: 'hidden', 
          top: 0, 
          left: 0,
          pointerEvents: 'none', // Ensure the background doesn't interfere with buttons
          zIndex: 0, // Ensure it is behind content but above the static background image
        }}
      >
        {cyclerIndices.map(i => (
          <WatchCycler 
            key={i}
            initialIndex={i % ALL_WATCH_IMAGES.length} // Give each cycler a unique starting image
            imageSources={ALL_WATCH_IMAGES}
          />
        ))}
      </div>
      {selectedWatch && (
        <WatchModal 
          watch={selectedWatch} 
          onClose={() => setSelectedWatch(null)} />
      )}
    </>
  );
}