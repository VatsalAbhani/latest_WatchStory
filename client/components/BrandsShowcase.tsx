import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import TypewriterHeading from "./TypewriterHeading";

gsap.registerPlugin(Draggable);

export default function BrandsShowcase({ brands }) {
  const trackRef = useRef(null);
  const baseXRef = useRef(0);    // Base position for animation
  const dragXRef = useRef(0);    // Drag offset
  const animationRef = useRef(null);
  const draggableRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate all children for continuous loop
    const children = [...track.children];
    children.forEach(child => {
      track.appendChild(child.cloneNode(true));
    });

    const totalWidth = track.scrollWidth / 2;

    // Wrap helper so position loops seamlessly
    const wrapX = gsap.utils.wrap(-totalWidth, 0);

    // Infinite marquee tween (never paused)
    animationRef.current = gsap.to({}, {
      duration: 5,
      ease: "none",
      repeat: -1,
      onUpdate() {
        if (!draggableRef.current?.isDragging) {
          baseXRef.current -= totalWidth / (30 * 60); // approx per tick at 60fps
          gsap.set(track, { x: wrapX(baseXRef.current + dragXRef.current) });
        }
      }
    });

    // Draggable setup to allow user drag without pausing animation
    draggableRef.current = Draggable.create(track, {
      type: "x",
      inertia: true,
      edgeResistance: 0.8,

      onPress() {
        // Just mark dragging state
        this.isDragging = true;
      },

      onDrag() {
        dragXRef.current = this.x;
        gsap.set(track, { x: wrapX(baseXRef.current + dragXRef.current) });
      },

      onThrowUpdate() {
        dragXRef.current = this.x;
        gsap.set(track, { x: wrapX(baseXRef.current + dragXRef.current) });
      },

      onRelease() {
        // On release, merge drag offset into base position and reset drag offset
        baseXRef.current = wrapX(baseXRef.current + dragXRef.current);
        dragXRef.current = 0;
        this.isDragging = false;
      },

      snap: (x) => wrapX(x)
    })[0];

    return () => {
      animationRef.current?.kill();
      draggableRef.current?.kill();
    };
  }, [brands]);

  return (
<section className="relative overflow-hidden py-16 bg-gray-400">
  {/* Fixed Header at top with z-index to remain above carousel */}
  <div className="absolute top-0 left-0 right-0 z-30 p-8 md:p-12">
    <div className="max-w-lg">
      <TypewriterHeading
        lines={["Brands We Trust"]}
        charsPerSecond={35}
        showDots={false}
        loop={false}
        triggerOnScroll={false}
        className="font-title text-4xl md:text-5xl text-offwhite mb-4"
      />
      <p className="font-sans text-offwhite/70 text-lg leading-relaxed">
        Not affiliated with these brands.
      </p>
    </div>
  </div>



    <section className="relative overflow-hidden py-8 bg-gray-400 mt-32">
      <div
        ref={trackRef}
        className="flex select-auto cursor-grab items-center space-x-8"
        style={{ willChange: "transform" }}
      >
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex-shrink-0 w-40 h-24 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
          >
            <img
              src={brand.logoUrl}
              alt={brand.name}
              loading="lazy"
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
</section>
  );
}
