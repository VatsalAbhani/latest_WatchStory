import TerminalStoryBar from "@/components/TerminalStoryBar";
import Footer from "@/components/Footer";
import Placeholder from "./Placeholder";

export default function Cart() {
  return (
    <div className="ws-grain">
      <TerminalStoryBar />
      <Placeholder title="Cart" description="Minimal, elegant cart. Escrow, authentication, insured shipping." />
      <Footer />
    </div>
  );
}
