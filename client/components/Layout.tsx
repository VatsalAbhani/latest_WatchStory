import React from "react";
import TerminalStoryBar from "@/components/TerminalStoryBar";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ws-grain">
      <TerminalStoryBar />
      {children}
      <Footer />
    </div>
  );
}
