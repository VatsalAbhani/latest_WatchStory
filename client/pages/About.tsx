import TerminalStoryBar from "@/components/TerminalStoryBar";
import Footer from "@/components/Footer";
import Placeholder from "./Placeholder";

export default function About() {
  return (
    <div className="ws-grain">
      <TerminalStoryBar />
      <Placeholder title="About" description="Minimal brand story and trust badges." />
      <Footer />
    </div>
  );
}
