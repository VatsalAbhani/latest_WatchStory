import Layout from "@/components/Layout";
import Placeholder from "./Placeholder";
import { useEffect } from "react";

export default function BlogIndex() {
  useEffect(() => { document.title = "WatchStory Journal — Stories, Guides, and Provenance"; }, []);
  return (
    <Layout>
      <Placeholder title="Journal" description="Clean index with brand tags, search, and recent posts." />
    </Layout>
  );
}
