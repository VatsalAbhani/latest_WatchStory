import React from "react";
import { cn } from "@/lib/utils";

export type TitleSequenceProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  stagger?: number; // seconds between letters
  duration?: number; // seconds per letter animation
  easing?: string; // CSS easing function
  startDelay?: number; // seconds before starting
};

function splitLines(text: string) {
  return text.split(/\n/);
}

export default function TitleSequence({
  text,
  as = "h1",
  className,
  stagger = 0.04,
  duration = 0.9,
  easing = "cubic-bezier(0,0,.58,1)",
  startDelay = 0,
}: TitleSequenceProps) {
  const Tag = as as any;
  const lines = splitLines(text);

  return (
    <Tag
      className={cn("ti-title-sequence", className)}
      style={{
        ["--ti-stagger" as any]: `${stagger}s`,
        ["--ti-duration" as any]: `${duration}s`,
        ["--ti-ease" as any]: easing,
        ["--ti-start-delay" as any]: `${startDelay}s`,
      }}
    >
      {lines.map((line, lineIndex) => {
        const chars = Array.from(line);
        return (
          <span className="ti-line" key={`line-${lineIndex}`}>
            {chars.map((ch, i) => (
              <span
                className="ti-char-wrapper"
                style={{ ["--ti-index" as any]: i }}
                key={`c-${lineIndex}-${i}`}
                aria-hidden
              >
                <span className="ti-char">{ch === " " ? "\u00A0" : ch}</span>
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}
