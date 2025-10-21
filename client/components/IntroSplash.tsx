// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap"; // GSAP is no longer necessary, but kept for imports consistency

// interface IntroSplashProps {
//   onComplete: () => void;
// }

// export default function IntroSplash({ onComplete }: IntroSplashProps) {
//   // We use the same time delay (3000ms or 3 seconds) as your video fallback for consistency.
//   const DISPLAY_DURATION_MS = 3000;

//   useEffect(() => {
//     // Set a timer to automatically complete the splash screen after 3 seconds
//     const timer = setTimeout(onComplete, DISPLAY_DURATION_MS);
    
//     // Cleanup function to clear the timer if the component unmounts early
//     return () => {
//       clearTimeout(timer);
//       // Clean up any GSAP tweens just in case
//       // gsap.killTweensOf('img'); 
//     };

//   // The dependency array only needs onComplete
//   }, [onComplete]); 
  
//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-white"
//     >
//       <img
//         // Using Logo.svg as the source since bg_logo_splash.svg wasn't provided,
//         // and Logo.svg is a provided asset.
//         src="/Logo.svg"
//         alt="Animated Logo Splash"
//         // Control the size of the image
//         className="w-full h-full max-w-lg max-h-lg object-contain"
//         // Optional: Add a subtle fade-in animation using GSAP if needed, 
//         // but for now, we rely only on the timer.
//       />
//     </div>
//   );
// }


import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface IntroSplashProps {
  onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const imgRef = useRef(null); // Ref to target the image for animation
  // Duration for how long the full splash screen is visible
  const DISPLAY_DURATION_MS = 1000;
  // Animation duration
  const ANIM_DURATION_S = 1.0; 

  useEffect(() => {
    // 1. Image Entrance Animation (Fade-in and slight scale up)
    gsap.fromTo(
      imgRef.current,
      { opacity: 0, scale: 0.95, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: ANIM_DURATION_S, ease: "power2.out" }
    );

    // 2. Timer to complete the splash
    const timer = setTimeout(onComplete, DISPLAY_DURATION_MS);
    
    // 3. Cleanup function
    return () => {
      clearTimeout(timer);
      // IMPORTANT: Kill the GSAP tween on cleanup to prevent memory leaks or conflicts
      gsap.killTweensOf(imgRef.current);
    };

  // The dependency array only needs onComplete
  }, [onComplete]); 
  
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-white"
    >
      <img
        ref={imgRef} // Attach ref here
        src="/F1.png"
        alt="Animated Logo Splash"
        className="h-60 w-auto max-w-lg max-h-lg object-contain"
      />
    </div>


  );
}