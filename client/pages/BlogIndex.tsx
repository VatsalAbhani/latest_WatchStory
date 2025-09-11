import TerminalStoryBar from "@/components/TerminalStoryBar";
import Footer from "@/components/Footer";
import Placeholder from "./Placeholder";
import { useEffect } from "react";

export default function BlogIndex() {
  useEffect(() => { document.title = "WatchStory Journal — Stories, Guides, and Provenance"; }, []);
  return (
    <div className="ws-grain">
      <TerminalStoryBar />
      <Placeholder title="Journal" description="Clean index with brand tags, search, and recent posts." />
      <Footer />
    </div>
  );
}
