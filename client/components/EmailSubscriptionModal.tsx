import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AnimatedButton } from "@/components/AnimatedButton";
import { cn } from "@/lib/utils";

// Helper function from Footer.tsx to encode form data for Netlify
const encode = (data: Record<string, string>) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

interface EmailSubscriptionModalProps {
  onClose: () => void;
  // This prop manages the initial rendering state from the outside (Index.tsx)
  open: boolean; 
}

// Key for localStorage to track if the modal has been seen or closed
const LOCAL_STORAGE_KEY = 'emailSubscriptionModalSeen';
const DELAY_MS = 1000; // Delay for pop-up to appear after page load

export default function EmailSubscriptionModal({ open: initialOpen, onClose }: EmailSubscriptionModalProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  // 1. Logic to determine if the modal should be shown
  useEffect(() => {
    // Check localStorage. If seen, don't open.
    const seen = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (seen === 'true' || !initialOpen) {
      setOpen(false);
      return;
    }

    // Delay the appearance to let the page load
    const timer = setTimeout(() => {
      setOpen(true);
    }, DELAY_MS); 

    return () => clearTimeout(timer);
  }, [initialOpen]); // Only runs on mount

  // 2. Form Submission Handler (Reusing logic from Footer.tsx)
  const handleSubscribe = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubscribing(true);

    const form = e.target as HTMLFormElement;
    if (!email) {
        alert("Please enter a valid email address.");
        setIsSubscribing(false);
        return;
    }

    try {
      await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ 
              "form-name": form.getAttribute("name")!, 
              "email": email,
              "bot-field": "", // Honeypot field
          })
      });

      // Mark as seen and close on successful subscription
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
      alert("Subscribed successfully! Welcome to the community.");
      setOpen(false);
      onClose();

    } catch (error) {
        console.error("Netlify form submission failed:", error);
        alert("Subscription failed. Please try again later.");
    } finally {
        setIsSubscribing(false);
    }
  }, [email, onClose]);

  // 3. Handle closing/dismissing the modal
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // User manually closes the modal, mark as seen for future visits
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
      setOpen(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent 
        className={cn("sm:max-w-[425px] bg-card text-foreground border-gold/30 p-8 pt-10 relative", 
        "data-[state=closed]:duration-500 data-[state=open]:duration-500", // Ensure animations are smooth
        )}
      >
        <DialogHeader className="text-center">
          <DialogTitle className="font-title text-3xl text-gold/90">
            Join the WatchStory Journal
          </DialogTitle>
          <DialogDescription className="text-offwhite/70 pt-2 text-base">
            Be the first to see new arrivals, exclusive offers, and expert insights from our horology community.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubscribe} 
            name="email-subscription" // Reusing the Netlify form name
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-4"
        >
             {/* Hidden Netlify fields are already in index.html, but a non-JS submission form requires them here too. */}
             <input type="hidden" name="form-name" value="email-subscription" />
             <input type="hidden" name="bot-field" />
            
          <Input 
            type="email"
            placeholder="Enter your email address"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-background/50 border-border focus-visible:ring-gold/70"
          />

          <AnimatedButton
            type="submit"
            text="Subscribe Now"
            hoverText="Unlock Offers"
            loading={isSubscribing}
            className="w-full h-12 text-base font-extrabold"
          />
        </form>
        
        {/* Close button is automatically included by DialogContent */}
      </DialogContent>
    </Dialog>
  );
}