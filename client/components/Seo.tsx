// client/components/Seo.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogImage?: string;
}

const defaultTitle = "WatchStory | Luxury Watches in Dubai";
const defaultDescription = "Sell your luxury watch in Dubai for the best price. Trusted buyers for Rolex, Patek, AP, RM and Cartier. Get a fair quote, secure and immediate payment.";
const domain = "https://www.watchstory.ae"; //
const defaultOgImage = `${domain}/bg_1.png`;

export default function Seo({ 
  title, 
  description, 
  canonical, 
  ogTitle, 
  ogImage
}: SeoProps) {
  const finalTitle = title ? `${title} | WatchStory` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalCanonical = canonical ? `${domain}${canonical}` : `${domain}/`;
  const finalOgImage = ogImage || defaultOgImage;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />

      {/* Canonical Link */}
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph Tags (for Social Sharing) */}
      <meta property="og:title" content={ogTitle || finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalOgImage} />

      

    </Helmet>
  );
}

