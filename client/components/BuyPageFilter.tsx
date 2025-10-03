// client/components/BuyPageFilter.tsx
import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// Assuming Select components from a UI library like shadcn/ui
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; 

// --- NEW PROPS DEFINITION ---
interface BuyPageFilterProps {
  searchQuery: string;
  sortOption: string;
  onSearchChange: (query: string) => void;
  onSortChange: (option: string) => void;
  onFilterChange: (key: string, value: string) => void; // General filter change (for future use)
  productCount: number;
}
// ----------------------------

// Mock list of popular search tags
const popularTags = [
  "ROLEX",
  "PATEK",
  "OMEGA",
  "CARTIER",
  "VACHERON",
  "TUDOR",
  "ROLEX SUBMARINER",
  "ROLEX DAYTONA",
];

// Mock for simple filter selection (e.g., watch status)
const filterOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'new', label: 'New Arrivals' },
    { value: 'sold', label: 'Recently Sold' },
];

// Mock for sort selection
const sortOptions = [
    { value: 'none', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Model: A-Z' },
];


export default function BuyPageFilter({
  searchQuery,
  sortOption,
  onSearchChange,
  onSortChange,
  onFilterChange,
  productCount,
}: BuyPageFilterProps) {

  // Handler for clicking a popular tag
  const handleTagClick = (tag: string) => {
    onSearchChange(tag);
  };
    
  // Mock filter state for demonstration (since we don't have a complex filter modal)
  const [statusFilter, setStatusFilter] = React.useState('all');

  return (
    <div className="pt-8 pb-10">
      
      {/* Search Input, Filter/Sort Selects, and Count */}
      <div className="flex items-center gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-offwhite/50" />
          <Input
            type="text"
            placeholder="SEARCH LISTINGS"
            value={searchQuery} // <-- CONNECTED TO PARENT STATE
            onChange={(e) => onSearchChange(e.target.value)} // <-- HANDLER TO PARENT
            className="w-full h-12 bg-card/60 border-border/60 text-base pl-10 placeholder:text-offwhite/50 focus-visible:ring-gold"
          />
        </div>

        {/* Product Count (Moved here for better visibility) */}
        <div className="hidden sm:block text-sm text-offwhite/70 whitespace-nowrap">
            {productCount} results
        </div>
        
        {/* Filter Select (Placeholder for complex filtering) */}
        <Select 
            value={statusFilter} 
            onValueChange={(value) => {
                setStatusFilter(value);
                // For a real filter, you'd call onFilterChange('status', value);
                console.log("Mock Filter selected:", value); 
            }}
        >
            <SelectTrigger className="w-[120px] h-12 border-border/60 bg-card/60 hover:bg-card/90">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="FILTER" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
                {filterOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

        {/* Sort Select (Functional) */}
        <Select value={sortOption} onValueChange={onSortChange}> {/* <-- HANDLER TO PARENT */}
            <SelectTrigger className="w-[120px] h-12 border-border/60 bg-card/60 hover:bg-card/90">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="SORT" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
                {sortOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>

      {/* Popular Searches */}
      <div className="mt-8">
        <h3 className="text-sm text-offwhite/70 mb-3">POPULAR SEARCHES</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              // Add onClick handler to update the search query
              onClick={() => handleTagClick(tag)} // <-- HANDLER TO PAARENT
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