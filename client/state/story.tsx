import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export type RouteKey =
  | "home"
  | "sell"
  | "buy"
  | "product"
  | "blog"
  | "cart"
  | "about"
  | "contact";

type StoryContextType = {
  typedText: string;
  currentLineIndex: number;
  totalLines: number;
  routeKey: RouteKey;
  soundOn: boolean;
  toggleSound: () => void;
  dots: number[]; // progress indicators
  reducedMotion: boolean;
};

const StoryContext = createContext<StoryContextType | null>(null);

const SCRIPTS: Record<RouteKey, string[]> = {
  home: [
    "Welcome to WatchStory.",
    "Every watch has a story.",
    "What's yours?",
  ],
  sell: [
    "Let's tell your watch's story to the right collector.",
    "Photograph the details; they speak.",
  ],
  buy: [
    "Discover the chapter that belongs on your wrist.",
    "Curated. Authenticated. Ready.",
  ],
  product: [
    "This reference carries a legacy—let's read it closely.",
  ],
  blog: [
    "Pour a coffee. Read the finer details.",
  ],
  cart: [
    "One step from the next chapter.",
  ],
  about: [
    "Watchmaking is memory, told in steel and time.",
  ],
  contact: [
    "Tell us your chapter; we'll listen.",
  ],
};

function getRouteKey(pathname: string): RouteKey {
  if (pathname.startsWith("/sell")) return "sell";
  if (pathname.startsWith("/buy")) return "buy";
  if (pathname.startsWith("/watch")) return "product";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/cart") || pathname.startsWith("/checkout")) return "cart";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/contact")) return "contact";
  return "home";
}

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mute, setMute] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [routeIndexMap, setRouteIndexMap] = useState<Record<RouteKey, number>>({
    home: 0,
    sell: 0,
    buy: 0,
    product: 0,
    blog: 0,
    cart: 0,
    about: 0,
    contact: 0,
  });
  const routeKey = getRouteKey(location.pathname);
  const lines = SCRIPTS[routeKey];
  const currentLineIndex = routeIndexMap[routeKey] % lines.length;
  const currentLine = lines[currentLineIndex];
  const reducedMotion = usePrefersReducedMotion();

  const audioCtxRef = useRef<AudioContext | null>(null);
  const ping = useCallback(() => {
    if (mute) return;
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.value = 600;
      g.gain.value = 0.02;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.03);
    } catch { }
  }, [mute]);

  useEffect(() => {
    setTypedText("");
    setCharIndex(0);
  }, [routeKey, currentLineIndex]);

  useEffect(() => {
    if (!currentLine) return;
    if (reducedMotion) {
      setTypedText(currentLine);
      return;
    }

    const interval = 80; // deliberate, slow
    const timer = setInterval(() => {
      setTypedText((prev) => {
        const next = currentLine.slice(0, prev.length + 1);
        if (next.length !== prev.length) ping();
        return next;
      });
      setCharIndex((ci) => ci + 1);
    }, interval);

    if (typedText.length >= currentLine.length) {
      clearInterval(timer);
      // advance after a pause
      const t = setTimeout(() => {
        setRouteIndexMap((m) => ({
          ...m,
          [routeKey]: (m[routeKey] + 1) % lines.length,
        }));
      }, 1600);
      return () => clearTimeout(t);
    }

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLine, routeKey, reducedMotion, ping, typedText.length]);

  const value = useMemo<StoryContextType>(() => ({
    typedText,
    currentLineIndex,
    totalLines: lines.length,
    routeKey,
    soundOn: !mute,
    toggleSound: () => setMute((m) => !m),
    dots: new Array(lines.length).fill(0).map((_, i) => i),
    reducedMotion,
  }), [typedText, currentLineIndex, lines.length, routeKey, mute, reducedMotion]);

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
}

export function useStory() {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error("useStory must be used within StoryProvider");
  return ctx;
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return reduce;
}
