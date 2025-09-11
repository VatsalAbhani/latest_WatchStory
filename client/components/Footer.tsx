import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="ws-container py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-mono text-base">WatchStory_</div>
          <p className="text-offwhite/70 mt-2">Rare drops, deep-cut stories, no spam.</p>
          <form className="mt-4 flex gap-2" onSubmit={(e)=>e.preventDefault()}>
            <input aria-label="email" type="email" required placeholder="Your email" className="w-full bg-transparent border px-3 py-2 rounded-md placeholder:text-offwhite/40" />
            <button className="ws-button-primary">Subscribe</button>
          </form>
        </div>
        <div>
          <div className="text-offwhite/60 mb-3">Explore</div>
          <ul className="space-y-2">
            <li><Link to="/buy" className="hover:text-gold">Buy</Link></li>
            <li><Link to="/sell" className="hover:text-gold">Sell</Link></li>
            <li><Link to="/blog" className="hover:text-gold">Journal</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-offwhite/60 mb-3">Help</div>
          <ul className="space-y-2">
            <li>Authentication</li>
            <li>Insured Shipping</li>
            <li>Escrow & Trust</li>
            <li>Privacy</li>
          </ul>
        </div>
        <div>
          <div className="text-offwhite/60 mb-3">WhatsApp</div>
          <a href="https://wa.me/0000000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gold">Enquire on WhatsApp →</a>
        </div>
      </div>
      <div className="py-6 text-center text-xs text-offwhite/50 border-t border-border/60">© {new Date().getFullYear()} WatchStory. Every watch has a story.</div>
    </footer>
  );
}
