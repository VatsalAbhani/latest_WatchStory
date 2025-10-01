import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface AnimatedHeadingProps {
  text: string;
}

export default function AnimatedHeading({ text }: AnimatedHeadingProps) {
  const headingRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current) return;

    // Split the text into lines and characters
    const splitText = new SplitText(headingRef.current, {
      type: "lines,chars",
      linesClass: "split-line",
      charsClass: "split-char",
      linesContent: text.split("\n"),
    });

    // Animate the characters
    gsap.from(splitText.chars, {
      opacity: 1,
      y: "100%",
      rotationX: -90,
      stagger: 0.02,
      ease: "power3.out",
      duration: 0.8,
    });

    return () => {
      splitText.revert();
    };
  }, [text]);

  // The content must be rendered in the DOM before GSAP can split it
  return (
    <div className="font-title text-center text-4xl text-offwhite/90">
      <div ref={headingRef} className="whitespace-pre-wrap">
        {text}
      </div>
    </div>
  );
}