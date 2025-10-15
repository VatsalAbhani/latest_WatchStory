// client/components/Seo.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
}

const defaultTitle = "WatchStory | Luxury Watches in Dubai";
const defaultDescription = "Dubai's trusted platform to buy and sell authenticated luxury watches. Get fair, market-based offers and secure, insured transactions for Rolex, AP, and more.";
const domain = "https://www.watchstory.ae"; // **CHANGE THIS TO YOUR LIVE DOMAIN**

export default function Seo({ 
  title, 
  description, 
  canonical, 
  ogTitle 
}: SeoProps) {
  const finalTitle = title ? `${title} | WatchStory` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalCanonical = canonical ? `${domain}${canonical}` : `${domain}/`;

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

      {/* Ensure the title in index.html is removed to prevent duplication */}

    </Helmet>
  );
}