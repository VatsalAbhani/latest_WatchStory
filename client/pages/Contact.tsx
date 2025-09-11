import TerminalStoryBar from "@/components/TerminalStoryBar";
import Footer from "@/components/Footer";
import Placeholder from "./Placeholder";

export default function Contact() {
  return (
    <div className="ws-grain">
      <TerminalStoryBar />
      <Placeholder title="Contact" description="WhatsApp, email, and showroom by appointment." />
      <Footer />
    </div>
  );
}
