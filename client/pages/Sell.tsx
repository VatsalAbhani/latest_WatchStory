
// // import Layout from "@/components/Layout";
// // import { useEffect, useState, useCallback } from "react";
// // import { Helmet } from "react-helmet-async";
// // import CyclingLines from "@/components/CyclingLines";
// // import { cn } from "@/lib/utils"; // ADDED cn import for styling utility
// // import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; 
// // import { AnimatedButton } from "@/components/AnimatedButton";
// // import Seo from "@/components/Seo";

// // // --- 1. UPDATED SHARED INTERFACE FOR DATA ---
// // interface SellFormData {
// //   brand: string;
// //   model: string;
// //   reference: string;
// //   year: number | '';
// //   conditionNotes: string;
// //   // EXPANDED OPTIONS
// //   boxAndPapers: 'Yes' | 'No' | 'Only box' | 'Only papers';
// //   askingPrice: number | '';
// //   location: string;
// //   // DEFINED CONTACT OPTIONS
// //   contactMethod: 'Email' | 'Phone number' | 'WhatsApp';
// //   // NEW FIELD FOR CONTACT DETAIL
// //   contactDetail: string;
// //   preferredPayout: string;
// //   'upload-photos': FileList | null;
// // }

// // // --- 2. API FETCH HELPER (URL Corrected for Public Endpoint) ---
// // // const API_BASE_URL = "http://127.0.0.1:8000";


// // const FAQ_SCHEMA = {
// //   "@context": "https://schema.org",
// //   "@type": "FAQPage",
// //   "mainEntity": [
// //     // 1 
// //     {
// //       "@type": "Question",
// //       "name": "How long does the valuation process take?",
// //       "acceptedAnswer": {
// //         "@type": "Answer",
// //         "text": "Once you submit your watch details, our specialists typically provide an initial offer within 24 to 48 hours. The final offer is confirmed after physical inspection and authentication."
// //       }
// //     },
// //     // 2
// //     {
// //       "@type": "Question",
// //       "name": "Is shipping insured and how does it work?",
// //       "acceptedAnswer": {
// //         "@type": "Answer",
// //         "text": "Yes, all shipping arranged by WatchStory is fully insured for the full market value of the watch, using secure, trackable methods. We provide detailed, prepaid shipping labels."
// //       }
// //     },
// //     // 3
// //     {
// //       "@type": "Question",
// //       "name": "How does the authentication process work?",
// //       "acceptedAnswer": {
// //         "@type": "Answer",
// //         "text": "Every watch is meticulously inspected by our master watchmakers. We verify the movement, serial numbers, provenance (box and papers), and material integrity to guarantee authenticity before finalizing the transaction. We specialize in authenticating Rolex, Audemars Piguet, and Patek Philippe references."
// //       }
// //     },
// //     // 4
// //     {
// //       "@type": "Question",
// //       "name": "What payout methods are supported?",
// //       "acceptedAnswer": {
// //         "@type": "Answer",
// //         "text": "We support several secure payout methods, including bank transfer, escrow services, and in-person cash transactions depending on your location and preference for speed and security."
// //       }
// //     },

// //     // 5

// //     {
// //       "@type": "Question",
// //       "name": "What documentation is required to sell my watch (Box & Papers)?",
// //       "acceptedAnswer": {
// //         "@type": "Answer",
// //         "text": "To achieve the best market price, we require your watch's original Box and Papers (provenance). We can still purchase watches without these, but valuation will be adjusted based on the missing history."
// //       }
// //     },

// //         // 6

// //         {
// //           "@type": "Question",
// //           "name": "Do you buy watches from outside of Dubai or the UAE?",
// //           "acceptedAnswer": {
// //             "@type": "Answer",
// //             "text": "While we are specialists located in Dubai, we accept sell requests globally. We provide fully insured, prepaid shipping labels to securely transport your watch to our authentication center from anywhere in the world."
// //           }
// //         },


// //             // 7

// //     {
// //       "@type": "Question",
// //       "name": "How do you determine the final market price/valuation?",
// //       "acceptedAnswer": {
// //         "@type": "Answer",
// //         "text": "Our valuation process is entirely transparent. We analyze the current secondary market data, recent sales history for your specific reference number (SKU), the watch's condition grade, and the presence of original box and papers."
// //       }
// //     }
// //   ]
// // }




// // // async function submitSellRequest(data: Partial<SellFormData>) {
// // //   const payload = {
// // //     brand: data.brand,
// // //     model: data.model,
// // //     asking_price: Number(data.askingPrice),
// // //     condition: data.conditionNotes || 'Unspecified',

// // //     // Consolidated all details into the description field
// // //     description: `Ref: ${data.reference || 'N/A'}. Year: ${data.year || 'N/A'}. Papers: ${data.boxAndPapers}. Payout: ${data.preferredPayout}. Location: ${data.location || 'N/A'}. Contact: ${data.contactMethod}: ${data.contactDetail || 'N/A'}.`,
// // //   };

// // //   // Target the expected /public/sell-requests endpoint
// // //   const res = await fetch(`${API_BASE_URL}/public/sell-requests`, {
// // //     method: 'POST',
// // //     headers: { 'Content-Type': 'application/json' },
// // //     body: JSON.stringify(payload),
// // //   });

// // //   if (!res.ok) {
// // //     const errorData = await res.json().catch(() => ({ detail: res.statusText }));
// // //     throw new Error(errorData.detail || `HTTP error ${res.status}`);
// // //   }

// // //   return res.json();
// // // }
// // // --- END API FETCH HELPER ---


// // // ====================================================================
// // // --- NEW FAQ COMPONENT ---

// // const FAQ_ITEMS = [
// //   // 1
// //   {
// //     question: "How long does the valuation process take?",
// //     answer: "Once you submit your watch details, our specialists typically provide an initial offer within 24 to 48 hours. The final offer is confirmed after physical inspection and authentication."
// //   },
// //   // 2
// //   {
// //     question: "Is shipping insured and how does it work?",
// //     answer: "Yes, all shipping arranged by WatchStory is fully insured for the full market value of the watch, using secure, trackable methods. We provide detailed, prepaid shipping labels."
// //   },
// //   // 3
// //   {
// //     question: "How does the authentication process work?",
// //     answer: "Every watch is meticulously inspected by our master watchmakers. We verify the movement, serial numbers, provenance (box and papers), and material integrity to guarantee authenticity before finalizing the transaction. We specialize in authenticating Rolex, Audemars Piguet, and Patek Philippe references."
// //   },
// //   // 4
// //   {
// //     question: "What payout methods are supported?",
// //     answer: "We support several secure payout methods, including bank transfer, escrow services, and in-person cash transactions depending on your location and preference for speed and security."
// //   },
// //   // 5

// //   {
// //     question: "What documentation is required to sell my watch (Box & Papers)?",
// //     answer: "To achieve the best market price, we require your watch's original Box and Papers (provenance). We can still purchase watches without these, but valuation will be adjusted based on the missing history."
// //   },
// //   // 6

// //   {
// //     question: "Do you buy watches from outside of Dubai or the UAE?",
// //     answer: "While we are specialists located in Dubai, we accept sell requests globally. We provide fully insured, prepaid shipping labels to securely transport your watch to our authentication center from anywhere in the world."
// //   },
// //   // 7
// //   {
// //     question: "How do you determine the final market price/valuation?",
// //     answer: "Our valuation process is entirely transparent. We analyze the current secondary market data, recent sales history for your specific reference number (SKU), the watch's condition grade, and the presence of original box and papers."
// //   }
  
// // ];

// // function SellPageFAQ() {
// //   return (
// //     <section className="ws-container pt-16 pb-24">
// //       <h2 className="font-title text-3xl mb-8">Frequently Asked Questions</h2>
// //       {/* Set type="single" for one item open at a time */}
// //       <Accordion type="single" collapsible className="w-full">
// //         {FAQ_ITEMS.map((item, index) => (
// //           <AccordionItem
// //             key={index}
// //             value={`item-${index}`}
// //             className="border-b border-border/50" // Apply bottom border for separation
// //           >
// //             <AccordionTrigger className="text-lg transition-colors text-left">
// //               {item.question}
// //             </AccordionTrigger>
// //             <AccordionContent className="text-offwhite/70">
// //               <p className="pl-4">{item.answer}</p>
// //             </AccordionContent>
// //           </AccordionItem>
// //         ))}
// //       </Accordion>
// //     </section>
// //   );
// // }

// // // ====================================================================
// // // --- MAIN PAGE COMPONENT ---

// // export default function Sell() {





// //   useEffect(() => {
// //     // document.title = "Sell Your Luxury Watch | Fast Offers & Authentication — WatchStory";
// //   }, []);

// //   return (
// //     <Layout>
// //         <Helmet>
// //           <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(FAQ_SCHEMA)}} />
// //         </Helmet>
// //             <Seo
// //         title="Sell Your Luxury Watch Fast in Dubai"
// //         description="Get a fair, no-obligation offer in 24 hours to sell your Rolex or luxury timepiece in Dubai. Free insured shipping and expert valuation."
// //         canonical="/sell"
// //       />
// //       <section className="ws-container pt-16 pb-0 md:pb-8 bg-background">
// //         <h1 className="font-title text-4xl sm:text-5xl max-w-6xl">
// //           Sell your watch
// //           </h1>

// //           <h2 className="font-sans text-base text-offwhite/80 mt-2 max-w-4xl">
// //           Sell Your Rolex, Audemars Piguet, Patek Philippe, or Richard Mille Watch in Dubai.
// //         </h2>




// //         {/* <p className="text-offwhite/70 mt-3 max-w-2xl">Get a fair offer fast. Our specialists evaluate condition, provenance, and demand to place your watch with the right collector.</p> */}
// //         <CyclingLines
// //           className="mt-2 text-2xl sm:text-4xl font-sans"
// //           lines={[
// //             "Get instant payment",
// //             "Free insured shipping",
// //             "Expert authentication",
// //             "Fair, market-based offers",
// //             "Offer within 24 hours",
// //           ]}
// //           cycleIntervalSec={2.5}
// //           perLetterDurationSec={1}
// //           easing="ease-in-out"
// //           letterStaggerSec={0.04}
// //         />
// //         {/* <div className="mt-10 grid md:grid-cols-3 gap-6">
// //           <div className="border rounded-lg p-6 bg-card/60">
// //             <h3 className="font-title text-2xl">Evaluation</h3>
// //             <p className="text-offwhite/70 mt-2">Transparent criteria and market-backed pricing.</p>
// //           </div>
// //           <div className="border rounded-lg p-6 bg-card/60">
// //             <h3 className="font-title text-2xl">Authentication</h3>
// //             <p className="text-offwhite/70 mt-2">Movement and materials verified by experts.</p>
// //           </div>
// //           <div className="border rounded-lg p-6 bg-card/60">
// //             <h3 className="font-title text-2xl">Fast payout</h3>
// //             <p className="text-offwhite/70 mt-2">Insured shipping and rapid settlement.</p>
// //           </div>
// //         </div> */}
// //       </section>

// //       {/* Sell Form */}
// //       <section className="ws-container pb-16">
// //         <SingleStepSellForm />
// //       </section>

// //       {/* NEW FAQ SECTION */}
// //       <SellPageFAQ />
// //     </Layout>
// //   );
// // }

// // // ====================================================================
// // // --- Utility Components (Updated to include cn utility) ---

// // function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
// //   return (
// //     <label className={cn("block", className)}>
// //       <div className="text-sm text-offwhite/70 mb-1">{label}</div>
// //       {children}
// //     </label>
// //   );
// // }

// // function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
// //   // IMPORTANT: Added 'name' prop to allow Netlify to capture the field value
// //   return <input {...props} className="w-full bg-transparent border px-3 py-2 rounded-md placeholder:text-offwhite/40" name={props.name} />
// // }
// // function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
// //   // IMPORTANT: Added 'name' prop
// //   return <select {...props} className="w-full bg-transparent border px-3 py-2 rounded-md" name={props.name} />
// // }
// // function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
// //   // IMPORTANT: Added 'name' prop
// //   return <textarea {...props} className="w-full min-h-24 bg-transparent border px-3 py-2 rounded-md" name={props.name} />
// // }



// // // ====================================================================
// // // --- SINGLE STEP FORM COMPONENT ---

// // function SingleStepSellForm() {
// //   const [loading, setLoading] = useState(false);
// //   const [formData, setFormData] = useState<Partial<SellFormData>>({
// //     brand: 'Rolex',
// //     model: '',
// //     reference: '',
// //     year: '',
// //     conditionNotes: '',
// //     boxAndPapers: 'Yes',
// //     askingPrice: '',
// //     location: '',
// //     contactMethod: 'Email',
// //     contactDetail: '',
// //     preferredPayout: 'Bank Transfer',
// //     'upload-photos': null,
// //   });

// //   const handleChange = useCallback((field: keyof SellFormData, value: string | number | 'Yes' | 'No' | 'Only box' | 'Only papers' | FileList | null) => {
// //     setFormData(prev => ({ ...prev, [field]: value }));
// //   }, []);



// // // ---------------------


// // // Netlify-friendly submission handler: Only for validation and setting loading state.
// //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
// //     // Simple validation before allowing native form submit
// //     if (
// //         !formData.brand || 
// //         !formData.model || 
// //         !formData.reference || 
// //         !formData.askingPrice || 
// //         !formData.contactDetail
// //       ) {
// //         alert("Please fill in all required fields (Brand, Model, Reference, Asking Price, and Contact Detail).");
// //         e.preventDefault(); // Stop the form submit if validation fails
// //         return;
// //     }

// // // Set loading state for UI feedback. The page will redirect away after the POST is successful.
// // setLoading(true);

// // // CRITICAL: We do NOT call e.preventDefault() here, allowing the browser to execute the native POST.
// // };


  
// //     // ... (handleChange and contactType logic remains the same)
  
// //     // ---------------------
// //     // *** MODIFIED SUBMISSION HANDLER ***
// //     // This uses fetch (AJAX) to submit, and then manually redirects on success.
  
    





// // // ---------------------

// //   // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //   //   e.preventDefault();
// //   //   setLoading(true);
// //   //   try {
// //   //     // Consolidated Validation
// //   //     if (!formData.brand || formData.brand === "") {
// //   //       throw new Error("Missing required field: Brand.");
// //   //     }
// //   //     if (!formData.model || formData.model === "") {
// //   //       throw new Error("Missing required field: Model.");
// //   //     }
// //   //     if (typeof formData.askingPrice !== 'number' || isNaN(formData.askingPrice) || formData.askingPrice <= 0) {
// //   //       throw new Error("Missing required field: Asking price (must be a number greater than 0).");
// //   //     }
// //   //     // Check that contact method is selected AND the detail field is filled
// //   //     if (!formData.contactMethod || !formData.contactDetail || formData.contactDetail === "") {
// //   //       throw new Error(`Missing required detail for the selected contact method (${formData.contactMethod}).`);
// //   //     }

// //   //     await submitSellRequest(formData);

// //   //     alert("Success! We've received your sell request. We will get back to you shortly.");

// //   //   } catch (error) {
// //   //     console.error("Submission failed:", error);
// //   //     alert(`Submission failed. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };

// //   const contactType = formData.contactMethod;
// //   const contactInputLabel =
// //     contactType === 'Email' ? 'Your Email' :
// //       contactType === 'Phone number' ? 'Your Phone Number' :
// //         'Your WhatsApp Number';
// //   const contactInputType = contactType === 'Email' ? 'email' : 'text';


// //   return (
// //     <div className="border rounded-xl bg-card/60">
// //       <div className="p-4 border-b font-sans flex items-center justify-between">
// //         <div className="text-xl text-offwhite/60">Submit your watch details</div>
// //       </div>
// //       <form 
// //       className="p-6 grid font-sans md:grid-cols-2 gap-4" 
// //       onSubmit={handleSubmit}
// //       name="sell-watch-request"        // 1. Mandatory form name for Netlify
// //       method="POST"                    // 2. Mandatory method POST
// //       data-netlify="true"              // 3. Enable Netlify processing
// //       netlify-honeypot="sell-bot-field"  // 4. Honeypot
// //       encType="multipart/form-data"    // 5. ESSENTIAL for file uploads
// //       // action="/success.html"
                       
// //       >

// // {/* --- HIDDEN FIELDS FOR NETLIFY --- */}
// // <input type="hidden" name="form-name" value="sell-watch-request" />
// //         <input type="hidden" name="sell-bot-field" />
        
// //         {/* --- CRITICAL FIX: HIDDEN REDIRECT FIELD --- */}
// //         {/* Netlify honors this field to redirect after successful submission, bypassing the React router. */}
// //         {/* <input type="hidden" name="_redirect" value="/success" />  */}
// //         {/* --- END HIDDEN FIELDS --- */}


// // {/* Add the corrected redirect field */}
// // <input type="hidden" name="_redirect" value="/success.html" />

// //         {/* --- ROW 1: BRAND & MODEL --- */}
// //         <Field label="Brand">
// //           <Select
// //             required
// //             name="brand" // Netlify requires the 'name' attribute
// //             value={formData.brand}
// //             onChange={e => handleChange('brand', e.target.value)}
// //           >
// //             <option>Rolex</option>
// //             <option>Audemars Piguet</option>
// //             <option>Richard Mille</option>
// //             <option>Patek Philippe</option>
// //             <option>Cartier</option>
// //             <option>Other</option>
// //           </Select>
// //         </Field>


// //         <Field label="Model">
// //           <Input
// //             required
// //             name="model" // Netlify requires the 'name' attribute
// //             placeholder="Submariner Date"
// //             value={formData.model || ''}
// //             onChange={e => handleChange('model', e.target.value)}
// //           />
// //         </Field>

// //         {/* --- ROW 2: REFERENCE & YEAR --- */}
// //         <Field label="Reference No.">
// //           <Input
// //             required
// //             name="reference" // Netlify requires the 'name' attribute
// //             placeholder="126610LN"
// //             value={formData.reference || ''}
// //             onChange={e => handleChange('reference', e.target.value)}
// //           />
// //         </Field>
        
// //         <Field label="Year">
// //           <Input
// //             type="number"
// //             name="year" // Netlify requires the 'name' attribute
// //             placeholder="2022"
// //             required
// //             value={formData.year || ''}
// //             onChange={e => handleChange('year', Number(e.target.value))}
// //           />
// //         </Field>

// //         {/* --- ROW 3: BOX & PRICE --- */}
// //         <Field label="Box & Papers">
// //           <Select
// //             name="boxAndPapers" // Netlify requires the 'name' attribute
// //             value={formData.boxAndPapers}
// //             onChange={e => handleChange('boxAndPapers', e.target.value as SellFormData['boxAndPapers'])}
// //           >
// //             <option>Yes</option>
// //             <option>No</option>
// //             {/* ADDED NEW OPTIONS */}
// //             <option>Only box</option>
// //             <option>Only papers</option>
// //           </Select>
// //         </Field>
// //         <Field label="Asking price (AED)">
// //           <Input
// //             type="number"
// //             name="askingPrice" // Netlify requires the 'name' attribute
// //             placeholder="0"
// //             required
// //             value={formData.askingPrice || ''}
// //             onChange={e => handleChange('askingPrice', Number(e.target.value))}
// //           />
// //         </Field>

// //         {/* --- ROW 4: CONDITION NOTES (Full Width) --- */}
// //         <Field label="Condition notes" className="md:col-span-2">
// //           <Textarea
// //             name="conditionNotes" // Netlify requires the 'name' attribute
// //             placeholder="Surface wear, hairlines, etc."
// //             value={formData.conditionNotes || ''}
// //             onChange={e => handleChange('conditionNotes', e.target.value)}
// //           />
// //         </Field>

// //         {/* --- ROW 5: CONDITIONAL CONTACT INPUT --- */}
// //         <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
// //           <Field label="Preferred Contact Method">
// //             <Select
// //               name="contactMethod" // Netlify requires the 'name' attribute
// //               value={contactType}
// //               onChange={e => {
// //                 // 1. Update contactMethod type
// //                 handleChange('contactMethod', e.target.value as SellFormData['contactMethod']);
// //                 // 2. Clear existing detail when type changes
// //                 handleChange('contactDetail', '');
// //               }}
// //             >
// //               {/* <option>Email</option>
// //               <option>Phone number</option> */}
// //               <option>WhatsApp</option>
// //             </Select>
// //           </Field>

// //           {/* CONDITIONAL CONTACT INPUT FIELD */}
// //           <Field label={contactInputLabel} key={contactType}> {/* Use key to reset component state */}
// //             <Input
// //               type={contactInputType}
// //               name="contactDetail" // Netlify requires the 'name' attribute
// //               placeholder={contactType === 'Email' ? 'john.doe@mail.com' : 'e.g., +971 50 123 4567'}
// //               required
// //               value={formData.contactDetail || ''}
// //               onChange={e => handleChange('contactDetail', e.target.value)}
// //             />
// //           </Field>
// //         </div>

// //         {/* --- ROW 6: LOCATION & PAYOUT --- */}
// //         {/* <Field label="Location">
// //           <Input
// //             name="location" // Netlify requires the 'name' attribute
// //             placeholder="City, Country"
// //             value={formData.location || ''}
// //             onChange={e => handleChange('location', e.target.value)}
// //           /> */}
// //         {/* </Field>
// //         <Field label="Preferred ggg payout">
// //           <Select
// //             name="preferredPayout" // Netlify requires the 'name' attribute
// //             value={formData.preferredPayout}
// //             onChange={e => handleChange('preferredPayout', e.target.value)}
// //           >
// //             <option>Bank Transfer</option>
// //             <option>Crypto</option>
// //             <option>Cash (in person)</option>
// //           </Select>
// //         </Field> */}

// //         {/* --- ROW 7: FILE UPLOAD (Full Width) --- */}
// //         <Field label="Upload photos" className="md:col-span-2">
// //           <Input 
// //           type="file" 
// //           accept="image/*" 
// //           multiple 
// //           name="upload-photos[]" // IMPORTANT: Netlify requires '[]' for multiple file upload fields
// //           className="block text-sm py-1" 
// //           onChange={e => handleChange('upload-photos', e.target.files)}
// //           />
// //         </Field>

// //         {/* --- SUBMIT BUTTON --- */}
// //         <div className="md:col-span-2 flex justify-end pt-2">
// //           <AnimatedButton
// //             type="submit" // MUST be type="submit" for Netlify to detect
// //             text="Submit Request"
// //             hoverText="Get Offer Now" // Optional: A slightly different hover text
// //             loading={loading}
// //           />
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }


// import Layout from "@/components/Layout";
// import { useEffect, useState, useCallback } from "react";
// import { Helmet } from "react-helmet-async";
// import CyclingLines from "@/components/CyclingLines";
// import { cn } from "@/lib/utils"; // ADDED cn import for styling utility
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; 
// import { AnimatedButton } from "@/components/AnimatedButton";
// import Seo from "@/components/Seo";

// // --- 1. UPDATED SHARED INTERFACE FOR DATA ---
// interface SellFormData {
//   fullName: string;
//   brand: string;
//   model: string;
//   reference: string;
//   year: number | '';
//   conditionNotes: string;
//   // EXPANDED OPTIONS
//   boxAndPapers: 'Yes' | 'No' | 'Only box' | 'Only papers';
//   askingPrice: number | '';
//   location: string;
//   // DEFINED CONTACT OPTIONS - Only WhatsApp remains
//   contactMethod: 'WhatsApp';
//   // NEW FIELD FOR CONTACT DETAIL
//   contactDetail: string;
//   preferredPayout: string;
//   'upload-photos': FileList | null;
// }

// // --- 2. API FETCH HELPER (URL Corrected for Public Endpoint) ---
// // const API_BASE_URL = "http://127.0.0.1:8000";


// const FAQ_SCHEMA = {
//   "@context": "https://schema.org",
//   "@type": "FAQPage",
//   "mainEntity": [
//     // 1 
//     {
//       "@type": "Question",
//       "name": "How long does the valuation process take?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Once you submit your watch details, our specialists typically provide an initial offer within 24 to 48 hours. The final offer is confirmed after physical inspection and authentication."
//       }
//     },
//     // 2
//     {
//       "@type": "Question",
//       "name": "Is shipping insured and how does it work?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Yes, all shipping arranged by WatchStory is fully insured for the full market value of the watch, using secure, trackable methods. We provide detailed, prepaid shipping labels."
//       }
//     },
//     // 3
//     {
//       "@type": "Question",
//       "name": "How does the authentication process work?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Every watch is meticulously inspected by our master watchmakers. We verify the movement, serial numbers, provenance (box and papers), and material integrity to guarantee authenticity before finalizing the transaction. We specialize in authenticating Rolex, Audemars Piguet, and Patek Philippe references."
//       }
//     },
//     // 4
//     {
//       "@type": "Question",
//       "name": "What payout methods are supported?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "We support several secure payout methods, including bank transfer, escrow services, and in-person cash transactions depending on your location and preference for speed and security."
//       }
//     },

//     // 5

//     {
//       "@type": "Question",
//       "name": "What documentation is required to sell my watch (Box & Papers)?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "To achieve the best market price, we require your watch's original Box and Papers (provenance). We can still purchase watches without these, but valuation will be adjusted based on the missing history."
//       }
//     },

//         // 6

//         {
//           "@type": "Question",
//           "name": "Do you buy watches from outside of Dubai or the UAE?",
//           "acceptedAnswer": {
//             "@type": "Answer",
//             "text": "While we are specialists located in Dubai, we accept sell requests globally. We provide fully insured, prepaid shipping labels to securely transport your watch to our authentication center from anywhere in the world."
//           }
//         },


//             // 7

//     {
//       "@type": "Question",
//       "name": "How do you determine the final market price/valuation?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Our valuation process is entirely transparent. We analyze the current secondary market data, recent sales history for your specific reference number (SKU), the watch's condition grade, and the presence of original box and papers."
//       }
//     }
//   ]
// }




// // async function submitSellRequest(data: Partial<SellFormData>) {
// //   const payload = {
// //     brand: data.brand,
// //     model: data.model,
// //     asking_price: Number(data.askingPrice),
// //     condition: data.conditionNotes || 'Unspecified',

// //     // Consolidated all details into the description field
// //     description: `Ref: ${data.reference || 'N/A'}. Year: ${data.year || 'N/A'}. Papers: ${data.boxAndPapers}. Payout: ${data.preferredPayout}. Location: ${data.location || 'N/A'}. Contact: ${data.contactMethod}: ${data.contactDetail || 'N/A'}.`,
// //   };

// //   // Target the expected /public/sell-requests endpoint
// //   const res = await fetch(`${API_BASE_URL}/public/sell-requests`, {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify(payload),
// //   });

// //   if (!res.ok) {
// //     const errorData = await res.json().catch(() => ({ detail: res.statusText }));
// //     throw new Error(errorData.detail || `HTTP error ${res.status}`);
// //   }

// //   return res.json();
// // }
// // --- END API FETCH HELPER ---


// // ====================================================================
// // --- NEW FAQ COMPONENT ---

// const FAQ_ITEMS = [
//   // 1
//   {
//     question: "How long does the valuation process take?",
//     answer: "Once you submit your watch details, our specialists typically provide an initial offer within 24 to 48 hours. The final offer is confirmed after physical inspection and authentication."
//   },
//   // 2
//   {
//     question: "Is shipping insured and how does it work?",
//     answer: "Yes, all shipping arranged by WatchStory is fully insured for the full market value of the watch, using secure, trackable methods. We provide detailed, prepaid shipping labels."
//   },
//   // 3
//   {
//     question: "How does the authentication process work?",
//     answer: "Every watch is meticulously inspected by our master watchmakers. We verify the movement, serial numbers, provenance (box and papers), and material integrity to guarantee authenticity before finalizing the transaction. We specialize in authenticating Rolex, Audemars Piguet, and Patek Philippe references."
//   },
//   // 4
//   {
//     question: "What payout methods are supported?",
//     answer: "We support several secure payout methods, including bank transfer, escrow services, and in-person cash transactions depending on your location and preference for speed and security."
//   },
//   // 5

//   {
//     question: "What documentation is required to sell my watch (Box & Papers)?",
//     answer: "To achieve the best market price, we require your watch's original Box and Papers (provenance). We can still purchase watches without these, but valuation will be adjusted based on the missing history."
//   },
//   // 6

//   {
//     question: "Do you buy watches from outside of Dubai or the UAE?",
//     answer: "While we are specialists located in Dubai, we accept sell requests globally. We provide fully insured, prepaid shipping labels to securely transport your watch to our authentication center from anywhere in the world."
//   },
//   // 7
//   {
//     question: "How do you determine the final market price/valuation?",
//     answer: "Our valuation process is entirely transparent. We analyze the current secondary market data, recent sales history for your specific reference number (SKU), the watch's condition grade, and the presence of original box and papers."
//   }
  
// ];

// function SellPageFAQ() {
//   return (
//     <section className="ws-container pt-16 pb-12">
//       <h2 className="font-title text-3xl mb-8">Frequently Asked Questions</h2>
//       {/* Set type="single" for one item open at a time */}
//       <Accordion type="single" collapsible className="w-full">
//         {FAQ_ITEMS.map((item, index) => (
//           <AccordionItem
//             key={index}
//             value={`item-${index}`}
//             className="border-b border-border/50" // Apply bottom border for separation
//           >
//             <AccordionTrigger className="text-lg transition-colors text-left">
//               {item.question}
//             </AccordionTrigger>
//             <AccordionContent className="text-offwhite/70">
//               <p className="pl-4">{item.answer}</p>
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </section>
//   );
// }

// // ====================================================================
// // --- MAIN PAGE COMPONENT ---

// export default function Sell() {





//   useEffect(() => {
//     // document.title = "Sell Your Luxury Watch | Fast Offers & Authentication — WatchStory";
//   }, []);

//   return (
//     <Layout>
//         <Helmet>
//           <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(FAQ_SCHEMA)}} />
//         </Helmet>
//             <Seo
//         title="Sell Your Luxury Watch in Dubai | Instant Quote & Safe Payment"
//         description="Get the best price for your Rolex, AP, Patek & more in Dubai. Same-day payment and expert valuation."
//         canonical="/sell"
//       />


// <Helmet>
//   <script type="application/ld+json">{JSON.stringify({
//     "@context":"https://schema.org",
//     "@type":"FAQPage",
//     "mainEntity":[
//       {"@type":"Question","name":"How do I get a valuation?",
//        "acceptedAnswer":{"@type":"Answer","text":"Share your watch details (brand, model, year, condition). We revert with a quote within hours."}},
//       {"@type":"Question","name":"How is payment made?",
//        "acceptedAnswer":{"@type":"Answer","text":"Bank transfer or cash in-person. For remote deals we use secure escrow."}},
//       {"@type":"Question","name":"Do you offer pick-up?",
//        "acceptedAnswer":{"@type":"Answer","text":"Yes, pick-up/insured courier can be arranged within the UAE."}}
//     ]
//   })}</script>
// </Helmet>





//       <section className="ws-container pt-16 pb-0 md:pb-8 bg-background">
//         <h1 className="font-title font-normal text-4xl sm:text-5xl max-w-6xl">
//           Sell your watch
//           </h1>

//           <h2 className="font-sans font-light text-base text-offwhite/80 mt-2 max-w-4xl">
//           Sell Your Rolex, Audemars Piguet, Patek Philippe, Cartier or Richard Mille Watch in Dubai.
//         </h2>




//         {/* <p className="text-offwhite/70 mt-3 max-w-2xl">Get a fair offer fast. Our specialists evaluate condition, provenance, and demand to place your watch with the right collector.</p> */}
//         <CyclingLines
//           className="mt-2 text-2xl sm:text-3xl font-sans"
//           lines={[
//             "Get instant payment",
//             "Free insured shipping",
//             "Expert authentication",
//             "Fair, market-based offers",
            
//           ]}
//           cycleIntervalSec={2.5}
//           perLetterDurationSec={1}
//           easing="ease-in-out"
//           letterStaggerSec={0.04}
//         />
//         {/* <div className="mt-10 grid md:grid-cols-3 gap-6">
//           <div className="border rounded-lg p-6 bg-card/60">
//             <h3 className="font-title text-2xl">Evaluation</h3>
//             <p className="text-offwhite/70 mt-2">Transparent criteria and market-backed pricing.</p>
//           </div>
//           <div className="border rounded-lg p-6 bg-card/60">
//             <h3 className="font-title text-2xl">Authentication</h3>
//             <p className="text-offwhite/70 mt-2">Movement and materials verified by experts.</p>
//           </div>
//           <div className="border rounded-lg p-6 bg-card/60">
//             <h3 className="font-title text-2xl">Fast payout</h3>
//             <p className="text-offwhite/70 mt-2">Insured shipping and rapid settlement.</p>
//           </div>
//         </div> */}
//       </section>





//       {/* Sell Form */}
//       <section className="ws-container pb-16">
//         <SingleStepSellForm />
//       </section>

//       {/* NEW FAQ SECTION */}
//       <SellPageFAQ />
//     </Layout>
//   );
// }

// // ====================================================================
// // --- Utility Components (Updated to include cn utility) ---

// function Field({ label, children, className, required }: { label: string; children: React.ReactNode; className?: string; required?: boolean }) {
//   return (
//     <label className={cn("block", className)}>
//       <div className="text-sm text-offwhite/70 mb-1 font-bold">
//       {label}
//       {/* CONDITIONAL ASTERISK HERE */}
//       {required && <span className="text-red-500 ml-1">*</span>}
//       </div>
//       {children}
//     </label>
//   );
// }

// function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
//   // IMPORTANT: Added 'name' prop to allow Netlify to capture the field value
//   return <input {...props} className="w-full bg-transparent border px-3 py-2 rounded-md placeholder:text-offwhite/40" name={props.name} />
// }
// function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
//   // IMPORTANT: Added 'name' prop
//   return <select {...props} className="w-full bg-transparent border px-3 py-2 rounded-md" name={props.name} />
// }
// function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
//   // IMPORTANT: Added 'name' prop
//   return <textarea {...props} className="w-full min-h-24 bg-transparent border px-3 py-2 rounded-md" name={props.name} />
// }



// // ====================================================================
// // --- SINGLE STEP FORM COMPONENT ---

// function SingleStepSellForm() {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState<Partial<SellFormData>>({
//     fullName: '',
//     brand: 'Rolex',
//     model: '',
//     reference: '',
//     year: '',
//     conditionNotes: '',
//     boxAndPapers: 'Yes',
//     askingPrice: '',
//     // location: '',
//     contactMethod: 'WhatsApp', // Set default to WhatsApp
//     contactDetail: '',
//     // preferredPayout: 'Bank Transfer',
//     'upload-photos': null,
//   });

//   const handleChange = useCallback((field: keyof SellFormData, value: string | number | 'Yes' | 'No' | 'Only box' | 'Only papers' | FileList | null) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   }, []);



// // ---------------------


// // Netlify-friendly submission handler: Only for validation and setting loading state.
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
//     // Simple validation before allowing native form submit
//     if (
//         !formData.brand || 
//         !formData.model || 
//         !formData.reference || 
//         !formData.askingPrice || 
//         !formData.contactDetail
//       ) {
//         alert("Please fill in all required fields (Brand, Model, Reference, Asking Price, and Contact Detail).");
//         e.preventDefault(); // Stop the form submit if validation fails
//         return;
//     }

// // Set loading state for UI feedback. The page will redirect away after the POST is successful.
// setLoading(true);

// // CRITICAL: We do NOT call e.preventDefault() here, allowing the browser to execute the native POST.
// };


  
//     // ... (handleChange and contactType logic remains the same)
  
//     // ---------------------
//     // *** MODIFIED SUBMISSION HANDLER ***
//     // This uses fetch (AJAX) to submit, and then manually redirects on success.
  
    





// // ---------------------

//   // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   try {
//   //     // Consolidated Validation
//   //     if (!formData.brand || formData.brand === "") {
//   //       throw new Error("Missing required field: Brand.");
//   //     }
//   //     if (!formData.model || formData.model === "") {
//   //       throw new Error("Missing required field: Model.");
//   //     }
//   //     if (typeof formData.askingPrice !== 'number' || isNaN(formData.askingPrice) || formData.askingPrice <= 0) {
//   //       throw new Error("Missing required field: Asking price (must be a number greater than 0).");
//   //     }
//   //     // Check that contact method is selected AND the detail field is filled
//   //     if (!formData.contactMethod || !formData.contactDetail || formData.contactDetail === "") {
//   //       throw new Error(`Missing required detail for the selected contact method (${formData.contactMethod}).`);
//   //     }

//   //     await submitSellRequest(formData);

//   //     alert("Success! We've received your sell request. We will get back to you shortly.");

//   //   } catch (error) {
//   //     console.error("Submission failed:", error);
//   //     alert(`Submission failed. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const contactType = formData.contactMethod;
//   // Simplified contact logic to only output WhatsApp
//   const contactInputLabel = 'Your WhatsApp Number';
//   const contactInputType = 'text';


//   return (
//     <div className="border rounded-xl bg-card/60">
//       <h2 className="p-4 border-b font-sans text-xl font-normal text-offwhite/60">
//           Submit your watch details
//       </h2>
//       <form 
//       className="p-6 grid font-sans md:grid-cols-2 gap-4" 
//       onSubmit={handleSubmit}
//       name="sell-watch-request"        // 1. Mandatory form name for Netlify
//       method="POST"                    // 2. Mandatory method POST
//       data-netlify="true"              // 3. Enable Netlify processing
//       netlify-honeypot="sell-bot-field"  // 4. Honeypot
//       encType="multipart/form-data"    // 5. ESSENTIAL for file uploads
//       action="/success" // Revert action to SPA route, rely on netlify.toml redirect
                       
//       >

// {/* --- HIDDEN FIELDS FOR NETLIFY --- */}
// <input type="hidden" name="form-name" value="sell-watch-request" />
//         <input type="hidden" name="sell-bot-field" />
        
//         {/* CRITICAL: Removed _redirect field from dynamic form to avoid conflict and rely on action="/success" + netlify.toml redirect */}
        

// {/* --- NEW ROW: FULL NAME --- */}
// <Field label="Full Name" className="md:col-span-2"required>
//             <Input
              
//               name="fullName" // Netlify requires the 'name' attribute
//               placeholder="John Smith"
//               value={formData.fullName || ''}
//               onChange={e => handleChange('fullName', e.target.value)}
//             />
//         </Field>



//         {/* --- ROW 1: BRAND & MODEL --- */}
//         <Field label="Brand" required>
//           <Select
            
//             name="brand" // Netlify requires the 'name' attribute
//             value={formData.brand}
//             onChange={e => handleChange('brand', e.target.value)}
//           >
//             <option>Rolex</option>
//             <option>Audemars Piguet</option>
//             <option>Richard Mille</option>
//             <option>Patek Philippe</option>
//             <option>Cartier</option>
//             <option>Other</option>
//           </Select>
//         </Field>


//         <Field label="Model">
//           <Input
            
//             name="model" // Netlify requires the 'name' attribute
//             placeholder="Submariner Date"
//             value={formData.model || ''}
//             onChange={e => handleChange('model', e.target.value)}
//           />
//         </Field>

//         {/* --- ROW 2: REFERENCE & YEAR --- */}
//         <Field label="Reference No.">
//           <Input
            
//             name="reference" // Netlify requires the 'name' attribute
//             placeholder="126610LN"
//             value={formData.reference || ''}
//             onChange={e => handleChange('reference', e.target.value)}
//           />
//         </Field>
        
//         <Field label="Year">
//           <Input
//             type="number"
//             name="year" // Netlify requires the 'name' attribute
//             placeholder="2022"
            
//             value={formData.year || ''}
//             onChange={e => handleChange('year', Number(e.target.value))}
//           />
//         </Field>

//         {/* --- ROW 3: BOX & PRICE --- */}
//         <Field label="Box & Papers" required>
//           <Select
//             name="boxAndPapers" // Netlify requires the 'name' attribute
//             value={formData.boxAndPapers}
//             onChange={e => handleChange('boxAndPapers', e.target.value as SellFormData['boxAndPapers'])}
//           >
//             <option>Yes</option>
//             <option>No</option>
//             {/* ADDED NEW OPTIONS */}
//             <option>Only box</option>
//             <option>Only papers</option>
//           </Select>
//         </Field>
//         <Field label="Asking price (AED)">
//           <Input
//             type="number"
//             name="askingPrice" // Netlify requires the 'name' attribute
//             placeholder="0"
            
//             value={formData.askingPrice || ''}
//             onChange={e => handleChange('askingPrice', Number(e.target.value))}
//           />
//         </Field>

//         {/* --- ROW 4: CONDITION NOTES (Full Width) --- */}
//         <Field label="Condition notes" className="md:col-span-2">
//           <Textarea
//             name="conditionNotes" // Netlify requires the 'name' attribute
//             placeholder="Surface wear, hairlines, etc."
//             value={formData.conditionNotes || ''}
//             onChange={e => handleChange('conditionNotes', e.target.value)}
//           />
//         </Field>

//         {/* --- ROW 5: CONDITIONAL CONTACT INPUT --- */}
//         <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
//           <Field label="Preferred Contact Method">
//             <Select
//               name="contactMethod" // Netlify requires the 'name' attribute
//               value={contactType}
//               onChange={e => {
//                 // 1. Update contactMethod type
//                 handleChange('contactMethod', e.target.value as SellFormData['contactMethod']);
//                 // 2. Clear existing detail when type changes
//                 handleChange('contactDetail', '');
//               }}
//             >
//               <option>WhatsApp</option>
//             </Select>
//           </Field>

//           {/* CONDITIONAL CONTACT INPUT FIELD */}
//           <Field label={contactInputLabel} key={contactType} 
//           required> {/* Use key to reset component state */}
//             <Input
//               type={contactInputType}
//               name="contactDetail" // Netlify requires the 'name' attribute
//               placeholder={'e.g., +971 50 123 4567'}
              
//               value={formData.contactDetail || ''}
//               onChange={e => handleChange('contactDetail', e.target.value)}
//             />
//           </Field>
//         </div>

//         {/* --- ROW 6: LOCATION & PAYOUT --- */}
//         {/* <Field label="Location">
//           <Input
//             name="location" // Netlify requires the 'name' attribute
//             placeholder="City, Country"
//             value={formData.location || ''}
//             onChange={e => handleChange('location', e.target.value)}
//           /> */}
//         {/* </Field>
//         <Field label="Preferred ggg payout">
//           <Select
//             name="preferredPayout" // Netlify requires the 'name' attribute
//             value={formData.preferredPayout}
//             onChange={e => handleChange('preferredPayout', e.target.value)}
//           >
//             <option>Bank Transfer</option>
//             <option>Crypto</option>
//             <option>Cash (in person)</option>
//           </Select>
//         </Field> */}

//         {/* --- ROW 7: FILE UPLOAD (Full Width) --- */}
//         <Field label="Upload photos" className="md:col-span-2">
//           <Input 
//           type="file" 
//           accept="image/*" 
//           multiple 
//           name="upload-photos[]" // IMPORTANT: Netlify requires '[]' for multiple file upload fields
//           className="block text-sm py-1" 
//           onChange={e => handleChange('upload-photos', e.target.files)}
//           />
//         </Field>

//         {/* --- SUBMIT BUTTON --- */}
//         <div className="md:col-span-2 flex justify-end pt-2">
//           <AnimatedButton
//             type="submit" // MUST be type="submit" for Netlify to detect
//             text="Submit Request"
//             hoverText="Get Offer Now" // Optional: A slightly different hover text
//             loading={loading}
//           />
//         </div>
//       </form>





// {/* === NEW SECTION: EXPERT VALUATION & SOURCING (Anchor Target) === */}
// {/* <section id="valuation" className="ws-container pt-8 pb-16">
//         <h3 className="font-title text-3xl text-gold mb-4">Expert Valuation & Sourcing: Get the Highest Market Value</h3>
        
//         <p className="text-offwhite/70 max-w-4xl">
//           **Selling Your Watch in Dubai? Get a Fair, Transparent Offer.** At WatchStory, our valuation process is designed to ensure you receive the highest market-competitive price for your luxury timepiece. We don't rely on automated tools; our offers are based on genuine market expertise.
//         </p>
        
//         <div className="mt-8">
//           <h4 className="font-sans font-bold text-lg text-offwhite mb-3">The WatchStory Valuation Advantage:</h4>
//           <ul className="list-disc list-inside text-offwhite/70 space-y-2 ml-4">
//             <li><strong>Condition & Provenance:</strong> The watch's physical state, service history, and the presence of original box and papers.</li>
//             <li><strong>Global Demand:</strong> Real-time analysis of auction results and private sales for your specific reference number.</li>
//             <li><strong>Local Market Fluctuations:</strong> Expertise in regional demand curves for brands like Rolex and Patek Philippe in the UAE.</li>
//           </ul>
//         </div>

//         <div className="mt-8">
//           <h4 className="font-sans font-bold text-lg text-offwhite mb-3">Sourcing Rare Timepieces:</h4>
//           <p className="text-offwhite/70 max-w-4xl">
//             Looking for a hard-to-find watch? Use our **Sourcing Request** service. Leverage our global network of trusted dealers and private collectors—right here in Dubai and worldwide—to find your specific model at a competitive price, hassle-free.
//           </p>
//         </div>
//       </section> */}
//       {/* ================================================================ */}


//     </div>
//   );
// }



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
      "name": "How long does the valuation process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Once you submit your watch details, our specialists typically provide an initial offer within 24 to 48 hours. The final offer is confirmed after physical inspection and authentication."
      }
    },
    {
      "@type": "Question",
      "name": "Is shipping insured and how does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all shipping arranged by WatchStory is fully insured for the full market value of the watch, using secure, trackable methods. We provide detailed, prepaid shipping labels."
      }
    },
    {
      "@type": "Question",
      "name": "How does the authentication process work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every watch is meticulously inspected by our master watchmakers. We verify the movement, serial numbers, provenance (box and papers), and material integrity to guarantee authenticity before finalizing the transaction. We specialize in authenticating Rolex, Audemars Piguet, and Patek Philippe references."
      }
    },
    {
      "@type": "Question",
      "name": "What payout methods are supported?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We support several secure payout methods, including bank transfer, escrow services, and in-person cash transactions depending on your location and preference for speed and security."
      }
    },
    {
      "@type": "Question",
      "name": "What documentation is required to sell my watch (Box & Papers)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To achieve the best market price, we require your watch's original Box and Papers (provenance). We can still purchase watches without these, but valuation will be adjusted based on the missing history."
      }
    },
    {
      "@type": "Question",
      "name": "Do you buy watches from outside of Dubai or the UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While we are specialists located in Dubai, we accept sell requests globally. We provide fully insured, prepaid shipping labels to securely transport your watch to our authentication center from anywhere in the world."
      }
    },
    {
      "@type": "Question",
      "name": "How do you determine the final market price/valuation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our valuation process is entirely transparent. We analyze the current secondary market data, recent sales history for your specific reference number (SKU), the watch's condition grade, and the presence of original box and papers."
      }
    }
  ]
}

const FAQ_ITEMS = [
  {
    question: "How long does the valuation process take?",
    answer: "Once you submit your watch details, our specialists typically provide an initial offer within 24 to 48 hours. The final offer is confirmed after physical inspection and authentication."
  },
  {
    question: "Is shipping insured and how does it work?",
    answer: "Yes, all shipping arranged by WatchStory is fully insured for the full market value of the watch, using secure, trackable methods. We provide detailed, prepaid shipping labels."
  },
  {
    question: "How does the authentication process work?",
    answer: "Every watch is meticulously inspected by our master watchmakers. We verify the movement, serial numbers, provenance (box and papers), and material integrity to guarantee authenticity before finalizing the transaction. We specialize in authenticating Rolex, Audemars Piguet, and Patek Philippe references."
  },
  {
    question: "What payout methods are supported?",
    answer: "We support several secure payout methods, including bank transfer, escrow services, and in-person cash transactions depending on your location and preference for speed and security."
  },
  {
    question: "What documentation is required to sell my watch (Box & Papers)?",
    answer: "To achieve the best market price, we require your watch's original Box and Papers (provenance). We can still purchase watches without these, but valuation will be adjusted based on the missing history."
  },
  {
    question: "Do you buy watches from outside of Dubai or the UAE?",
    answer: "While we are specialists located in Dubai, we accept sell requests globally. We provide fully insured, prepaid shipping labels to securely transport your watch to our authentication center from anywhere in the world."
  },
  {
    question: "How do you determine the final market price/valuation?",
    answer: "Our valuation process is entirely transparent. We analyze the current secondary market data, recent sales history for your specific reference number (SKU), the watch's condition grade, and the presence of original box and papers."
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

// ====================================================================
// --- MAIN PAGE COMPONENT (Unchanged) ---

export default function Sell() {
  return (
    <Layout>
        <Helmet>
          <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(FAQ_SCHEMA)}} />
        </Helmet>
        <Seo
          title="Sell Your Luxury Watch in Dubai | Instant Quote & Safe Payment"
          description="Get the best price for your Rolex, AP, Patek & more in Dubai. Same-day payment and expert valuation."
          canonical="/sell"
        />

      <section className="ws-container mt-24 pt-16 pb-0 md:pb-8 bg-background">
        <h1 className="font-title font-normal text-4xl sm:text-5xl max-w-6xl">
          Sell your watch
        </h1>

        <h2 className="font-sans font-light text-base text-offwhite/80 mt-2 max-w-4xl">
          Sell Your Rolex, Audemars Piguet, Patek Philippe, Cartier or Richard Mille Watch in Dubai.
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
    !formData.model ||
    !formData.reference ||
    !formData.year ||
    !formData.askingPrice ||
    !formData.contactDetail ||
    !(formData['upload-photos'] && formData['upload-photos'].length > 0)
  ) {
    alert("Please fill in all required fields and upload at least one photo (marked with *).");
    return;
  }

  try {
    setLoading(true);
    const body = buildFormData();
    // IMPORTANT: post to "/" so Netlify intercepts it
    const resp = await fetch('/', { method: 'POST', body });
    // Netlify returns HTML redirect; if OK, send user to success page
    if (resp.ok) {
      navigate('/success');
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
      <h2 className="p-4 border-b font-sans text-xl font-normal text-offwhite/60">
          Submit your watch details
      </h2>
      <form 
      className="p-6 grid font-sans md:grid-cols-2 gap-4" 
      onSubmit={handleSubmit}
      name="sell-watch-request"        // 1. Mandatory form name for Netlify
      method="POST"                    // 2. Mandatory method POST
      data-netlify="true"              // 3. Enable Netlify processing
      netlify-honeypot="sell-bot-field"  // 4. Honeypot
      encType="multipart/form-data"    // 5. ESSENTIAL for file uploads
      action="/success"
      >

{/* --- HIDDEN FIELDS FOR NETLIFY (Note: These inputs are ignored by Netlify's multipart handler, but the form-name is essential) --- */}
<input type="hidden" name="form-name" value="sell-watch-request" />
<input type="hidden" name="sell-bot-field" />
        
{/* --- NEW ROW: FULL NAME (REQUIRED) --- */}
<Field label="Full Name" className="md:col-span-2" required>
    <Input
        required
        name="fullName" 
        placeholder="John Smith"
        value={formData.fullName || ''}
        onChange={e => handleChange('fullName', e.target.value)}
    />
</Field>

        {/* --- ROW 1: BRAND & MODEL (REQUIRED) --- */}
        <Field label="Brand" required>
          <Select
            required
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
            required
            name="model" 
            placeholder="Submariner Date"
            value={formData.model || ''}
            onChange={e => handleChange('model', e.target.value)}
          />
        </Field>

        {/* --- ROW 2: REFERENCE & YEAR (REQUIRED) --- */}
        <Field label="Reference No." >
          <Input
            required
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
            required
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
            required
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
              required
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