import TerminalStoryBar from "@/components/TerminalStoryBar";
import Footer from "@/components/Footer";
import Placeholder from "./Placeholder";

export default function Checkout() {
  return (
    <div className="ws-grain">
      <TerminalStoryBar />
      <Placeholder title="Checkout" description="Enquiry mode available if payments are not ready." />
      <Footer />
    </div>
  );
}
