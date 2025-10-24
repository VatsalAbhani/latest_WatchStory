import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import React from 'react';

export default function TermsConditions() {
  return (
    <Layout>
      <Seo
        title="Terms & Conditions"
        description="The full Terms and Conditions governing the use of the WatchStory Trading LLC website, including purchasing, selling, authentication, and warranty details."
        canonical="/terms-conditions"
      />
      <div className="ws-container pt-16 pb-24 max-w-4xl mx-auto">
        <h1 className="font-title text-5xl mb-4 text-gold">Terms & Conditions</h1>
        <p className="text-offwhite/70 text-sm mb-12">
          Last Updated: October 24, {new Date().getFullYear()}
        </p>

        <section className="space-y-8 text-offwhite/80">
          <p>
            Welcome to **WatchStory Trading LLC** ("WatchStory", "we", "us"). These Terms and Conditions govern your use of the Site and the sale and purchase of all luxury watches and related services. By accessing or using the Site, you agree to be bound by these Terms.
          </p>
          <p className="font-bold text-offwhite">
            Please read these Terms carefully before using our services.
          </p>

          {/* --- Section 1: Core Terms --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">1. Basis of Sale and Purchase</h2>
            <p>
              **1.1 Purchase:** All orders placed through the Site are subject to availability and acceptance by WatchStory. Full payment, including shipping and taxes, is required at the time of order confirmation.
            </p>
            <p className="mt-3">
              **1.2 Listing Accuracy:** While we strive for absolute accuracy, all descriptions, images, and pricing are subject to verification. We reserve the right to correct any errors and cancel transactions based on misrepresentation or clear pricing error.
            </p>
          </div>

          {/* --- Section 2: Authentication Guarantee (Footer Link Target) --- */}
          <div>
            <h2 id="authentication" className="font-title text-3xl mb-3 text-offwhite">
              2. 100% Authenticity Guarantee
            </h2>
            <p>
              WatchStory guarantees that **every watch sold is 100% authentic** and legally acquired. Our in-house, certified watchmakers perform a multi-point inspection of the movement, case, serial numbers, and provenance (Box & Papers) before listing.
            </p>
            <p className="mt-3">
              **2.1 Counterfeit Pledge:** Should a watch purchased from us ever be proven non-authentic by an authorized manufacturer's service center, we will issue a **full refund of the purchase price plus an additional 10%** within 30 days of verification. This guarantee is non-transferable.
            </p>
          </div>

          {/* --- Section 3: Mechanical Warranty (Footer Link Target) --- */}
          <div>
            <h2 id="warranty" className="font-title text-3xl mb-3 text-offwhite">
              3. 12-Month Mechanical Warranty
            </h2>
            <p>
              Every pre-owned luxury watch purchased from WatchStory is covered by our comprehensive **12-Month Mechanical Warranty**, valid from the date of purchase.
            </p>
            <p className="mt-3">
              **3.1 Coverage:** The warranty covers internal defects of the watch movement only. It explicitly excludes damage resulting from misuse, accidental impact, water damage due to improper screw-down crown usage, normal wear and tear, or external component damage (straps, crystals, bezels).
            </p>
            <p className="mt-3">
              **3.2 Voiding:** The warranty is void if any repair, modification, or service work is performed by a party other than WatchStory or a service centre explicitly approved by us.
            </p>
          </div>

          {/* --- Section 4: Selling Your Watch --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">4. Selling Your Watch to WatchStory</h2>
            <p>
              When submitting a watch for sale or valuation, you guarantee that you are the legal owner, the watch is free from all encumbrances, and the description and images provided are accurate.
            </p>
            <p className="mt-3">
              **4.1 Valuation:** Our valuation is based on current market trends, the watch's condition, and its provenance. The initial offer is pending physical inspection (see anchor link <a href="/sell#valuation" className="text-gold hover:underline">Expert Valuation & Sourcing</a>).
            </p>
            <p className="mt-3">
              **4.2 Payment:** Once the physical watch inspection confirms the submitted details, payment will be finalized within 24 hours via the agreed-upon secure method (Bank Transfer or Escrow).
            </p>
          </div>

          {/* --- Section 5: Governing Law --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">5. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the **Dubai International Financial Centre (DIFC)** and the **United Arab Emirates (UAE)**, without regard to its conflict of law provisions. Any dispute arising out of or related to these Terms will be subject to the exclusive jurisdiction of the courts of Dubai.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
