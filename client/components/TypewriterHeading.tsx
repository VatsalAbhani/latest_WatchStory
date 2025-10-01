import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface TypewriterHeadingProps {
  lines: string[];
  charsPerSecond?: number;
  pauseBetweenLines?: number;
  showDots?: boolean;
  loop?: boolean;
  triggerOnScroll?: boolean;
  className?: string;
}

export default function TypewriterHeading({
  lines,
  charsPerSecond = 20,
  pauseBetweenLines = 1,
  showDots = true,
  loop = true,
  triggerOnScroll = false,
  className = "",
}: TypewriterHeadingProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [hasStarted, setHasStarted] = useState(!triggerOnScroll);

  useEffect(() => {
    if (!textRef.current || !hasStarted) return;

    let timeline: GSAPTimeline;

    function typeLine(lineIndex: number) {
      const fullText = lines[lineIndex];
      const charDelay = 1 / charsPerSecond;

      timeline = gsap.timeline({
        onComplete: () => {
          if (loop || lineIndex < lines.length - 1) {
            setTimeout(() => {
              const next = lineIndex + 1 >= lines.length ? 0 : lineIndex + 1;
              setCurrentLine(next);
            }, pauseBetweenLines * 1000);
          }
        },
      });

      // Reset text
      gsap.set(textRef.current, { textContent: "" });

      // Type each character
      fullText.split("").forEach((_, i) => {
        timeline.to(textRef.current, {
          textContent: fullText.slice(0, i + 1),
          duration: charDelay,
          ease: "none",
        });
      });
    }

    typeLine(currentLine);

    return () => {
      if (timeline) timeline.kill();
    };
  }, [currentLine, lines, charsPerSecond, pauseBetweenLines, loop, hasStarted]);

  useEffect(() => {
    if (!triggerOnScroll || !containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        setHasStarted(true);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [triggerOnScroll]);

  return (
    <div ref={containerRef} className={`typewriter-heading ${className}`}>
      <div className="inline-block whitespace-pre-wrap">
        <div ref={textRef} />
      </div>
      {/* {showDots && lines.length > 1 && (
        <div className="mt-2 flex justify-center gap-2">
          {lines.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full transition-colors ${
                idx === currentLine ? "bg-gold" : "bg-offwhite/20"
              }`}
            />
          ))}
        </div>
      )} */}
    </div>
  );
}