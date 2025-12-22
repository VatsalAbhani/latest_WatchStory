// sell page


import Layout from "@/components/Layout";
import { useEffect, useState, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CyclingLines from "@/components/CyclingLines";
import { cn } from "@/lib/utils"; 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; 
import { AnimatedButton } from "@/components/AnimatedButton";
import Seo from "@/components/Seo";

// --- 1. UPDATED SHARED INTERFACE FOR DATA (File changed to File[]) ---
interface SellFormData {
  fullName: string;
  brand: string;
  model: string;
  reference: string;
  year: number | '';
  conditionNotes: string;
  // EXPANDED OPTIONS
  boxAndPapers: 'Yes' | 'No' | 'Only box' | 'Only papers';
  askingPrice: number | '';
  location: string;
  // DEFINED CONTACT OPTIONS - Only WhatsApp remains
  contactMethod: 'WhatsApp';
  // NEW FIELD FOR CONTACT DETAIL
  contactDetail: string;
  preferredPayout: string;
  // CRITICAL CHANGE: Use File[] for reliable state management
  'upload-photos': File[]; 
}

// --- 2. FAQ DATA & SCHEMA (Unchanged) ---

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How quickly will I receive an offer for my watch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Once you submit your watch details, our specialists usually provide an initial valuation within 24 hours on business days. For certain high-demand models, we may respond even faster."
      }
    },
    {
      "@type": "Question",
      "name": "How fast do I get paid once I accept your offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For Dubai-based sellers, payment is typically completed on the same day that the watch is authenticated and the offer is accepted. Depending on your preference, we can pay by bank transfer or cash."
      }
    },
    {
      "@type": "Question",
      "name": "Do you buy watches without original box and papers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we regularly purchase watches without their original box and papers. However, complete sets with full provenance usually achieve stronger market prices, so valuations are adjusted accordingly."
      }
    },
    {
      "@type": "Question",
      "name": "How do you determine the offer or market price for my watch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our valuation team reviews the exact reference number, year of production, condition grade, and whether the watch is a full set. We then cross-check against recent secondary market sales and live demand in Dubai and globally to arrive at a fair, market-based offer."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to visit your office in Dubai to sell my watch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you are in Dubai, we encourage private appointments so you can meet us in person. For sellers outside of Dubai or overseas, we can arrange secure, fully insured shipping so that your watch reaches our authentication center safely."
      }
    },
    {
      "@type": "Question",
      "name": "Which brands do you buy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We focus on leading luxury houses such as Rolex, Audemars Piguet, Patek Philippe, Richard Mille and Cartier, alongside select models from other established Swiss brands. If you are unsure whether your watch qualifies, simply submit the form and our team will guide you."
      }
    },
    {
      "@type": "Question",
      "name": "Is there any fee or obligation if I request an offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Requesting an offer from WatchStory is completely free and comes with no obligation to sell. You are welcome to use our valuation as a reference point when considering your options."
      }
    }
  ]
};


const FAQ_ITEMS = [
  {
    question: "How quickly will I receive an offer for my watch?",
    answer: "Once you submit your watch details, our specialists usually provide an initial valuation within 24 hours on business days."
  },
  {
    question: "How fast do I get paid once I accept your offer?",
    answer: "For Dubai-based sellers, payment is typically completed on the same day that the watch is authenticated and the offer is accepted."
  },
  {
    question: "Do you buy watches without original box and papers?",
    answer: "Yes, we regularly purchase watches without their original box and papers. Complete sets may achieve higher valuations, so offers are adjusted accordingly."
  },
  {
    question: "How do you determine the offer or market price for my watch?",
    answer: "We review your reference number, year, condition, and whether it is a full set, then compare to recent secondary market sales and current demand in Dubai and worldwide."
  },
  {
    question: "Do I need to visit your office in Dubai to sell my watch?",
    answer: "If you are in Dubai, we can arrange a private appointment. If you are abroad or outside Dubai, we can coordinate secure, insured shipping to our authentication center."
  },
  {
    question: "Which brands do you buy?",
    answer: "We specialise in Rolex, Audemars Piguet, Patek Philippe, Richard Mille, Cartier and Omega, along with select models from other luxury brands."
  },
  {
    question: "Is there any fee or obligation if I request an offer?",
    answer: "No. Receiving a valuation from WatchStory is completely free and comes with no obligation to sell."
  }
];


function SellPageFAQ() {
  return (
    <section className="ws-container pt-16 pb-12">
      <h2 className="font-title text-3xl mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-b border-border/50" 
          >
            <AccordionTrigger className="text-lg transition-colors text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-offwhite/70">
              <p className="pl-4">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}



export default function Sell() {
  return (
    <Layout>
<Helmet>
  <script type="application/ld+json">
    {JSON.stringify(FAQ_SCHEMA)}
  </script>
</Helmet>

        <Seo
          title="Sell Your Luxury Watch in Dubai | Instant Quote & Safe Payment"
          description="Get the best price for your Rolex, AP, Patek & more in Dubai. Same-day payment and expert valuation."
          canonical="/sell"
        />

        {/* SEO search engine */}






















      <section className="ws-container mt-24 pt-16 pb-0 md:pb-8 bg-background">




















        <h1 className="font-title font-normal text-4xl sm:text-5xl max-w-6xl">
        Sell Your Luxury Watch in Dubai - Get an Offer Today
        </h1>

        <h2 className="font-sans font-light text-base text-offwhite/80 mt-2 max-w-4xl">
        Share your Rolex, Audemars Piguet, Patek Philippe, Cartier or Richard Mille details and receive a fair, market-based offer with fast, secure payout.
        </h2>










        <CyclingLines
          className="mt-2 text-2xl sm:text-3xl font-sans"
          lines={[
            "Get Instant Payment",
            "Fair, Market-Based Offers",
            
            "Expert Authentication",
            "Free Insured Shipping",
            
          ]}
          cycleIntervalSec={2.5}
          perLetterDurationSec={1}
          easing="ease-in-out"
          letterStaggerSec={0.04}
        />
      </section>

      {/* Sell Form */}
      <section className="ws-container pb-16">
        <SingleStepSellForm />
      </section>




      <section className="ws-container pt-6 pb-8">
  <div className="grid gap-4 md:grid-cols-3 text-sm text-offwhite/80">
    <div>
      <h3 className="font-title text-lg mb-1">1. Share Your Watch Details</h3>
      <p>Tell us the brand, model, reference and year, and upload a few clear photos.</p>
    </div>
    <div>
      <h3 className="font-title text-lg mb-1">2. Get a Fair Market Offer</h3>
      <p>Our specialists review your watch against current Dubai market data and send an offer on WhatsApp.</p>
    </div>
    <div>
      <h3 className="font-title text-lg mb-1">3. Final Check & Fast Payout</h3>
      <p>After authentication, you receive secure payment by bank transfer or cash, with full transparency.</p>
    </div>
  </div>
</section>










      {/* NEW FAQ SECTION */}
      <SellPageFAQ />
    </Layout>
  );
}

// ====================================================================
// --- Utility Components (Unchanged) ---

function Field({ label, children, className, required }: { label: string; children: React.ReactNode; className?: string; required?: boolean }) {
  return (
    <label className={cn("block", className)}>
      <div className="text-sm text-offwhite/70 mb-1 font-bold">
      {label}
      {/* CONDITIONAL ASTERISK FOR REQUIRED FIELDS */}
      {required && <span className="!text-red-500 ml-1">*</span>}
      </div>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full bg-transparent border px-3 py-2 rounded-md placeholder:text-offwhite/40" name={props.name} />
}
function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className="w-full bg-transparent border px-3 py-2 rounded-md" name={props.name} />
}
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="w-full min-h-24 bg-transparent border px-3 py-2 rounded-md" name={props.name} />
}


// ====================================================================
// --- SINGLE STEP FORM COMPONENT (UPDATED FOR FILE ARRAY STATE) ---

function SingleStepSellForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);


  const [formData, setFormData] = useState<Partial<SellFormData>>({
    fullName: '',
    brand: 'Rolex',
    model: '',
    reference: '',
    year: '',
    conditionNotes: '',
    boxAndPapers: 'Yes',
    askingPrice: '',
    contactMethod: 'WhatsApp', 
    contactDetail: '',
    'upload-photos': [], // Initialized as empty array
  });

  const handleChange = useCallback((field: keyof SellFormData, value: any) => {
    // Note: The signature here is slightly simplified, as 'upload-photos' only expects File[] now.
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

// ---------------------

// *** REFACTORED: FILE CHANGE HANDLER USING File[] ***
const handleFileChange = useCallback((files: FileList | null) => {
  if (!files || files.length === 0) return;
  setFormData(prev => {
    const existing = prev['upload-photos'] || [];
    const merged = existing.concat(Array.from(files));
    return { ...prev, 'upload-photos': merged };
  });
  // allow selecting more files again in a new dialog
  if (fileInputRef.current) fileInputRef.current.value = '';
}, []);

// ---------------------
// *** REFACTORED: FILE REMOVAL HANDLER USING File[] ***

const handleRemoveFile = useCallback((indexToRemove: number) => {
  setFormData(prev => {
    const existing = prev['upload-photos'] || [];
    const updated = existing.filter((_, i) => i !== indexToRemove);
    return { ...prev, 'upload-photos': updated };
  });
}, []);

// ---------------------


  // Build FormData for Netlify (AJAX)
  const buildFormData = () => {
    const fd = new FormData();
    fd.append('form-name', 'sell-watch-request');
    fd.append('sell-bot-field', ''); // honeypot blank

    // text fields
    fd.append('fullName', formData.fullName ?? '');
    fd.append('brand', formData.brand ?? '');
    fd.append('model', formData.model ?? '');
    fd.append('reference', formData.reference ?? '');
    fd.append('year', String(formData.year ?? ''));
    fd.append('boxAndPapers', formData.boxAndPapers ?? 'Yes');
    fd.append('askingPrice', String(formData.askingPrice ?? ''));
    fd.append('conditionNotes', formData.conditionNotes ?? '');
    fd.append('contactMethod', formData.contactMethod ?? 'WhatsApp');
    fd.append('contactDetail', formData.contactDetail ?? '');

    // files (append each one under the same field name)
    const files = formData['upload-photos'] || [];
    files.forEach(file => {
      fd.append('upload-photos[]', file, file.name);
    });

    return fd;
  };




// Netlify-friendly submission handler: Only for validation and setting loading state.
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
//     // Simple validation before allowing native form submit
//     if (
//         !formData.fullName || 
//         !formData.brand || 
//         !formData.model || 
//         !formData.reference || 
//         !formData.year ||
//         !formData.askingPrice || 
//         !formData.contactDetail ||
//         // Check if files exist (now that it's a File[] array)
//         (formData['upload-photos']?.length === 0) 
//       ) {
//         alert("Please fill in all required fields and upload at least one photo (marked with an asterisk *).");
//         e.preventDefault(); // Stop the form submit if validation fails
//         return;
//     }

// // Set loading state for UI feedback.
// setLoading(true);

// // CRITICAL: We do NOT call e.preventDefault(), allowing the browser to execute the native POST.
// };



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // AJAX path
  // basic validation against state
  if (
    !formData.fullName ||
    !formData.brand ||
    !formData.contactDetail
  ) {
    alert("Please fill in all required fields (marked with *).");
    return;
  }

  try {
    setLoading(true);
    const body = buildFormData();
    // IMPORTANT: post to "/" so Netlify intercepts it
    const resp = await fetch('/', { method: 'POST', body });
    // Netlify returns HTML redirect; if OK, send user to success page
    if (resp.ok) {
      // Full page navigation so Netlify can serve /success.html
      window.location.href = '/success';
      // or: window.location.replace('/success');
    } else {
      alert('Submission failed. Please try again.');
    }
    
  } catch (err) {
    alert('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};







  const contactType = formData.contactMethod;
  const contactInputLabel = 'Your WhatsApp Number';
  const contactInputType = 'text';

  // Helper to get the File array for easier rendering
  const uploadedFiles = formData['upload-photos'] || [];


  return (
    <div className="border rounded-xl bg-card/60">
      <h2 className="px-4 pt-2 font-sans text-xl font-normal">
          Submit your watch details
      </h2>
      <p className="px-4  pb-2 border-b text-xs text-offwhite/50">
  We respond to most sell requests within 24 hours by WhatsApp. Your information is kept strictly confidential and never shared.
</p>
      <form 
      className="p-6 grid font-sans md:grid-cols-2 gap-4" 
      onSubmit={handleSubmit}
      name="sell-watch-request"        // 1. Mandatory form name for Netlify
      method="POST"                    // 2. Mandatory method POST
      data-netlify="true"              // 3. Enable Netlify processing
      netlify-honeypot="sell-bot-field"  // 4. Honeypot
      encType="multipart/form-data"    // 5. ESSENTIAL for file uploads
      // action="/success"
      >

{/* --- HIDDEN FIELDS FOR NETLIFY (Note: These inputs are ignored by Netlify's multipart handler, but the form-name is essential) --- */}
<input type="hidden" name="form-name" value="sell-watch-request" />
<input type="hidden" name="sell-bot-field" />
        
{/* --- NEW ROW: FULL NAME (REQUIRED) --- */}
<Field label="Full Name" className="md:col-span-2" required>
    <Input
        
        name="fullName" 
        placeholder="John Smith"
        value={formData.fullName || ''}
        onChange={e => handleChange('fullName', e.target.value)}
    />
</Field>

        {/* --- ROW 1: BRAND & MODEL (REQUIRED) --- */}
        <Field label="Brand" required>
          <Select
            
            name="brand"
            value={formData.brand}
            onChange={e => handleChange('brand', e.target.value)}
          >
            <option>Rolex</option>
            <option>Audemars Piguet</option>
            <option>Richard Mille</option>
            <option>Patek Philippe</option>
            <option>Cartier</option>
            <option>Other</option>
          </Select>
        </Field>


        <Field label="Model" >
          <Input
            
            name="model" 
            placeholder="Submariner Date"
            value={formData.model || ''}
            onChange={e => handleChange('model', e.target.value)}
          />
        </Field>

        {/* --- ROW 2: REFERENCE & YEAR (REQUIRED) --- */}
        <Field label="Reference No." >
          <Input
            
            name="reference" 
            placeholder="126610LN"
            value={formData.reference || ''}
            onChange={e => handleChange('reference', e.target.value)}
          />
        </Field>
        
        <Field label="Year" >
          <Input
            type="number"
            name="year"
            placeholder="2022"
            
            value={formData.year || ''}
            onChange={e => handleChange('year', Number(e.target.value))}
          />
        </Field>

        {/* --- ROW 3: BOX & PRICE (PRICE REQUIRED) --- */}
        <Field label="Box & Papers" >
          <Select
            name="boxAndPapers" 
            value={formData.boxAndPapers}
            onChange={e => handleChange('boxAndPapers', e.target.value as SellFormData['boxAndPapers'])}
          >
            <option>Yes</option>
            <option>No</option>
            <option>Only box</option>
            <option>Only papers</option>
          </Select>
        </Field>
        <Field label="Asking price (AED)" >
          <Input
            type="number"
            name="askingPrice"
            placeholder="0"
            
            value={formData.askingPrice || ''}
            onChange={e => handleChange('askingPrice', Number(e.target.value))}
          />
        </Field>

        {/* --- ROW 4: CONDITION NOTES (Full Width) --- */}
        <Field label="Condition notes" className="md:col-span-2">
          <Textarea
            name="conditionNotes" 
            placeholder="Surface wear, hairlines, etc."
            value={formData.conditionNotes || ''}
            onChange={e => handleChange('conditionNotes', e.target.value)}
          />
        </Field>

        {/* --- ROW 5: CONTACT METHOD (WHATSAPP DETAIL REQUIRED) --- */}
        <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
          <Field label="Preferred Contact Method">
            <Select
              name="contactMethod"
              value={contactType}
              onChange={e => {
                handleChange('contactMethod', e.target.value as SellFormData['contactMethod']);
                handleChange('contactDetail', '');
              }}
            >
              <option>WhatsApp</option>
            </Select>
          </Field>

          {/* CONDITIONAL CONTACT INPUT FIELD (REQUIRED) */}
          <Field label={contactInputLabel} key={contactType} required>
            <Input
              type={contactInputType}
              name="contactDetail" 
              placeholder={'e.g., +971 50 123 4567'}
              
              value={formData.contactDetail || ''}
              onChange={e => handleChange('contactDetail', e.target.value)}
            />
          </Field>
        </div>

        {/* --- ROW 7: FILE UPLOAD (Full Width) --- */}
        <Field label="Upload photos" className="md:col-span-2" >
          <Input 
            type="file" 
            accept="image/*" 
            multiple 
            name="upload-photos[]" // Netlify requires this format for file arrays
            className="block text-sm py-1" 
            onChange={e => handleFileChange(e.target.files)}
          />
          {/* File list display and removal buttons */}
          {uploadedFiles.length > 0 && (
            <div className="mt-2 space-y-1 text-sm text-offwhite/70">
              <p className="font-bold text-xs">{uploadedFiles.length} Photo(s) Added:</p>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-card/40 rounded text-xs">
                  <span className="truncate pr-2">{file.name}</span>
                          <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="text-red-400 hover:text-red-300 font-bold ml-2 transition-colors"
                              aria-label={`Remove ${file.name}`}
                          >
                              {/* Simple X SVG Icon */}
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                          </button>
                      </div>
                  ))}
              </div>
          )}
        </Field>

        {/* --- SUBMIT BUTTON --- */}
        <div className="md:col-span-2 flex justify-end pt-2">
          <AnimatedButton
            type="submit"
            text="Submit Request"
            hoverText="Get Offer Now"
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
}