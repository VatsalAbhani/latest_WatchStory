// client/components/Seo.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;       // route path like "/blog/slug" or absolute
  ogTitle?: string;
  ogImage?: string;         // absolute URL preferred
  ogType?: "website" | "article" | "product";
  noIndex?: boolean;
}

const defaultTitle = "WatchStory | Luxury Watches in Dubai";
const defaultDescription = "Sell your luxury watch in Dubai for the best price. Trusted buyers for Rolex, Patek, AP, RM and Cartier. Get a fair quote, secure and immediate payment.";
const ORIGIN = "https://watchstory.ae";                // <- standardized
const defaultOgImage = `${ORIGIN}/F1.png`;

export default function Seo({ 
  title,
  description,
  canonical,
  ogTitle,
  ogImage,
  ogType = "website",
  noIndex = false,
}: SeoProps) {

  const finalTitle = title ? `${title} | WatchStory` : defaultTitle;
  const finalDescription = description || defaultDescription;
  

  // allow absolute canonical or route path
  const finalCanonical =
    canonical
      ? (canonical.startsWith("http") ? canonical : `${ORIGIN}${canonical}`)
      : `${ORIGIN}/`;

  const finalOgImage = ogImage || defaultOgImage;

  return (
    <Helmet prioritizeSeoTags>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />

      {/* Canonical */}
      <link rel="canonical" href={finalCanonical} />

      {/* Robots */}
      <meta
        name="robots"
        content={
          noIndex
            ? "noindex, nofollow"
            : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        }
      />

      {/* Open Graph */}
      <meta property="og:site_name" content="WatchStory" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={ogTitle || finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalCanonical} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
    </Helmet>
  );
}
