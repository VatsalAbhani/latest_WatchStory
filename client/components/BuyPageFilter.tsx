// // client/components/BuyPageFilter.tsx
// import React from 'react';
// import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// // Assuming Select components from a UI library like shadcn/ui
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; 

// // --- NEW PROPS DEFINITION ---
// interface BuyPageFilterProps {
//   searchQuery: string;
//   sortOption: string;
//   onSearchChange: (query: string) => void;
//   onSortChange: (option: string) => void;
//   onFilterChange: (key: string, value: string) => void; // General filter change (for future use)
//   productCount: number;
// }
// // ----------------------------

// // Mock list of popular search tags
// const popularTags = [
//   "ROLEX",
//   "PATEK",
//   "OMEGA",
//   "CARTIER",
//   "VACHERON",
//   "TUDOR",
//   "ROLEX SUBMARINER",
//   "ROLEX DAYTONA",
// ];

// // Mock for simple filter selection (e.g., watch status)
// const filterOptions = [
//     { value: 'all', label: 'All Statuses' },
//     { value: 'new', label: 'New Arrivals' },
//     { value: 'sold', label: 'Recently Sold' },
// ];

// // Mock for sort selection
// const sortOptions = [
//     { value: 'none', label: 'Default' },
//     { value: 'price-asc', label: 'Price: Low to High' },
//     { value: 'price-desc', label: 'Price: High to Low' },
//     { value: 'name-asc', label: 'Model: A-Z' },
// ];


// export default function BuyPageFilter({
//   searchQuery,
//   sortOption,
//   onSearchChange,
//   onSortChange,
//   onFilterChange,
//   productCount,
// }: BuyPageFilterProps) {

//   // Handler for clicking a popular tag
//   const handleTagClick = (tag: string) => {
//     onSearchChange(tag);
//   };
    
//   // Mock filter state for demonstration (since we don't have a complex filter modal)
//   const [statusFilter, setStatusFilter] = React.useState('all');

//   return (
//     <div className="pt-8 pb-10">
      
//       {/* Search Input, Filter/Sort Selects, and Count */}
//       <div className="flex items-center gap-4">
        
//         {/* Search Input */}
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-offwhite/50" />
//           <Input
//             type="text"
//             placeholder="SEARCH LISTINGS"
//             value={searchQuery} // <-- CONNECTED TO PARENT STATE
//             onChange={(e) => onSearchChange(e.target.value)} // <-- HANDLER TO PARENT
//             className="w-full h-12 bg-card/60 border-border/60 text-base pl-10 placeholder:text-offwhite/50 focus-visible:ring-gold"
//           />
//         </div>

//         {/* Product Count (Moved here for better visibility) */}
//         <div className="hidden sm:block text-sm text-offwhite/70 whitespace-nowrap">
//             {productCount} results
//         </div>
        
//         {/* Filter Select (Placeholder for complex filtering) */}
//         <Select 
//             value={statusFilter} 
//             onValueChange={(value) => {
//                 setStatusFilter(value);
//                 // For a real filter, you'd call onFilterChange('status', value);
//                 console.log("Mock Filter selected:", value); 
//             }}
//         >
//             <SelectTrigger className="w-[120px] h-12 border-border/60 bg-card/60 hover:bg-card/90">
//                 <SlidersHorizontal className="h-4 w-4 mr-2" />
//                 <SelectValue placeholder="FILTER" />
//             </SelectTrigger>
//             <SelectContent className="bg-card border-border">
//                 {filterOptions.map(opt => (
//                     <SelectItem key={opt.value} value={opt.value}>
//                         {opt.label}
//                     </SelectItem>
//                 ))}
//             </SelectContent>
//         </Select>

//         {/* Sort Select (Functional) */}
//         <Select value={sortOption} onValueChange={onSortChange}> {/* <-- HANDLER TO PARENT */}
//             <SelectTrigger className="w-[120px] h-12 border-border/60 bg-card/60 hover:bg-card/90">
//                 <ArrowUpDown className="h-4 w-4 mr-2" />
//                 <SelectValue placeholder="SORT" />
//             </SelectTrigger>
//             <SelectContent className="bg-card border-border">
//                 {sortOptions.map(opt => (
//                     <SelectItem key={opt.value} value={opt.value}>
//                         {opt.label}
//                     </SelectItem>
//                 ))}
//             </SelectContent>
//         </Select>
//       </div>

//       {/* Popular Searches */}
//       <div className="mt-8">
//         <h3 className="text-sm text-offwhite/70 mb-3">POPULAR SEARCHES</h3>
//         <div className="flex flex-wrap gap-2">
//           {popularTags.map((tag) => (
//             <Badge
//               key={tag}
//               // Add onClick handler to update the search query
//               onClick={() => handleTagClick(tag)} // <-- HANDLER TO PAARENT
//               className="bg-primary/90 text-primary-foreground font-medium cursor-pointer hover:bg-primary transition-colors"
//             >
//               {tag}
//             </Badge>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



// client/components/BuyPageFilter.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BRANDS = [
  { key: "all", label: "All" },
  { key: "rolex", label: "Rolex" },
  { key: "audemars-piguet", label: "Audemars Piguet" },
  { key: "richard-mille", label: "Richard Mille" },
  { key: "patek-philippe", label: "Patek Philippe" },
  { key: "cartier", label: "Cartier" },
  { key: "omega", label: "Omega" },
  { key: "other", label: "Other" },
] as const;

type BrandKey = (typeof BRANDS)[number]["key"];

type SortOption = "latest" | "price-asc" | "price-desc";

interface BuyPageFilterProps {
  selectedBrand: BrandKey;
  sortOption: SortOption;
  onBrandChange: (brand: BrandKey) => void;
  onSortChange: (option: SortOption) => void;
}

export default function BuyPageFilter({
  selectedBrand,
  sortOption,
  onBrandChange,
  onSortChange,
}: BuyPageFilterProps) {
  return (
    <div className="w-full border border-border/40 rounded-2xl bg-background/60 backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-4 flex flex-col gap-3 sm:gap-4">
      {/* Top row: label + sort */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Filter by brand
        </p>

        <div className="flex items-center gap-2 text-[0.5rem] sm:text-xs text-muted-foreground">
          <span className="uppercase tracking-[0.22em] hidden sm:inline">
            Sort
          </span>
          <Select
            value={sortOption}
            onValueChange={(value) => onSortChange(value as SortOption)}
          >
            <SelectTrigger className="h-8 px-3 text-xs border-border/60 bg-background/80">
              <SelectValue placeholder="Latest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Brand pills: WRAP, no horizontal scroll */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {BRANDS.map((brand) => {
          const isActive = selectedBrand === brand.key;
          return (
            <Button
              key={brand.key}
              type="button"
              variant={isActive ? "default" : "outline"}
              onClick={() => onBrandChange(brand.key)}
              className={[
                "h-8 px-3 rounded-full text-xs font-medium",
                "border-border/50",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/70 hover:bg-muted/70 text-muted-foreground",
              ].join(" ")}
            >
              {brand.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export type { BrandKey, SortOption };
export { BRANDS };
