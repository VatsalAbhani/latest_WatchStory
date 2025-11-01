// client/pages/BlogArticle.tsx
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ARTICLE_REGISTRY } from "@/content/registry";          // <-- add
import type { ArticleFull } from "@/content/types";              // <-- add




function BreadcrumbsJsonLd({ slug, title }: { slug: string; title: string }) {
  const ORIGIN = "https://watchstory.ae";
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": ORIGIN },
      { "@type": "ListItem", "position": 2, "name": "Journal", "item": `${ORIGIN}/blog` },
      { "@type": "ListItem", "position": 3, "name": title, "item": `${ORIGIN}/blog/${slug}` }
    ]
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}






function ArticleJsonLd(props: {
  url: string;
  title: string;
  description: string;
  image: string | undefined;
  author?: string;
  datePublished?: string;   // ISO string preferred
  dateModified?: string;    // fallback to datePublished if not provided
  publisherName?: string;   // e.g., "WatchStory"
  publisherLogo?: string;   // absolute URL to logo
  keywords?: string[];      // optional
  section?: string;         // e.g., "Guide"
}) {
  const {
    url,
    title,
    description,
    image,
    author = "WatchStory Editorial",
    datePublished,
    dateModified,
    publisherName = "WatchStory",
    publisherLogo = "https://watchstory.ae/F1.png",
    keywords = [],
    section = "Guide",
  } = props;

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "headline": title,
    "description": description,
    "image": image ? [image] : undefined,
    "author": { "@type": "Person", "name": author },
    "publisher": {
      "@type": "Organization",
      "name": publisherName,
      "logo": { "@type": "ImageObject", "url": publisherLogo } 
    },
    "datePublished": datePublished || undefined,
    "dateModified": dateModified || datePublished || undefined,
    "articleSection": section,
    "keywords": keywords.length ? keywords.join(", ") : undefined,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}



export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article: ArticleFull | undefined = slug ? ARTICLE_REGISTRY[slug] : undefined;

  if (!article) {
    return (
      <Layout>
        <Seo title="Article Not Found" description="The requested article could not be found." />
        <div className="ws-container py-24">
          <h1 className="font-title text-3xl mb-4">Article not found</h1>
          <Link to="/blog" className="underline">Back to Journal</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo
        title={article.title}
        description={article.description}
        canonical={`/blog/${article.slug}`}
        ogType="article"
        ogImage={article.heroImage}
      />

      <ArticleJsonLd
        url={`https://watchstory.ae/blog/${article.slug}`}
        title={article.title}
        description={article.description}
        image={article.heroImage}
        author={article.author}
        datePublished={article.publishedAtISO}
        dateModified={article.publishedAtISO}
        publisherName="WatchStory"
        publisherLogo="https://watchstory.ae/F1.png"
        keywords={article.keywords}
        section="Guide"
      />



      <BreadcrumbsJsonLd slug={article.slug} title={article.title} />

      <section className="ws-container pt-16 pb-6">
        <h1 className="font-title text-4xl sm:text-5xl">{article.title}</h1>
        <p className="text-sm text-offwhite/60 mt-2">
          {article.publishedAtISO ? new Date(article.publishedAtISO).toLocaleDateString() : ""} • {article.author} {article.readingTime ? `• ${article.readingTime}` : ""}
        </p>
      </section>

      {article.heroImage && (
        <section className="ws-container">
          <img
            src={article.heroImage}
            alt="Rolex movement macro"
            className="w-full rounded-md border border-border/50"
          />
        </section>
      )}
      <section className="ws-container py-8">
        <article.Body />
      </section>

      <section className="ws-container pb-12">
        <Link to="/blog" className="underline text-offwhite/70 hover:text-offwhite">
          Back to Journal
        </Link>
      </section>
    </Layout>
  );
}