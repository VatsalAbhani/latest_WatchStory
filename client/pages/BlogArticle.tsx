import TerminalStoryBar from "@/components/TerminalStoryBar";
import Footer from "@/components/Footer";
import Placeholder from "./Placeholder";

export default function BlogArticle() {
  return (
    <div className="ws-grain">
      <TerminalStoryBar />
      <Placeholder title="Article" description="Article template with lead image, TOC, and related stories." />
      <Footer />
    </div>
  );
}
