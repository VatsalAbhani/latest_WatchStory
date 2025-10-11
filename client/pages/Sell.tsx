


// import Layout from "@/components/Layout";
// import { useEffect, useState, useCallback } from "react"; // ADDED useCallback
// import CyclingLines from "@/components/CyclingLines";

// // --- 1. NEW SHARED INTERFACE FOR DATA ---
// interface SellFormData {
//   brand: string;
//   model: string;
//   reference: string;
//   year: number | '';
//   conditionNotes: string;
//   boxAndPapers: 'Yes' | 'No';
//   askingPrice: number | '';
//   location: string;
//   contactMethod: string;
//   preferredPayout: string;
// }

// // --- 2. API FETCH HELPER ---
// // Assuming your FastAPI backend is running at http://127.0.0.1:8000
// // Note: This endpoint (POST /sell/requests) must be accessible without user authentication 
// // for the public Sell page to work, or you need to implement user login on the main site.
// const API_BASE_URL = "http://127.0.0.1:8000"; 

// async function submitSellRequest(data: Partial<SellFormData>) {
//   // Map form fields to the FastAPI SellRequestCreate schema
//   const payload = {
//     // Required fields by FastAPI schema
//     brand: data.brand,
//     model: data.model,
//     asking_price: Number(data.askingPrice),
//     condition: data.conditionNotes || 'Unspecified', // Mapping Condition notes to the 'condition' field

//     // Optional/Combined fields
//     description: `Ref: ${data.reference}. Year: ${data.year}. Notes: ${data.conditionNotes || 'N/A'}. Box/Papers: ${data.boxAndPapers}. Location: ${data.location || 'N/A'}. Contact: ${data.contactMethod}. Payout: ${data.preferredPayout}.`,
//   };

//   const res = await fetch(`${API_BASE_URL}/public/sell-requests`, { // Targetting POST /sell/requests
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) {
//     // Try to parse the error detail from FastAPI
//     const errorData = await res.json().catch(() => ({ detail: res.statusText }));
//     throw new Error(errorData.detail || `HTTP error ${res.status}`);
//   }

//   return res.json();
// }
// // --- END API FETCH HELPER ---


// export default function Sell() {
//   useEffect(() => {
//     document.title = "Sell Your Luxury Watch | Fast Offers & Authentication — WatchStory";
//   }, []);

//   return (
//     <Layout>
//       <section className="ws-container py-16">
//         <h1 className="font-title text-4xl">Sell Hello your watch</h1>
//         <p className="text-offwhite/70 mt-3 max-w-2xl">Get a fair offer fast. Our specialists evaluate condition, provenance, and demand to place your watch with the right collector.</p>
//         <CyclingLines
//           className="mt-4 text-xl text-gold/90"
//           lines={[
//             "Get instant payment",
//             "Free insured shipping",
//             "Expert authentication",
//             "Fair, market-based offers",
//             "Offer within 24 hours",
//           ]}
//           cycleIntervalSec={2.5}
//           perLetterDurationSec={1}
//           easing="ease-in-out"
//           letterStaggerSec={0.04}
//         />
//         <div className="mt-10 grid md:grid-cols-3 gap-6">
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
//         </div>
//       </section>

//       <section className="ws-container pb-24">
//         <SellForm />
//       </section>
//     </Layout>
//   );
// }

// function SellForm() {
//   const [step, setStep] = useState(1);
//   // --- MODIFIED: Central state for all form data ---
//   const [formData, setFormData] = useState<Partial<SellFormData>>({
//     brand: 'Rolex', // Initialize to the first valid option
//     model: '',
//     reference: '',
//     year: '',
//     conditionNotes: '',
//     boxAndPapers: 'Yes',
//     askingPrice: '',
//     location: '',
//     contactMethod: 'Email',
//     preferredPayout: 'Bank Transfer'
//   });
//   // ----------------------------------------------------

//   // Handler for all standard text/select inputs
//   const handleChange = useCallback((field: keyof SellFormData, value: string | number) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   }, []);

//   return (
//     <div className="border rounded-xl bg-card/60">
//       <div className="p-4 border-b flex items-center justify-between">
//         <div className="flex items-center gap-2 text-sm">
//           <span className={"h-2 w-2 rounded-full "+(step===1?"bg-gold":"bg-offwhite/30")} /> Step 1
//           <span className={"h-2 w-2 rounded-full ml-4 "+(step===2?"bg-gold":"bg-offwhite/30")} /> Step 2
//           <span className={"h-2 w-2 rounded-full ml-4 "+(step===3?"bg-gold":"bg-offwhite/30")} /> Step 3
//         </div>
//         {/* <div className="text-sm text-offwhite/60">Let’s tell your watch’s story.</div> */}
//       </div>
//       <div className="p-6">
//       {/* Pass state/handlers to the steps */}
//       {step === 1 && <StepOne formData={formData} onChange={handleChange} onNext={() => setStep(2)} />}
//       {step === 2 && <StepTwo onBack={() => setStep(1)} onNext={() => setStep(3)} />}
//       {/* Pass the same handlers to StepThree if needed, but not required for fix */}
//       {step === 3 && <StepThree formData={formData} onChange={handleChange} onBack={() => setStep(2)} />}
//     </div>
//     </div>
//   );
// }

// // ====================================================================
// // --- Utility Components (Kept for completeness) ---

// function Field({ label, children }: { label: string; children: React.ReactNode }) {
//   return (
//     <label className="block">
//       <div className="text-sm text-offwhite/70 mb-1">{label}</div>
//       {children}
//     </label>
//   );
// }

// function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
//   return <input {...props} className="w-full bg-transparent border px-3 py-2 rounded-md placeholder:text-offwhite/40" />
// }
// function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
//   return <select {...props} className="w-full bg-transparent border px-3 py-2 rounded-md" />
// }
// function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
//   return <textarea {...props} className="w-full min-h-24 bg-transparent border px-3 py-2 rounded-md" />
// }

// // ====================================================================

// // --- MODIFIED: StepOne to use centralized state ---
// function StepOne({ formData, onChange, onNext }: { formData: Partial<SellFormData>; onChange: (field: keyof SellFormData, value: string | number) => void; onNext: () => void }) {
//   return (
//     <form className="grid md:grid-cols-2 gap-4" onSubmit={(e)=>{ e.preventDefault(); onNext(); }}>
//       <Field label="Brand">
//         <Select 
//           required 
//           value={formData.brand} 
//           onChange={e => onChange('brand', e.target.value)}
//         >
//           {/* <option value="" disabled>Choose brand</option> */}
//           <option>Rolex</option>
//           <option>Audemars Piguet</option>
//           <option>Richard Mille</option>
//           <option>Patek Philippe</option>
//           <option>Cartier</option>
//           <option>Other</option>
//         </Select>
//       </Field>
//       <Field label="Model">
//         <Input 
//           required 
//           placeholder="Submariner Date" 
//           value={formData.model || ''}
//           onChange={e => onChange('model', e.target.value)}
//         />
//       </Field>
//       <Field label="Reference No.">
//         <Input 
//           required 
//           placeholder="126610LN" 
//           value={formData.reference || ''}
//           onChange={e => onChange('reference', e.target.value)}
//         />
//       </Field>
//       <Field label="Year">
//         <Input 
//           type="number" 
//           placeholder="2022" 
//           required 
//           value={formData.year || ''}
//           onChange={e => onChange('year', Number(e.target.value))}
//         />
//       </Field>
//       <Field label="Condition notes">
//         <Textarea 
//           placeholder="Surface wear, hairlines, etc." 
//           value={formData.conditionNotes || ''}
//           onChange={e => onChange('conditionNotes', e.target.value)}
//         />
//       </Field>
//       <Field label="Box & Papers">
//         <Select 
//           value={formData.boxAndPapers}
//           onChange={e => onChange('boxAndPapers', e.target.value as 'Yes' | 'No')}
//         >
//           <option>Yes</option>
//           <option>No</option>
//         </Select>
//       </Field>
//       <div className="md:col-span-2 flex justify-end">
//         <button className="ws-button-primary">Next</button>
//       </div>
//     </form>
//   );
// }

// function StepTwo({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
//   // NOTE: This step remains a placeholder for file upload
//   return (
//     <form className="grid gap-4" onSubmit={(e)=>{ e.preventDefault(); onNext(); }}>
//       <Field label="Upload photos">
//         <input type="file" accept="image/*" multiple className="block text-sm" />
//       </Field>
//       <div className="flex justify-between">
//         <button type="button" className="ws-button-secondary" onClick={onBack}>Back</button>
//         <button className="ws-button-primary">Next</button>
//       </div>
//     </form>
//   );
// }

// // --- MODIFIED: StepThree to collect final data and submit to API ---
// function StepThree({ formData, onChange, onBack }: { formData: Partial<SellFormData>; onChange: (field: keyof SellFormData, value: string | number) => void; onBack: () => void }) {
//   const [loading, setLoading] = useState(false);

//   // NOTE: The onChange prop is not strictly needed here but keeping the structure simple
//   // const handleChange = (field: keyof SellFormData, value: string | number) => {
//   //   // You should use the handleChange from SellForm here, but for now, we'll keep it simple
//   //   if (field === 'askingPrice') {
//   //       // Only doing this because the parent component's handleChange wasn't available in this scope
//   //       // In a proper refactor, this step would receive a working onChange prop too.
//   //   }
//   // };


//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       //  Data validation checks (minimal, you may want a proper library like Zod or Zod with react-hook-form)
//       if (!formData.brand || formData.brand === "") {
//         throw new Error("Missing required field: Brand. (Step 1)");
//       }
//       if (!formData.model || formData.model === "") {
//         throw new Error("Missing required field: Model. (Step 1)");
//       }
//       // Check for price: must be present, must be a number, and must be > 0.
//       if (typeof formData.askingPrice !== 'number' || isNaN(formData.askingPrice) || formData.askingPrice <= 0) {
//         throw new Error("Missing required field: Asking price (must be a number greater than 0).");
//       }

//       await submitSellRequest(formData);

//       // Success feedback
//       alert("Success! We've received your sell request");

//       // OPTIONAL: Clear the form or redirect after success (not implemented here)
//     } catch (error) {
//       console.error("Submission failed:", error);
//       alert(`Submission failed. Check the console for details. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
//       <Field label="Asking price (USD)">
//         <Input 
//           type="number" 
//           placeholder="0"
//           required
//           value={formData.askingPrice || ''}
//           onChange={e => onChange('askingPrice', Number(e.target.value))}
//         />
//       </Field>
//       <Field label="Location">
//         <Input 
//           placeholder="City, Country" 
//           value={formData.location || ''}
//           onChange={e => onChange('location', e.target.value)}
//         />
//       </Field>
//       <Field label="Contact method">
//         <Select 
//           value={formData.contactMethod}
//           onChange={e => onChange('contactMethod', e.target.value)}
//         >
//           <option>Email</option>
//           <option>Phone</option>
//           <option>WhatsApp</option>
//         </Select>
//       </Field>
//       <Field label="Preferred payout">
//         <Select 
//           value={formData.preferredPayout}
//           onChange={e => onChange('preferredPayout', e.target.value)}
//         >
//           <option>Bank Transfer</option>
//           <option>Crypto</option>
//           <option>Cash (in person)</option>
//         </Select>
//       </Field>
//       <div className="md:col-span-2 flex justify-between pt-2">
//         <button type="button" className="ws-button-secondary" onClick={onBack} disabled={loading}>Back</button>
//         <button type="submit" className="ws-button-primary" disabled={loading}>
//           {loading ? 'Submitting...' : 'Submit'}
//         </button>
//       </div>
//     </form>
//   );
// }





import Layout from "@/components/Layout";
import { useEffect, useState, useCallback } from "react";
import CyclingLines from "@/components/CyclingLines";
import { cn } from "@/lib/utils"; // ADDED cn import for styling utility

// --- 1. UPDATED SHARED INTERFACE FOR DATA ---
interface SellFormData {
  brand: string;
  model: string;
  reference: string;
  year: number | '';
  conditionNotes: string;
  // EXPANDED OPTIONS
  boxAndPapers: 'Yes' | 'No' | 'Only box' | 'Only papers';
  askingPrice: number | '';
  location: string;
  // DEFINED CONTACT OPTIONS
  contactMethod: 'Email' | 'Phone number' | 'WhatsApp';
  // NEW FIELD FOR CONTACT DETAIL
  contactDetail: string;
  preferredPayout: string;
}

// --- 2. API FETCH HELPER (URL Corrected for Public Endpoint) ---
const API_BASE_URL = "http://127.0.0.1:8000";

async function submitSellRequest(data: Partial<SellFormData>) {
  const payload = {
    brand: data.brand,
    model: data.model,
    asking_price: Number(data.askingPrice),
    condition: data.conditionNotes || 'Unspecified',

    // Consolidated all details into the description field
    description: `Ref: ${data.reference || 'N/A'}. Year: ${data.year || 'N/A'}. Papers: ${data.boxAndPapers}. Payout: ${data.preferredPayout}. Location: ${data.location || 'N/A'}. Contact: ${data.contactMethod}: ${data.contactDetail || 'N/A'}.`,
  };

  // Target the expected /public/sell-requests endpoint
  const res = await fetch(`${API_BASE_URL}/public/sell-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(errorData.detail || `HTTP error ${res.status}`);
  }

  return res.json();
}
// --- END API FETCH HELPER ---


export default function Sell() {
  useEffect(() => {
    document.title = "Sell Your Luxury Watch | Fast Offers & Authentication — WatchStory";
  }, []);

  return (
    <Layout>
      <section className="ws-container py-16">
        <h1 className="font-title text-4xl">Sell Hello your watch</h1>
        <p className="text-offwhite/70 mt-3 max-w-2xl">Get a fair offer fast. Our specialists evaluate condition, provenance, and demand to place your watch with the right collector.</p>
        <CyclingLines
          className="mt-4 text-xl text-gold/90"
          lines={[
            "Get instant payment",
            "Free insured shipping",
            "Expert authentication",
            "Fair, market-based offers",
            "Offer within 24 hours",
          ]}
          cycleIntervalSec={2.5}
          perLetterDurationSec={1}
          easing="ease-in-out"
          letterStaggerSec={0.04}
        />
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 bg-card/60">
            <h3 className="font-title text-2xl">Evaluation</h3>
            <p className="text-offwhite/70 mt-2">Transparent criteria and market-backed pricing.</p>
          </div>
          <div className="border rounded-lg p-6 bg-card/60">
            <h3 className="font-title text-2xl">Authentication</h3>
            <p className="text-offwhite/70 mt-2">Movement and materials verified by experts.</p>
          </div>
          <div className="border rounded-lg p-6 bg-card/60">
            <h3 className="font-title text-2xl">Fast payout</h3>
            <p className="text-offwhite/70 mt-2">Insured shipping and rapid settlement.</p>
          </div>
        </div>
      </section>

      <section className="ws-container pb-24">
        <SingleStepSellForm />
      </section>
    </Layout>
  );
}

// ====================================================================
// --- Utility Components (Updated to include cn utility) ---

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <div className="text-sm text-offwhite/70 mb-1">{label}</div>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full bg-transparent border px-3 py-2 rounded-md placeholder:text-offwhite/40" />
}
function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className="w-full bg-transparent border px-3 py-2 rounded-md" />
}
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="w-full min-h-24 bg-transparent border px-3 py-2 rounded-md" />
}

// ====================================================================
// --- SINGLE STEP FORM COMPONENT ---

function SingleStepSellForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<SellFormData>>({
    brand: 'Rolex',
    model: '',
    reference: '',
    year: '',
    conditionNotes: '',
    boxAndPapers: 'Yes',
    askingPrice: '',
    location: '',
    contactMethod: 'Email',
    contactDetail: '', // Holds the conditional input value
    preferredPayout: 'Bank Transfer'
  });

  const handleChange = useCallback((field: keyof SellFormData, value: string | number | 'Yes' | 'No' | 'Only box' | 'Only papers') => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Consolidated Validation
      if (!formData.brand || formData.brand === "") {
        throw new Error("Missing required field: Brand.");
      }
      if (!formData.model || formData.model === "") {
        throw new Error("Missing required field: Model.");
      }
      if (typeof formData.askingPrice !== 'number' || isNaN(formData.askingPrice) || formData.askingPrice <= 0) {
        throw new Error("Missing required field: Asking price (must be a number greater than 0).");
      }
      // Check that contact method is selected AND the detail field is filled
      if (!formData.contactMethod || !formData.contactDetail || formData.contactDetail === "") {
        throw new Error(`Missing required detail for the selected contact method (${formData.contactMethod}).`);
      }

      await submitSellRequest(formData);

      alert("Success! We've received your sell request. We will get back to you shortly.");

    } catch (error) {
      console.error("Submission failed:", error);
      alert(`Submission failed. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const contactType = formData.contactMethod;
  const contactInputLabel =
    contactType === 'Email' ? 'Your Email' :
      contactType === 'Phone number' ? 'Your Phone Number' :
        'Your WhatsApp Number';
  const contactInputType = contactType === 'Email' ? 'email' : 'text';


  return (
    <div className="border rounded-xl bg-card/60">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="text-sm text-offwhite/60">Submit your watch details</div>
      </div>
      <form className="p-6 grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>

        {/* --- ROW 1: BRAND & MODEL --- */}
        <Field label="Brand">
          <Select
            required
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
        <Field label="Model">
          <Input
            required
            placeholder="Submariner Date"
            value={formData.model || ''}
            onChange={e => handleChange('model', e.target.value)}
          />
        </Field>

        {/* --- ROW 2: REFERENCE & YEAR --- */}
        <Field label="Reference No.">
          <Input
            required
            placeholder="126610LN"
            value={formData.reference || ''}
            onChange={e => handleChange('reference', e.target.value)}
          />
        </Field>
        <Field label="Year">
          <Input
            type="number"
            placeholder="2022"
            required
            value={formData.year || ''}
            onChange={e => handleChange('year', Number(e.target.value))}
          />
        </Field>

        {/* --- ROW 3: BOX & PRICE --- */}
        <Field label="Box & Papers">
          <Select
            value={formData.boxAndPapers}
            onChange={e => handleChange('boxAndPapers', e.target.value as SellFormData['boxAndPapers'])}
          >
            <option>Yes</option>
            <option>No</option>
            {/* ADDED NEW OPTIONS */}
            <option>Only box</option>
            <option>Only papers</option>
          </Select>
        </Field>
        <Field label="Asking price (USD)">
          <Input
            type="number"
            placeholder="0"
            required
            value={formData.askingPrice || ''}
            onChange={e => handleChange('askingPrice', Number(e.target.value))}
          />
        </Field>

        {/* --- ROW 4: CONDITION NOTES (Full Width) --- */}
        <Field label="Condition notes" className="md:col-span-2">
          <Textarea
            placeholder="Surface wear, hairlines, etc."
            value={formData.conditionNotes || ''}
            onChange={e => handleChange('conditionNotes', e.target.value)}
          />
        </Field>

        {/* --- ROW 5: CONDITIONAL CONTACT INPUT --- */}
        <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
          <Field label="Preferred Contact Method">
            <Select
              value={contactType}
              onChange={e => {
                // 1. Update contactMethod type
                handleChange('contactMethod', e.target.value as SellFormData['contactMethod']);
                // 2. Clear existing detail when type changes
                handleChange('contactDetail', '');
              }}
            >
              <option>Email</option>
              <option>Phone number</option>
              <option>WhatsApp</option>
            </Select>
          </Field>

          {/* CONDITIONAL CONTACT INPUT FIELD */}
          <Field label={contactInputLabel} key={contactType}> {/* Use key to reset component state */}
            <Input
              type={contactInputType}
              placeholder={contactType === 'Email' ? 'john.doe@mail.com' : 'e.g., +971 50 123 4567'}
              required
              value={formData.contactDetail || ''}
              onChange={e => handleChange('contactDetail', e.target.value)}
            />
          </Field>
        </div>

        {/* --- ROW 6: LOCATION & PAYOUT --- */}
        <Field label="Location">
          <Input
            placeholder="City, Country"
            value={formData.location || ''}
            onChange={e => handleChange('location', e.target.value)}
          />
        </Field>
        <Field label="Preferred payout">
          <Select
            value={formData.preferredPayout}
            onChange={e => handleChange('preferredPayout', e.target.value)}
          >
            <option>Bank Transfer</option>
            <option>Crypto</option>
            <option>Cash (in person)</option>
          </Select>
        </Field>

        {/* --- ROW 7: FILE UPLOAD (Full Width) --- */}
        <Field label="Upload photos" className="md:col-span-2">
          <Input type="file" accept="image/*" multiple className="block text-sm py-1" />
        </Field>

        {/* --- SUBMIT BUTTON --- */}
        <div className="md:col-span-2 flex justify-end pt-2">
          <button type="submit" className="ws-button-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
}

// NOTE: All multi-step functions (StepOne, StepTwo, StepThree) have been completely removed,
// as requested, to clean up the file and use the new SingleStepSellForm component.