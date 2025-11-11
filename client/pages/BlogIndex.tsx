// client/pages/Blogpage

import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { useEffect, useState, useMemo } from "react";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";

import { Article, POSTS } from "@/lib/data";
import MagneticBlogCard from "@/components/MagneticBlogCard";
import TypewriterHeading from "@/components/TypewriterHeading";
import { cn } from "@/lib/utils";

// Mock available categories/tags for the filter section
const ALL_CATEGORIES = [
"Rolex", "Audemars Piguet", "Patek Philippe", "Richard Mille", "Cartier",
  "Horology History", "Investment Guides", "Authentication",
  "Gen Z", "Vintage", "Guide"
];


function BlogIndexJsonLd() {
  const ORIGIN = "https://watchstory.ae";
  const items = POSTS
    .filter(p => !p.externalUrl && p.slug)
    .map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${ORIGIN}/blog/${p.slug}`,
      name: p.title,
    }));

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "WatchStory Journal",
    "url": `${ORIGIN}/blog`,
    "isPartOf": { "@type": "WebSite", "url": ORIGIN },
    "about": "Guides, stories and investment insights on luxury watches",
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": items
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(collection)}</script>
      <script type="application/ld+json">{JSON.stringify(itemList)}</script>
    </Helmet>
  );
}


export default function BlogIndex() {

  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter the posts based on search query and selected category
  const filteredPosts = useMemo(() => {
    let posts = [...POSTS];
    
    if (selectedCategory) {
        posts = posts.filter(p => p.brandTags.includes(selectedCategory));
    }

    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        posts = posts.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.excerpt.toLowerCase().includes(query) ||
            p.brandTags.some(tag => tag.toLowerCase().includes(query))
        );
    }

    return posts;
  }, [searchQuery, selectedCategory]);

  return (
    <Layout>


<Seo
    title="WatchStory Journal | Guides, History & Investment Tips"
    description="Explore the official WatchStory journal. Get expert insights, investment guides, and stories on luxury brands like Rolex, Patek Philippe, and more."
    canonical="/blog"
  />

<BlogIndexJsonLd /> 
      
      {/* Header/Hero Section */}
      {/* <section className="ws-container pt-20 pb-4">
        <TypewriterHeading
          lines={["WatchStory Journal"]}
          charsPerSecond={30}
          showDots={false}
          loop={false}
          triggerOnScroll={true}
          className="font-title text-3xl sm:text-5xl md:text-6xl"
        />

      </section> */}



      <section className="ws-container mt-24  pt-16 pb-0 md:pb-8 bg-background">
        {/* <h4 className="text-sm text-offwhite/60 font-medium tracking-widest mb-2">DISCOVER</h4> */}

        {/* MODIFIED H1/H2 BLOCK: Explicitly mention commercial keywords */}
        <h1 className="font-title font-normal text-4xl sm:text-5xl max-w-6xl">
        Articles Recommended For You
        </h1>

        

      </section>



      {/* Filter and Search Bar Section */}



      {/* <section className="ws-container py-8 border-b border-border/50">
        
        Search Input
        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-offwhite/50" />
          <Input
            type="text"
            placeholder={`Search ${filteredPosts.length} stories...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 bg-card/60 border-border/60 text-base pl-10 placeholder:text-offwhite/50 focus-visible:ring-gold"
          />
        </div>

        Categories/Tags Filter
        <div className="mt-6">
          <p className="text-sm text-offwhite/70 mb-3">FILTER BY TOPICS</p>
          <div className="flex flex-wrap gap-2">
            
            All button 
            <Badge
              onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
              className={cn(
                "font-medium cursor-pointer transition-colors",
                !selectedCategory && !searchQuery
                  ? "bg-gold text-black hover:bg-gold/90"
                  : "bg-muted/50 text-offwhite/70 hover:bg-muted/80"
              )}
            >
              All Stories ({POSTS.length})
            </Badge>

            Category Buttons
            {ALL_CATEGORIES.map((tag) => (
              <Badge
                key={tag}
                onClick={() => {
                  setSelectedCategory(tag);
                  setSearchQuery(''); // Clear search on category select
                }}
                className={cn(
                  "font-medium cursor-pointer transition-colors",
                  selectedCategory === tag
                    ? "bg-primary/90 text-primary-foreground hover:bg-primary"
                    : "bg-muted/50 text-offwhite/70 hover:bg-muted/80"
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section> */}



      {/* Blog Post Grid */}
      <section className="ws-container pb-24 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-20">
          
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              // Use MagneticBlogCard for each post for the nice visual effect
              <MagneticBlogCard 
                key={post.id} 
                post={post} 
                index={index} 
                // Display the first card prominently if a specific presentation is desired (e.g., featured)
                variant={index === 0 && !selectedCategory && !searchQuery ? 'featured' : 'grid'}
                headingTag="h2"
              />
            ))
          ) : (
            <p className="text-offwhite/70 col-span-full text-center py-10">
              No stories found matching your criteria.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}