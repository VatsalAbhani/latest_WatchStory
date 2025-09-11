import { Link } from "react-router-dom";
import type { Article } from "@/lib/data";

export default function BlogCard({ post }: { post: Article }) {
  return (
    <article className="bg-card/60 border rounded-lg overflow-hidden">
      <div className="aspect-[16/9] overflow-hidden">
        <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-4">
        <div className="text-xs text-offwhite/60">{new Date(post.publishedAt).toLocaleDateString()}</div>
        <h3 className="font-title text-xl mt-1">{post.title}</h3>
        <p className="text-sm text-offwhite/70 mt-2 line-clamp-2">{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="inline-block mt-3 text-gold">Read →</Link>
      </div>
    </article>
  );
}
