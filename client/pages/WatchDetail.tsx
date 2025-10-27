import { useParams } from "react-router-dom";
import { useEffect } from "react";
// Assuming FEATURED and Product type are imported from a consolidated data file
import { FEATURED, Product } from "@/lib/data"; 
import NotFound from "./NotFound";
import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";

// Component Imports
import Seo from "@/components/Seo"; 
import { Helmet } from "react-helmet-async"; 
import MagneticButton from "@/components/MagneticButton";
import { useCart } from "@/state/cart";
import { toast } from "sonner";
// UI Component Imports
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

// --- Data & Helper Functions (Kept from original file) ---

// Find watch data (Placeholder implementation - fetches from local FEATURED array)
const findWatchBySlug = (slug: string) => FEATURED.find((w) => w.slug === slug);
// const WHATSAPP_ICON_SRC = "/whatsapp-icon.png";

// FUNCTION: Generates dynamic Product Schema JSON-LD
const getProductSchema = (watch: Product, url: string) => {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `${watch.brand} ${watch.model} for Sale in Dubai`, 
    "image": watch.images.urls,
    "description": `Buy the authentic ${watch.brand} ${watch.model} watch in Dubai. Reference: ${watch.ref}. Year: ${watch.year}. Guaranteed authenticity and 12-month mechanical warranty.`,
    "sku": watch.ref,
    "brand": {
      "@type": "Brand",
      "name": watch.brand
    },
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": watch.currency,
      "price": watch.price,
      "itemCondition": "https://schema.org/UsedCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "WatchStory"
      }
    }
  };
};

// ----------------------------------------------------------------------


// --- Local Components for Watch Detail Page ---

function ProductImageGallery({ images }: { images: string[] }) {
  if (images.length === 0) {
    return <div className="h-96 bg-gray-200 flex items-center justify-center rounded-lg">Image Not Available</div>;
  }
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-full flex justify-center items-center bg-transparent">
                <img
                  src={image}
                  alt={`View ${index + 1}`}
                  className="object-contain w-full h-full max-h-[70vh]"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            {/* Custom styled arrows */}
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 size-10  text-white border-white/20 " />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 size-10  text-white border-white/20 " />
          </>
        )}
      </Carousel>
    </div>
  );
}

function ProductDetailsAndSpecs({ watch }: { watch: Product }) {
  const { add } = useCart();
  
  const priceFmt = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: watch.currency,
  });

  // const handleAddToCart = () => {
  //   add({
  //     id: watch.id,
  //     title: `${watch.brand} ${watch.model}`,
  //     price: watch.price,
  //     image: watch.images.urls[0],
  //   });
  //   // Use the imported toast component for a nice notification
  //   toast.success(`${watch.brand} ${watch.model} added to cart!`);
  // };

  // const handleInquire = () => {
  //   // Navigate to the contact page, as you have a separate Contact.tsx file
  //   window.location.href = '/contact';
  // };


// Prepare data for the new "Détails" section
  // Note: We are using placeholder values like 'Full Inclusions', 'Smoked Burgundy', and 'Titanium Case' 
  // since these specific fields might not exist on your 'Product' type yet.
  const detailsData = [
    { label: "MECANISM", value: watch.movement || 'Automatic Movement', span: 1 },
    { label: "REF. NUMBER", value: watch.ref, span: 1 }, // Using ref as a stand-in for serial
    { label: "SIZE", value: watch.size || '39 mm', span: 1 },
    
    
    { label: "BOX", value: watch.box ? 'Yes' : 'No', span: 1 },
    { label: "MATERIAL", value: watch.material || 'Titanium Case', span: 1 },
    
    { label: "CONDITION", value: watch.condition || 'A', span: 1 },
   
    { label: "CERTIFICATE", value: watch.certificate ? 'Yes' : 'No', span: 1 },
    { label: "DIAL COLOR", value: watch.dialcolor || 'Smoked Burgundy', span: 1 },
    { label: "DELIVERY", value: 'Worldwide', span: 1 },
  ];

// Utility function to convert details array to rows of 3 columns
const getDetailRows = (data: typeof detailsData) => {
  const rows = [];
  for (let i = 0; i < data.length; i += 3) {
    rows.push(data.slice(i, i + 3));
  }
  return rows;
};





  return (
    <div className="md:sticky md:top-24 space-y-8 p-4 md:p-0">
      
      {/* Title and Price */}
      <div>
        <p className="text-gold font-semibold text-xl">{watch.brand}</p>
        <h1 className="font-title text-4xl sm:text-5xl mt-1 leading-tight">{watch.model}</h1>
        
        <p className="font-sans text-base font-semibold">{watch.ref}</p>
        {/* <p className="font-sans text-2xl font-bold text-foreground mt-4">{priceFmt.format(watch.price)}</p> */}
        <p className="font-sans text-2xl font-semibold text-foreground mt-4">Contact for Price</p>
      </div>

      <Separator className="bg-border/50" />

      {/* Description */}
      <p className="text-offwhite/80 font-sans text-base leading-relaxed">{watch.story}</p>

      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* <MagneticButton
          onClick={handleAddToCart}
          variant="primary"
          className="flex-1 text-base font-extrabold"
        >
          Add to Cart
        </MagneticButton> */}
        <MagneticButton
        href="https://wa.me/971545056156"
          // onClick={handleInquire}
          variant="secondary"
          target="_blank" // <--- Recommended addition
          rel="noopener noreferrer" // <--- Recommended addition
          className="flex-1 text-base font-extrabold"
        >
          Discuss & Order It Now (WhatsApp)


        </MagneticButton>
        

      </div>

      <Separator className="bg-border/50" />


      {/* ========================================================= */}
      {/* NEW: DETAILS SECTION (Mimics the uploaded image structure) */}
      {/* ========================================================= */}
      <div className="space-y-6">
        <h2 className="font-title text-3xl pb-2 ">Details</h2>
        
        {/* Using a grid structure to mimic the 3-column layout */}
        <div className="grid grid-cols-3 gap-y-6 gap-x-4">
          {detailsData.map((item, index) => (
            <div key={index} className="col-span-1">
              {/* Label (Uppercase and slightly faded) */}
              <p className="font-sans text-xs text-offwhite/70 uppercase tracking-wider mb-1">
                {item.label}
                {/* Optional Info Icon - not implemented here, but you'd add it next to the label */}
              </p>
              {/* Value (Bold and prominent) */}
              <p className="font-sans text-base font-medium text-foreground leading-snug">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border/50" />
      {/* ========================================================= */}
      {/* END NEW SECTION */}
      {/* ========================================================= */}

      {/* Specifications Table */}
      {/* <h2 className="font-title text-2xl">Specifications</h2>
      <Table className="bg-card/60 border border-border/50 rounded-lg">
        <TableBody> */}
          {/* Reference */}
          {/* <TableRow className="hover:bg-transparent transition-colors">
            <TableCell className="w-1/3 text-sm font-semibold text-offwhite/70">Reference No.</TableCell>
            <TableCell className="w-2/3 text-sm text-foreground">{watch.ref}</TableCell>
          </TableRow> */}
          {/* Year */}
          {/* <TableRow className="hover:bg-transparent">
            <TableCell className="text-sm font-semibold text-offwhite/70">Year</TableCell>
            <TableCell className="text-sm text-foreground">{watch.year}</TableCell>
          </TableRow> */}
          {/* Condition */}
          {/* <TableRow className="hover:bg-transparent">
            <TableCell className="text-sm font-semibold text-offwhite/70">Condition</TableCell>
            <TableCell className="text-sm text-foreground capitalize">{watch.condition}</TableCell>
          </TableRow> */}
          {/* Movement */}
          {/* <TableRow className="hover:bg-transparent">
            <TableCell className="text-sm font-semibold text-offwhite/70">Movement</TableCell>
            <TableCell className="text-sm text-foreground">{watch.movement || 'Automatic'}</TableCell>
          </TableRow> */}
          {/* Availability */}
          {/* <TableRow className="hover:bg-transparent">
            <TableCell className="text-sm font-semibold text-offwhite/70">Availability</TableCell>
            <TableCell className={cn("text-sm font-medium capitalize", watch.availability === 'in_stock' ? 'text-green-500' : 'text-yellow-600')}>
              {watch.availability.replace('_', ' ')}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
    </div>
  );
}


// --- MAIN PAGE COMPONENT ---

export default function WatchDetail() {
  const { slug } = useParams<{ slug: string }>();
  // Retrieve the watch details from the FEATURED array using the URL slug
  const watch = findWatchBySlug(slug!);
  
  if (!watch) {
    return <NotFound />;
  }
  
  // Format price for SEO description
  const priceFmt = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: watch.currency,
  });

  // Generate dynamic Schema and URL for Helmet
  const currentUrl = `/watch/${slug}`; 
  const productSchema = getProductSchema(watch, currentUrl);
  const jsonLd = JSON.stringify(productSchema);

  return (
    <Layout>
      
      {/* 1. DYNAMIC META TAGS, TITLE, AND CANONICAL (SEO Component) */}
      <Seo 
        title={`${watch.brand} ${watch.model} | Ref: ${watch.ref} for Sale in Dubai`} 
        description={`Buy the authenticated ${watch.brand} ${watch.model} watch in Dubai. Reference: ${watch.ref}. Includes 12-month warranty. Price: ${watch.currency} ${watch.price.toLocaleString()}`}
        canonical={currentUrl}
        ogTitle={`${watch.brand} ${watch.model} | WatchStory Dubai`}
      />

      {/* 2. PRODUCT SCHEMA JSON-LD INJECTION */}
      <Helmet>
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: jsonLd }} 
        />
      </Helmet>
      {/* ------------------------------------------------------------- */}


      {/* Main Content Grid: Image Gallery (left) and Details (right) */}
      <div className="ws-container pt-12 pb-24">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Column 1: Image Gallery */}
          <div className="order-2 md:order-1">
            <ProductImageGallery images={watch.images.urls} />
          </div>

          {/* Column 2: Details and CTA */}
          <div className="order-1 md:order-2">
            <ProductDetailsAndSpecs watch={watch} />
          </div>

        </div>
      </div>
      
    </Layout>
  );
}