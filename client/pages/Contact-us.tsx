import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const ORIGIN = "https://watchstory.ae";

function ContactJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "WatchStory",
      "url": ORIGIN,
      "logo": `${ORIGIN}/F1.png`,
      "contactPoint": [{
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "info@watchstory.ae",
        "telephone": "+971-54-505-6156",
        "areaServed": "AE",
        "availableLanguage": ["en", "ar", "hi"]
      }]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export default function ContactUsPage() {
  const title = "Contact WatchStory";
  const description =
    "Contact WatchStory for buying, selling, or valuing luxury watches in Dubai. Fast responses, expert guidance, and transparent service.";

  // Simple controlled form (no backend; you can wire it to your API later)
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Hook into your form handler / API / email service
    alert("Thanks—your message has been noted. We will get back to you shortly.");
  };

  return (
    <Layout>
      <Seo
        title={title}
        description={description}
        canonical="/contact"
        ogType="website"
        
      />

      <ContactJsonLd />

      <section className="ws-container mt-24 pb-8">
        <h1 className="font-title text-4xl sm:text-5xl">{title}</h1>
        <p className="text-sm text-offwhite/60 mt-2">Dubai, United Arab Emirates</p>
      </section>

      <section className="ws-container grid md:grid-cols-2 gap-8">
        {/* Contact details */}
        <div className="prose prose-gray">
          <h2>Talk to us</h2>
          <p>
            Buying, selling, or valuing a watch — our team is here to help with fast, transparent guidance.
          </p>

          <h3>Direct lines</h3>
          <ul>
            <li>Email: <a href="mailto:hello@watchstory.ae">info@watchstory.ae</a></li>
            <li>Phone: <a href="tel:+971545056156">+971 54 505 6156</a></li>
            <li>WhatsApp: <a href="https://wa.me/971545056156" target="_blank" rel="noopener noreferrer">Message us</a></li>
          </ul>

          <h3>Business hours</h3>
          <p>Mon-Sat, 10:00 - 19:00 (GST)</p>

          <h3>Location</h3>


          

          <p>The Bureau Business Center — Opera Grand<br />
      Downtown Dubai</p>

          {/* Optional: Map embed — replace the src with your map link when ready */}
          {/* <div className="rounded-md overflow-hidden border border-border/50">
            <iframe
              title="WatchStory Location"
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="240"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div> */}
        </div>

        {/* Contact form */}
        <form 
        name="contact-form"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  onSubmit={onSubmit} 
  className="rounded-md border border-border/50 p-4"
  >

{/* --- HIDDEN FIELDS FOR NETLIFY --- */}
<input type="hidden" name="form-name" value="contact-form" />
        <input type="hidden" name="sell-bot-field" />

          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="bg-transparent rounded-md border border-border/50 px-3 py-2"
                placeholder="Your name"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                className="bg-transparent rounded-md border border-border/50 px-3 py-2"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm">Phone</span>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="bg-transparent rounded-md border border-border/50 px-3 py-2"
                placeholder="+971 …"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                className="bg-transparent rounded-md border border-border/50 px-3 py-2 min-h-[120px]"
                placeholder="How can we help?"
                required
              />
            </label>

            <button
              type="submit"
              className="rounded-md border border-border/50 px-4 py-2 hover:bg-white/5 transition"
            >
              Send message
            </button>
          </div>

          <p className="text-xs text-offwhite/60 mt-3">
            By submitting, you agree that we may contact you regarding your inquiry. We respect your privacy.
          </p>
        </form>
      </section>

      <section className="ws-container py-12">
        <a href="/blog" className="underline text-offwhite/70 hover:text-offwhite">Back to Journal</a>
      </section>
    </Layout>
  );
}
