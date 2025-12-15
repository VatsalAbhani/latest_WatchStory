import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
// Import useLocation to access the current URL hash
import { useLocation } from "react-router-dom";



export default function TermsConditions() {

  const location = useLocation();
  const LAST_UPDATED = "2025-11-12"; // 12th Nov, 2025  // ISO date for SEO; update when you edit

    // JSON-LD: Breadcrumb + FAQ (targets rich results)
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://watchstory.ae" },
        { "@type": "ListItem", position: 2, name: "Terms & Conditions", item: "https://watchstory.ae/terms-conditions" }
      ]
    };

    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          "name": "How does WatchStory guarantee authenticity?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every timepiece is verified through a multi-point inspection by certified, Swiss-trained watchmakers. We cross-check provenance and documentation. If any watch sold by WatchStory is ever proven non-genuine, we provide a full refund."
          }
        },
        {
          "@type": "Question",
          "name": "What does the 12-Month Mechanical Warranty cover?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The warranty covers internal movement defects from the date of purchase. It excludes damage from misuse, accidental impact, water ingress due to negligence, or normal cosmetic wear such as straps, crystals, and bezels."
          }
        },
        {
          "@type": "Question",
          "name": "Are transactions and shipping secure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "High-value payments are protected via a secure holding process until buyers verify the watch. All shipments are fully insured at market value using trusted, trackable couriers. We manage logistics and provide prepaid labels for sellers."
          }
        },
        {
          "@type": "Question",
          "name": "How does valuation work when selling a watch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sellers must confirm legal ownership and accurate descriptions. Our specialists assess model, reference, condition, inclusions, and market data to provide a fair valuation."
          }
        }
      ]
    };


    useEffect(() => {
      // Check if the URL has a hash (e.g., #authentication)
      if (location.hash) {
        // Get the ID (e.g., "authentication") by removing the leading "#"
        const id = location.hash.substring(1);
        
        // Find the corresponding element in the DOM
        const element = document.getElementById(id);
  
        if (element) {
          // Use scrollIntoView with a smooth behavior and offset (if needed)
          // NOTE: If you have a fixed header, you might need a more complex solution 
          // using window.scrollTo to account for the header height.
          // For simplicity, we use scrollIntoView here.
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // If there is no hash, scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
      }
    }, [location.hash]); // Rerun this effect whenever the URL hash changes



  return (
    <Layout>
      <Seo
        title="Terms & Conditions | WatchStory Trading LLC"
        description="Terms and Conditions for WatchStory Trading LLC in Dubai: 100% Authenticity Guarantee, 12-Month Mechanical Warranty, secure transactions, insured shipping, and valuation policy."
        canonical="/terms-conditions"
        // If your Seo component supports ogImage/ogType, you can pass them here.
      />

            {/* Structured data for rich results */}
            <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>


<div className="ws-container  mt-24 pt-16 max-w-4xl mx-auto">
        <h1 className="font-title text-5xl mb-2 text-gold">Terms &amp; Conditions</h1>

        {/* Visible + machine-readable last-updated */}
        <p className="text-offwhite/60 text-sm mb-12">
          Last Updated:{" "}
          <time dateTime={LAST_UPDATED}>
            {new Date(LAST_UPDATED).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </p>


        <section className="space-y-8 text-offwhite/80">
          <p>
            Welcome to <strong>WatchStory Trading LLC</strong> (“WatchStory”, “we”, “us”). These Terms and Conditions govern your use of the Site and the sale and purchase of all luxury watches and related services. By accessing or using the Site, you agree to be bound by these Terms.
          </p>
          
          {/* 1. Core Terms */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">1. Basis of Sale and Purchase</h2>
            <p>
              <strong>1.1 Purchase:</strong> All orders placed through the Site are subject to availability and acceptance by WatchStory. Full payment, including shipping and taxes, is required at the time of order confirmation. We reserve the right to correct any errors and cancel transactions based on misrepresentation or clear pricing error.
            </p>
          </div>

          {/* 2. Authenticity */}
          <div>
            <h2 id="authentication" className="font-title text-3xl mb-3 text-offwhite">
              2. 100% Authenticity Guarantee
            </h2>
            <p className="font-bold text-offwhite mb-3">
              Your Peace of Mind is Our Priority: The WatchStory Authentication Process
            </p>
            <p>
              In the market for pre-owned luxury watches in Dubai, trust is paramount. At WatchStory, our commitment to authenticity is absolute. <strong>We guarantee that every timepiece we offer is 100% genuine.</strong> Our rigorous, multi-point inspection is carried out by certified, Swiss-trained watchmakers.
            </p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-2">
              <li><strong>Multi-Point Inspection:</strong> Includes microscopic evaluation, movement verification, and material integrity checks.</li>
              <li><strong>Provenance Check:</strong> All available documentation (box and papers) is cross-referenced against global databases.</li>
              <li><strong>Anti-Counterfeit Pledge:</strong> If any watch purchased from WatchStory is ever proven to be non-genuine, we offer a <strong>full refund. </strong></li>
            </ul>
          </div>

          {/* 3. Warranty */}
          <div>
            <h2 id="warranty" className="font-title text-3xl mb-3 text-offwhite">
              3. 12-Month Mechanical Warranty
            </h2>
            <p>
              Every pre-owned luxury watch purchased from WatchStory is covered by our comprehensive <strong>12-Month Mechanical Warranty</strong>, valid from the date of purchase. This secures your investment and is serviced by our authorized watchmakers in the UAE.
            </p>
            <p className="mt-3">
              <strong>3.1 Coverage:</strong> The warranty covers internal defects of the watch movement only. It explicitly excludes damage from misuse, accidental impact, water damage due to negligence, or cosmetic wear (straps, crystals, bezels).
            </p>
          </div>

          {/* 4. Security + Shipping */}
          <div>
            <h2 id="security" className="font-title text-3xl mb-3 text-offwhite">
              4. Secure Transactions &amp; Insured Shipping
            </h2>
            <p>
              <strong>Secure Holding Process:</strong> To protect high-value payments, WatchStory utilizes a secure, designated holding process. Funds are secured until the buyer receives and verifies the watch’s condition, helping prevent chargebacks and fraud for both buyers and sellers.
            </p>
            <p className="mt-3">
              <strong>Insured Global Shipping:</strong> All shipments are <strong>fully insured</strong> for the full market value of the timepiece, using trusted, secure, and trackable courier services. We manage logistics and provide prepaid shipping labels for sellers globally.
            </p>
          </div>

          {/* 5. Valuation */}
          <div>
            <h2 id="valuation" className="font-title text-3xl mb-3 text-offwhite">
              5. Selling Your Watch (Valuation)
            </h2>
            <p>
              When submitting a watch for sale, you guarantee legal ownership and accurate representation. Our specialists evaluate model and reference, condition, inclusions (box and card), market demand, and comparable sales to determine a fair offer aligned with current Dubai market conditions.
            </p>
          </div>

          {/* 6. Law */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">6. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of the <strong>Dubai International Financial Centre (DIFC)</strong> and the <strong>United Arab Emirates (UAE)</strong>. Any dispute will be subject to the exclusive jurisdiction of the courts of Dubai.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}