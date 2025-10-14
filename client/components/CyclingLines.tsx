// CyclingLines.tsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import TitleSequence from "@/components/TitleSequence";
import { cn } from "@/lib/utils";

export type CyclingLinesProps = {
  lines: string[];
  className?: string;
  /** Seconds between line changes (e.g., 2.5 for 2.5s) */
  cycleIntervalSec?: number;
  /** Seconds per-letter animation (e.g., 1 for 1s) */
  perLetterDurationSec?: number;
  /** CSS easing string (e.g., 'ease-in-out' or 'cubic-bezier(0,0,.58,1)') */
  easing?: string;
  /** Seconds between letters (default 0.04s) */
  letterStaggerSec?: number;
};

export default function CyclingLines({
  lines,
  className,
  cycleIntervalSec = 2.5,
  perLetterDurationSec = 1,
  easing = "ease-in-out",
  letterStaggerSec = 0.04,
}: CyclingLinesProps) {
  const items = useMemo(() => lines.filter(Boolean), [lines]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, cycleIntervalSec * 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [items.length, cycleIntervalSec]);

  const current = items[index] ?? "";

  return (
    <div     
    className={cn("inline-block py-4 leading-loose", className)} 

    aria-live="polite">
      {/* Re-mount TitleSequence each cycle to retrigger animation */}
      <TitleSequence
        key={`${index}-${current}`}
        text={current}
        as="div"
        className={cn("tracking-tight leading-tight", className)}
        duration={perLetterDurationSec}
        easing={easing}
        stagger={letterStaggerSec}
      />
    </div>
  );
}
