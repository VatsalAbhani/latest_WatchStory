import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Seo
        title="Privacy Policy"
        description="Our Privacy Policy outlines how WatchStory Trading LLC collects, uses, protects, and handles your Personally Identifiable Information in connection with our services."
        canonical="/privacy-policy"
      />
      <div className="ws-container pt-16 pb-24 max-w-4xl mx-auto">
        <h1 className="font-title text-5xl mb-4 text-gold">Privacy Policy</h1>
        <p className="text-offwhite/70 text-sm mb-12">
          Effective Date: October 24, {new Date().getFullYear()}
        </p>

        <section className="space-y-8 text-offwhite/80">
          <p>
            This Privacy Policy governs the manner in which **WatchStory Trading LLC** (referred to as "WatchStory", "we", "us", or "our") collects, uses, maintains, and discloses information collected from users (each, a "User") of the watchstory.com website ("Site"). This policy applies to the Site and all products and services offered by WatchStory Trading LLC.
          </p>

          {/* --- Section 1: Information Collection --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">1. Information We Collect</h2>
            <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. We collect:</p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-2">
              <li>**Identity and Contact Data:** Name, email address, phone number (especially WhatsApp for communication), and billing/shipping address.</li>
              <li>**Transactional Data:** Details about payments to and from you, and other details of products and services you have purchased from us (including watch model, reference number, and price).</li>
              <li>**Technical Data:** Internet protocol (IP) address, browser type and version, time zone setting and location, operating system, and platform.</li>
              <li>**Image Data:** Photographs of watches uploaded for valuation or sale, which are used solely for authentication and marketing purposes.</li>
            </ul>
          </div>

          {/* --- Section 2: How We Use Collected Information --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">2. How We Use Collected Information</h2>
            <p>WatchStory may collect and use Users' personal information for the following purposes:</p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-2">
              <li>**To Process Transactions:** To fulfill and manage purchases, sales, and service requests (e.g., watch valuation and payment processing).</li>
              <li>**To Improve Customer Service:** Information provided helps us respond to your customer service requests and support needs more efficiently, particularly concerning authentication and warranty claims.</li>
              <li>**To Personalize User Experience:** To understand how our Users use the services and resources provided on our Site.</li>
              <li>**To Send Periodic Emails:** We may use the email address to send User information and updates pertaining to their order, and occasionally company news or promotions, which you can opt-out of at any time.</li>
            </ul>
          </div>

          {/* --- Section 3: Data Protection and Storage --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">3. Data Protection and Storage</h2>
            <p>
              We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Site. All sensitive data exchanged between the Site and its Users happens over an SSL secured communication channel and is encrypted.
            </p>
            <p>
              Your data may be stored on secure servers located within or outside the UAE, and we take all reasonable steps to ensure compliance with relevant data protection laws.
            </p>
          </div>

          {/* --- Section 4: Sharing Your Personal Information --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">4. Sharing Your Personal Information</h2>
            <p>
              We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above. We may use third-party service providers (e.g., shipping companies, payment processors, and certified watch authenticators) to help us operate our business and the Site or administer activities on our behalf.
            </p>
          </div>
          
          {/* --- Section 5: Contacting Us --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">5. Contacting Us</h2>
            <p>
              If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
            </p>
            <p className="mt-2 font-bold">
              WatchStory Trading LLC<br />
              Email: info@watchstory.com<br />
              Phone: +971 54 505 6156 (WhatsApp preferred)<br />
              Address: Dubai, United Arab Emirates
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
