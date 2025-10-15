import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { FEATURED } from "@/lib/data"; // Used to simulate fetching data
import NotFound from "./NotFound";
import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";
// ... (Your other existing imports like ProductImageGallery, etc.)

// --- SEO Imports ---
import Seo from "@/components/Seo"; 
import { Helmet } from "react-helmet-async"; 
// -------------------

// Find watch data (Placeholder implementation)
const findWatchBySlug = (slug: string) => FEATURED.find((w) => w.slug === slug);

// FUNCTION: Generates dynamic Product Schema JSON-LD
const getProductSchema = (watch: typeof FEATURED[0], url: string) => {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `${watch.brand} ${watch.model} for Sale in Dubai`, 
    "image": watch.images.urls,
    "description": `Buy the authentic ${watch.brand} ${watch.model} watch in Dubai. Reference: ${watch.ref}. Year: ${watch.year}. Guaranteed authenticity and 12-month mechanical warranty.`,
    "sku": watch.ref,
    "brand": {
      "@type": "Brand",
      "name": watch.brand
    },
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": watch.currency,
      "price": watch.price,
      "itemCondition": "https://schema.org/UsedCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "WatchStory"
      }
    }
  };
};
// ----------------------------------------------------------------------


export default function WatchDetail() {
  const { slug } = useParams<{ slug: string }>();
  const watch = findWatchBySlug(slug!);
  
  // Early exit for 404
  if (!watch) {
    return <NotFound />;
  }
  
  // Generate dynamic Schema and URL for Helmet
  // !!! IMPORTANT: CHANGE DOMAIN TO YOUR LIVE DOMAIN !!!
  const currentUrl = `https://yourdomain.com/watch/${slug}`; 
  const productSchema = getProductSchema(watch, currentUrl);
  const jsonLd = JSON.stringify(productSchema);

  // useEffect: Ensure document.title manipulation is removed if it existed.
  useEffect(() => {
    // Keep this empty or use for local, non-SEO specific effects only.
  }, []);


  return (
    <Layout>
      
      {/* 1. DYNAMIC META TAGS, TITLE, AND CANONICAL (SEO Component) */}
      <Seo 
        title={`${watch.brand} ${watch.model} for Sale in Dubai`} 
        description={`Buy the authenticated ${watch.brand} ${watch.model} watch in Dubai. Reference: ${watch.ref}. Includes 12-month warranty.`}
        canonical={`/watch/${watch.slug}`}
        ogTitle={`${watch.brand} ${watch.model} | WatchStory Dubai`}
      />

      {/* 2. PRODUCT SCHEMA JSON-LD INJECTION (Best Practice) */}
      <Helmet>
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: jsonLd }} 
        />
      </Helmet>
      {/* ------------------------------------------------------------- */}


      {/* Main Content */}
      <div className="ws-container pt-12">
        {/* ... The rest of your WatchDetail component JSX goes here ... */}
        
        {/* Placeholder if you are still building the detailed page content: */}
        <p>Displaying details for: {watch.brand} {watch.model}</p> 

      </div>
    </Layout>
  );
}