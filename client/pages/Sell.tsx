import TerminalStoryBar from "@/components/TerminalStoryBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function Sell() {
  useEffect(() => {
    document.title = "Sell Your Luxury Watch | Fast Offers & Authentication — WatchStory";
  }, []);

  return (
    <div className="ws-grain">
      <TerminalStoryBar />
      <section className="ws-container py-16">
        <h1 className="font-title text-4xl">Sell your watch</h1>
        <p className="text-offwhite/70 mt-3 max-w-2xl">Get a fair offer fast. Our specialists evaluate condition, provenance, and demand to place your watch with the right collector.</p>
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
        <SellForm />
      </section>
      <Footer />
    </div>
  );
}

function SellForm() {
  const [step, setStep] = useState(1);
  return (
    <div className="border rounded-xl bg-card/60">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className={"h-2 w-2 rounded-full "+(step===1?"bg-gold":"bg-offwhite/30")} /> Step 1
          <span className={"h-2 w-2 rounded-full ml-4 "+(step===2?"bg-gold":"bg-offwhite/30")} /> Step 2
          <span className={"h-2 w-2 rounded-full ml-4 "+(step===3?"bg-gold":"bg-offwhite/30")} /> Step 3
        </div>
        <div className="text-sm text-offwhite/60">Let’s tell your watch’s story.</div>
      </div>
      <div className="p-6">
        {step === 1 && <StepOne onNext={() => setStep(2)} />}
        {step === 2 && <StepTwo onBack={() => setStep(1)} onNext={() => setStep(3)} />}
        {step === 3 && <StepThree onBack={() => setStep(2)} />}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
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

function StepOne({ onNext }: { onNext: () => void }) {
  return (
    <form className="grid md:grid-cols-2 gap-4" onSubmit={(e)=>{ e.preventDefault(); onNext(); }}>
      <Field label="Brand">
        <Select required defaultValue="">
          <option value="" disabled>Choose brand</option>
          <option>Rolex</option>
          <option>Audemars Piguet</option>
          <option>Richard Mille</option>
          <option>Patek Philippe</option>
          <option>Cartier</option>
          <option>Other</option>
        </Select>
      </Field>
      <Field label="Model"><Input required placeholder="Submariner Date" /></Field>
      <Field label="Reference No."><Input required placeholder="126610LN" /></Field>
      <Field label="Year"><Input type="number" placeholder="2022" required /></Field>
      <Field label="Condition notes"><Textarea placeholder="Surface wear, hairlines, etc." /></Field>
      <Field label="Box & Papers"><Select defaultValue="Yes"><option>Yes</option><option>No</option></Select></Field>
      <div className="md:col-span-2 flex justify-end">
        <button className="ws-button-primary">Next</button>
      </div>
    </form>
  );
}

function StepTwo({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <form className="grid gap-4" onSubmit={(e)=>{ e.preventDefault(); onNext(); }}>
      <Field label="Upload photos">
        <input type="file" accept="image/*" multiple className="block text-sm" />
      </Field>
      <div className="flex justify-between">
        <button type="button" className="ws-button-secondary" onClick={onBack}>Back</button>
        <button className="ws-button-primary">Next</button>
      </div>
    </form>
  );
}

function StepThree({ onBack }: { onBack: () => void }) {
  return (
    <form className="grid md:grid-cols-2 gap-4" onSubmit={(e)=>{ e.preventDefault(); alert("We’re reviewing your story. Expect a response within 24 hours."); }}>
      <Field label="Asking price (USD)"><Input type="number" placeholder="0" /></Field>
      <Field label="Location"><Input placeholder="City, Country" /></Field>
      <Field label="Contact method"><Select defaultValue="Email"><option>Email</option><option>Phone</option><option>WhatsApp</option></Select></Field>
      <Field label="Preferred payout"><Select defaultValue="Bank Transfer"><option>Bank Transfer</option><option>Crypto</option><option>Cash (in person)</option></Select></Field>
      <div className="md:col-span-2 flex justify-between pt-2">
        <button type="button" className="ws-button-secondary" onClick={onBack}>Back</button>
        <button className="ws-button-primary">Submit</button>
      </div>
    </form>
  );
}
