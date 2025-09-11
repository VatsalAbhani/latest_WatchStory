import { Link, NavLink } from "react-router-dom";
import { Sparkles, ShoppingCart, Volume2, VolumeX, Menu } from "lucide-react";
import { useStory } from "@/state/story";
import { useCart } from "@/state/cart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export default function TerminalStoryBar() {
  const { typedText, dots, currentLineIndex, toggleSound, soundOn } = useStory();
  const { count } = useCart();

  const Nav = () => (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      <NavLink to="/buy" className={({isActive}) => cn("hover:text-gold", isActive && "text-gold")}>Buy</NavLink>
      <NavLink to="/sell" className={({isActive}) => cn("hover:text-gold", isActive && "text-gold")}>Sell</NavLink>
      <NavLink to="/blog" className={({isActive}) => cn("hover:text-gold", isActive && "text-gold")}>Blog</NavLink>
      <NavLink to="/about" className={({isActive}) => cn("hover:text-gold", isActive && "text-gold")}>About</NavLink>
      <Link to="/cart" className="relative">
        <ShoppingCart className="h-5 w-5" />
        <span aria-label="cart count" className="absolute -right-2 -top-1 rounded-full bg-gold text-onyx text-[10px] px-1.5 py-0.5">{count}</span>
      </Link>
    </nav>
  );

  return (
    <div className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur">
      <div className="ws-container h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-mono group">
          <span className="text-sm tracking-tight">WatchStory_</span>
          <Sparkles className="h-4 w-4 text-gold group-hover:scale-110 transition-transform" />
        </Link>

        <div className="flex-1 flex flex-col items-center px-3">
          <div className="w-full md:w-[70%] truncate text-center text-[13px] md:text-sm text-offwhite/90">
            <span className="align-middle">{typedText}</span>
            <span aria-hidden className="ws-cursor align-middle">▌</span>
          </div>
          <div className="mt-1 hidden md:flex items-center gap-1" aria-label="story progress">
            {dots.map((d, i) => (
              <span key={d} className={cn("h-1.5 w-1.5 rounded-full", i === currentLineIndex ? "bg-gold" : "bg-offwhite/20")} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button aria-label="toggle sound" onClick={toggleSound} className="text-offwhite/80 hover:text-offwhite transition">
            {soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
          <Nav />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden bg-transparent border-border/60"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card">
              <div className="flex flex-col gap-5 mt-8 text-lg">
                <NavLink to="/buy">Buy</NavLink>
                <NavLink to="/sell">Sell</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/cart">Cart ({count})</NavLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
