// client/components/BuyPageFilter.tsx
import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock list of popular search tags
const popularTags = [
  "ROLEX",
  "PATEK",
  "OMEGA",
  "CARTIER",
  "VACHERON",
  "TUDOR",
  "BREGUET",
  "JAEGER-LECOULTRE",
  "GRAND SEIKO",
  "LANGE",
  "ROLEX SUBMARINER",
  "ROLEX DAYTONA",
];

export default function BuyPageFilter() {
  return (
    <div className="pt-8 pb-10">
      
      {/* Search Input and Filter/Sort Buttons */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-offwhite/50" />
          <Input
            type="text"
            placeholder="SEARCH LISTINGS"
            className="w-full h-12 bg-card/60 border-border/60 text-base pl-10 placeholder:text-offwhite/50 focus-visible:ring-gold"
          />
        </div>
        
        {/* Filter Button */}
        <Button 
          variant="outline" 
          className="h-12 border-border/60 bg-card/60 hover:bg-card/90"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          FILTER
        </Button>

        {/* Sort Button */}
        <Button 
          variant="outline" 
          className="h-12 border-border/60 bg-card/60 hover:bg-card/90"
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          SORT
        </Button>
      </div>

      {/* Popular Searches */}
      <div className="mt-8">
        <h3 className="text-sm text-offwhite/70 mb-3">POPULAR SEARCHES</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              // Tailwind class directly targets the primary style defined in global.css
              className="bg-primary/90 text-primary-foreground font-medium cursor-pointer hover:bg-primary transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}