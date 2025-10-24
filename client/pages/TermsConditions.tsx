import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import React from 'react';

export default function TermsConditions() {
  return (
    <Layout>
      <Seo
        title="Terms & Conditions | Authentication, Warranty, and Security"
        description="The full Terms and Conditions for WatchStory Trading LLC in Dubai, covering our 100% Authenticity Guarantee, 12-Month Mechanical Warranty, secure transactions, and shipping."
        canonical="/terms-conditions"
      />
      <div className="ws-container pt-16 pb-24 max-w-4xl mx-auto">
        <h1 className="font-title text-5xl mb-4 text-gold">Terms & Conditions</h1>
        {/* <p className="text-offwhite/70 text-sm mb-12">
          Last Updated: October 24, {new Date().getFullYear()}
        </p> */}

        <section className="space-y-8 text-offwhite/80">
          <p>
            Welcome to **WatchStory Trading LLC** ("WatchStory", "we", "us"). These Terms and Conditions govern your use of the Site and the sale and purchase of all luxury watches and related services. By accessing or using the Site, you agree to be bound by these Terms.
          </p>
          
          {/* --- Section 1: Core Terms --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">1. Basis of Sale and Purchase</h2>
            <p>
              **1.1 Purchase:** All orders placed through the Site are subject to availability and acceptance by WatchStory. Full payment, including shipping and taxes, is required at the time of order confirmation. We reserve the right to correct any errors and cancel transactions based on misrepresentation or clear pricing error.
            </p>
          </div>

          {/* --- Section 2: 100% Authenticity Guarantee (Footer Link Target) --- */}
          <div>
            <h2 id="authentication" className="font-title text-3xl mb-3 text-offwhite">
              2. 100% Authenticity Guarantee
            </h2>
            <p className="font-bold text-offwhite mb-3">
              Your Peace of Mind is Our Priority: The WatchStory Authentication Process
            </p>
            <p>
              In the market for pre-owned luxury watches in Dubai, trust is paramount. At WatchStory, our commitment to authenticity is absolute. **We guarantee that every timepiece we offer is 100% genuine.** Our rigorous, multi-point inspection is carried out by certified, Swiss-trained watchmakers.
            </p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-2">
              <li>**Multi-Point Inspection:** Includes microscopic evaluation, movement verification, and material integrity checks.</li>
              <li>**Provenance Check:** All available documentation (Box and Papers) is cross-referenced against global databases.</li>
              <li>**Anti-Counterfeit Pledge:** If any watch purchased from WatchStory is ever proven to be non-genuine, we offer a **full refund plus an additional 10%** of your purchase price.</li>
            </ul>
          </div>

          {/* --- Section 3: Mechanical Warranty (Footer Link Target) --- */}
          <div>
            <h2 id="warranty" className="font-title text-3xl mb-3 text-offwhite">
              3. 12-Month Mechanical Warranty
            </h2>
            <p>
              Every pre-owned luxury watch purchased from WatchStory is covered by our comprehensive **12-Month Mechanical Warranty**, valid from the date of purchase. This secures your investment and is serviced by our authorized watchmakers in the UAE.
            </p>
            <p className="mt-3">
              **3.1 Coverage:** The warranty covers internal defects of the watch movement only. It explicitly excludes damage from misuse, accidental impact, water damage due to negligence, or cosmetic wear (straps, crystals, bezels).
            </p>
          </div>

          {/* --- Section 4: Transaction Security (Footer Link Target) --- */}
          <div>
            <h2 id="security" className="font-title text-3xl mb-3 text-offwhite">
              4. Secure Transactions & Insured Shipping
            </h2>
            <p>
              **Secure Escrow Transactions:** To protect high-value payments, WatchStory utilizes a secure, designated holding process. Funds are secured until the buyer receives and verifies the watch's condition, ensuring **zero risk of chargebacks or fraud** for both buyers and sellers.
            </p>
            <p className="mt-3">
              **Insured Global Shipping:** All shipments are **fully insured** for the full market value of the timepiece, using trusted, secure, and trackable courier services. We manage all logistics and provide prepaid shipping labels for sellers globally.
            </p>
          </div>

          {/* --- Section 5: Selling Your Watch --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">5. Selling Your Watch (Valuation)</h2>
            <p>
              When submitting a watch for sale, you guarantee legal ownership and accurate representation. Our expert valuation process is detailed on the <a href="/sell#valuation" className="text-gold hover:underline">Expert Valuation & Sourcing</a> section of our Sell page.
            </p>
          </div>

          {/* --- Section 6: Governing Law --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">6. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of the **Dubai International Financial Centre (DIFC)** and the **United Arab Emirates (UAE)**. Any dispute will be subject to the exclusive jurisdiction of the courts of Dubai.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}