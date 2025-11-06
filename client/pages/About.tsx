import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Helmet } from "react-helmet-async";

const ORIGIN = "https://watchstory.ae";

function AboutJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "WatchStory Trading LLC",
      "url": ORIGIN,
      "logo": `${ORIGIN}/F1.png`,
      "founder": {
        "@type": "Person",
        "name": "Raj Abhani"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "info@watchstory.ae",
        "telephone": "+971-54-505-6156",
        "areaServed": "AE"
      },


        "sameAs": [
          "https://www.instagram.com/watchstory.uae/",
          "https://www.linkedin.com/company/watchstoryuae/"
        ]
    }


  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export default function AboutPage() {
  const title = "About WatchStory | Authentic Pre-Owned Luxury Watches in Dubai";
  const description =
    "WatchStory is a Dubai-based luxury watch shop focused on authenticity, transparency, and service. 12-month warranty, secure transactions, and expert guidance. More than time, a story on your wrist.";
  
  return (
    <Layout>
      <Seo
        title={title}
        description={description}
        canonical="/about"
        ogType="website"
        ogImage="/og/watchstory-og.jpg"
      />

      <AboutJsonLd />

      <section className="ws-container pt-16 pb-8">
        <h1 className="font-title text-4xl sm:text-5xl">{title}</h1>
        <p className="text-sm text-offwhite/60 mt-2">
          Dubai, United Arab Emirates
        </p>
      </section>

      <section className="ws-container prose prose-gray">
        <p>
          Founded in Dubai, WatchStory exists for collectors and enthusiasts who believe every watch holds meaning.
          We buy, sell, and advise on fine timepieces with a singular promise: authenticity first, always.
        </p>
        <p>
          Our approach is simple. Verify every detail, document every service, and communicate with complete transparency.
          From modern icons to historic references, we focus on the pieces that stand the test of time.
        </p>

        <h2>What We Stand For</h2>
        <ul>
          <li><strong>Authenticity:</strong> every piece inspected, documented, and backed with confidence.</li>
          <li><strong>Transparency:</strong> straight pricing, clear communication, no surprises.</li>
          <li><strong>Service:</strong> friendly, expert guidance whether you are buying or selling.</li>
        </ul>

        <h2>Our Promise</h2>
        <p>
          Your trust matters. We treat each transaction with the care of a private collection and the standards of a professional desk.
          If a watch is not right for you, we will say so.
        </p>

        <blockquote>
          WatchStory — More than time, a story on your wrist.
        </blockquote>

        <h2>Get In Touch</h2>
        <p>
          For valuations, sourcing, or private appointments, reach us at{" "}
          <a href="mailto:hello@watchstory.ae">info@watchstory.ae</a> or{" "}
          <a href="tel:+971545056156">+971 54 505 6156</a>.
        </p>
      </section>

      <section className="ws-container py-12">
        <div className="rounded-md border border-border/50 p-4 text-sm text-offwhite/70">
          <p className="mb-1">Business hours: Mon–Sat, 10:00 – 19:00 (GST)</p>
          <p>Location: Dubai, United Arab Emirates</p>
        </div>
      </section>
    </Layout>
  );
}
