import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import React from 'react';

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();
  const effectiveDate = "October 24, " + currentYear;
  
  return (
    <Layout>
      <Seo
        title="Privacy Policy | WatchStory Trading LLC"
        description="Our detailed Privacy Policy for WatchStory Trading LLC outlines how we handle, process, and protect your personal data for sales, sourcing, and authentication services in Dubai and internationally."
        canonical="/privacy-policy"
      />
      <div className="ws-container mt-24 pt-16 max-w-4xl mx-auto">
        <h1 className="font-title text-5xl mb-4 text-gold">Privacy Policy</h1>
        {/* <p className="text-offwhite/70 text-sm mb-12">
          Effective Date: {effectiveDate}
        </p> */}

        <section className="space-y-10 text-offwhite/80">
          
          {/* --- INTRODUCTION --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">Introduction</h2>
            <p className="font-sans">
              <strong>WatchStory Trading LLC</strong> (Trading as WatchStory) ("We") are committed to protecting and respecting your privacy. This policy (together with our <a href="/terms-conditions" className="text-gold hover:underline">Terms & Conditions</a> and any other documents referred to on it) sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed by us.
            </p>
            <p className="mt-3">
              For the purpose of data governance, the data controller is <strong>WatchStory Trading LLC</strong>, operating in the Emirate of Dubai, United Arab Emirates.
            </p>
          </div>

          {/* --- INFORMATION WE MAY COLLECT --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">1. Information We May Collect From You</h2>
            <p>We may collect and process the following data about you:</p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-2">
              <li><strong>Identity & Registration Information:</strong> Information provided when registering, subscribing to our service, posting material, or requesting services (e.g., name, contact detail, preferred method of contact).</li>
              <li><strong>Correspondence Records:</strong> If you contact us, we may keep a record of that correspondence for quality and legal purposes.</li>
              <li><strong>Transactional Details:</strong> Details of transactions you carry out through our site, including payment details, watch model, reference number, and fulfillment of your orders (e.g., shipping tracking).</li>
              <li><strong>Usage Data:</strong> Details of your visits to our site including, but not limited to, traffic data, location data, weblogs, and the resources that you access (see also IP Addresses and Cookies).</li>
              <li><strong>Image Data:</strong> Photographs of watches uploaded for valuation or sale, used solely for authentication and market assessment.</li>
            </ul>
          </div>
          
          {/* --- IP ADDRESSES --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">2. IP Addresses and Device Information</h2>
            <p>
              We may collect information about your device, including your IP address, operating system, and browser type, for system administration and to report aggregated, non-identifiable information to our service providers and advertisers. This is statistical data about our users' browsing actions and patterns and does not identify any individual User.
            </p>
          </div>

          {/* --- WHERE WE STORE YOUR PERSONAL DATA --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">3. Where We Store Your Personal Data</h2>
            <p>
              The data that we collect from you may be transferred to, and stored at, a secure destination outside the <strong>United Arab Emirates (UAE)</strong>. This may be for processing by staff who work for us or for one of our secure service providers (e.g., international shipping, cloud hosting).
            </p>
            <p className="mt-3">
              By submitting your personal data, you agree to this transfer and processing. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this privacy policy and international best practices, including where applicable, GDPR principles for international transfers.
            </p>
            <p className="mt-3">
              All information you provide to us is stored on secure servers. Any payment transactions will be encrypted using SSL technology. While we employ strict procedures to prevent unauthorized access, the transmission of information via the internet is not completely secure; any transmission is at your own risk.
            </p>
          </div>

          {/* --- USES MADE OF THE INFORMATION --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">4. Uses Made of the Information</h2>
            <p>We use information held about you in the following ways:</p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-2">
              <li><strong>Service Presentation:</strong> To ensure that content from our site is presented in the most effective manner for you and your device.</li>
              <li><strong>Transactional Quoting:</strong> To provide you with information, quotes, or services that you request from us (e.g., watch valuation and sourcing). Details of the watch you selected will be stored so we can return a written quote and send relevant offers.</li>
              <li><strong>Contract Fulfillment:</strong> To carry out our obligations arising from any contracts entered into between you and us (sales, purchases, and warranty).</li>
              <li><strong>Marketing & Promotions:</strong> To provide information about goods and services which we feel may interest you, where you have consented to be contacted for such purposes.</li>
              <li><strong>Market Research:</strong> To conduct internal market research on trends and demand for luxury watches in Dubai and internationally.</li>
            </ul>
          </div>

          {/* --- COMMUNICATIONS BETWEEN US & THIRD PARTY RIGHTS --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">5. Disclosure of Your Information</h2>
            <p>
              We do not sell your personal data. We may disclose your personal information to third parties in the following limited circumstances:
            </p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-2">
              <li><strong>Watch Sourcing/Quoting:</strong> If WatchStory does not have a supplier for a particular watch, we may pass your details on to a carefully selected, authorized third-party watch dealer so they can quote on price and availability (only with your express consent during the enquiry).</li>
              <li><strong>Business Transactions:</strong> In the event that we sell or buy any business or assets, in which case we may disclose your personal data to the prospective seller or buyer.</li>
              <li><strong>Legal Compliance:</strong> If we are under a duty to disclose or share your personal data to comply with any legal obligation under UAE law, or to protect the rights, property, or safety of WatchStory, our customers, or others (e.g., fraud protection).</li>
              <li><strong>Group Entities:</strong> To any member of our group, which means our subsidiaries, our ultimate holding company, and its subsidiaries, as necessary to provide goods and services to you.</li>
            </ul>
          </div>
          
          {/* --- YOUR RIGHTS --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">6. Your Rights and Marketing Preferences</h2>
            <p>
              You have the right to ask us not to process your personal data for marketing purposes. You can exercise this right at any time by contacting us directly or by clicking on the <strong>unsubscribe link</strong> displayed at the end of our email correspondence.
            </p>
            <p className="mt-3">
              Our site may contain links to websites of our partner networks, advertisers, and affiliates. We do not accept any responsibility or liability for these external policies; please check their policies before submitting any personal data.
            </p>
          </div>

          {/* --- COOKIES POLICY --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">7. Cookies Policy</h2>
            <p>
              We obtain information about your general internet usage by using "cookies" (small text files stored on your browser or hard drive). Cookies help us to improve our site, customize our service, and provide relevant offers tailored to your interests.
            </p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-2">
              <li><strong>Essential Cookies:</strong> Some cookies are strictly necessary for the site to operate, enabling features like keeping items in your shopping basket.</li>
              <li><strong>Functionality Cookies:</strong> These allow us to remember your preferences and recognize you when you return to our site.</li>
              <li><strong>Analytics Cookies:</strong> These help us estimate our audience size and usage pattern.</li>
            </ul>
            <p className="mt-3">
            <strong>Consent:</strong> By continuing to use our site, you agree to our use of cookies. You can block cookies by activating the setting on your browser which allows you to refuse the setting of all or some cookies. However, blocking essential cookies may prevent you from accessing parts of our site.
            </p>
          </div>

          {/* --- CONTACT --- */}
          <div>
            <h2 className="font-title text-3xl mb-3 text-offwhite">8. Contact and Policy Changes</h2>
            <p>
              Any changes we may make to our privacy policy in the future will be posted on this page and, where appropriate, notified to you by e-mail.
            </p>
            <p className="mt-3">
              Questions, comments, and requests regarding this privacy policy are welcomed and should be addressed to:
            </p>
            <p className="mt-2 font-bold">
              Email: info@watchstory.ae<br />
              Address: WatchStory Trading LLC, Dubai, United Arab Emirates
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}