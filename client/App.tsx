import "./global.css";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import BlogIndex from "./pages/BlogIndex";
// import BlogArticle from "./pages/BlogArticle";
import BlogArticle from "./pages/BlogArticle";
import WatchDetail from "./pages/WatchDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact-us";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import { StoryProvider } from "@/state/story";
import { CartProvider } from "@/state/cart";
import { useState } from "react";
import IntroSplash from "@/components/IntroSplash";
// import CursorGlow from "@/components/CursorGlow"; // <-- NEW IMPORT



//

// import DriftingWatches from '@/components/DriftingWatches';

const ORIGIN = "https://watchstory.ae";



function GlobalJsonLd() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": ORIGIN,
    "name": "WatchStory",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${ORIGIN}/buy?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };


  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WatchStory",
    "url": ORIGIN,
    "logo": `${ORIGIN}/F1.png`,
    // add real socials when ready
    "sameAs":[
      "https://www.instagram.com/watchstory.uae/",
      // "https://www.facebook.com/watchstory",
      "https://www.linkedin.com/company/watchstoryuae/",
      "https://www.trustpilot.com/review/watchstory.ae"
    ],

  
  "knowsAbout": [
    "Luxury Watches",
    "Pre-Owned Watches",
    "Rolex",
    "Audemars Piguet",
    "Patek Philippe",
    "Richard Mille",
    "Watch Valuation",
    "Luxury Watch Authentication",
    "Sell Luxury Watches in Dubai",
    "Dubai Watch Market"
  ]
  };



  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "WatchStory - Luxury Watch Dealer Dubai",
    "image": `${ORIGIN}/F1.png`,
    "url": ORIGIN,
    "telephone": "+971 54 505 6156",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "The Bureau Business Center - Opera Grand, The Residences - Emaar Blvd",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "postalCode": "00000",
      "addressCountry": "AE"
    },
    "areaServed": ["Dubai", "United Arab Emirates"],
    "currenciesAccepted": "AED, USD",
    "paymentAccepted": "Bank Transfer, Cash",
    "itemOffered": {
      "@type": "Product",
      "name": "Luxury Watches",
      "description": "Buy and sell authenticated pre-owned luxury timepieces from Rolex, Patek Philippe, Audemars Piguet, Richard Mille and more."
    },
    "knowsAbout": [
      "Luxury Watches",
      "Pre-Owned Watches",
      "Rolex",
      "Audemars Piguet",
      "Patek Philippe",
      "Richard Mille",
      "Sell Watches in Dubai",
      "Buy Watches in Dubai"
    ],



  
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "11"
  }









  };






  return (
    
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(website)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organization)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusiness)}
      </script>
    </Helmet>
  );
}



const queryClient = new QueryClient();

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroSplash onComplete={handleIntroComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* <CursorGlow /> <-- COMPONENT ADDED HERE */}
        <BrowserRouter>
          <CartProvider>
            <StoryProvider>
            <HelmetProvider>
            <GlobalJsonLd /> 
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/watch/:slug" element={<WatchDetail />} />
                <Route path="/blog" element={<BlogIndex />} />
                {/* <Route path="/blog/:slug" element={<BlogArticle />} /> */}
                {/* <Route path="/cart" element={<Cart />} /> */}
                {/* <Route path="/checkout" element={<Checkout />} /> */}
                {/* <Route path="/about" element={<About />} /> */}
                {/* <Route path="/contact" element={<Contact />} /> */}

                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />

                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />



                
                {/* <Route path="/blog" element={<BlogIndex />} /> */}
                <Route path="/blog/:slug" element={<BlogArticle />} />

                {/* Drifting Watches */}
                {/* <Route path="/drifting-watches" element={<DriftingWatches />} /> */}

                {/* <DriftingWatches /> */}


                {/* */}
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              </HelmetProvider>
            </StoryProvider>
          </CartProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);