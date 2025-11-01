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
const ORIGIN = "https://watchstory.ae";





// Add this helper near the top (with imports)
const ProductBreadcrumbJsonLd = ({ title, slug }: { title: string; slug: string }) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: ORIGIN },
      { "@type": "ListItem", position: 2, name: "Buy", item: `${ORIGIN}/buy` },
      { "@type": "ListItem", position: 3, name: title, item: `${ORIGIN}/watch/${slug}` },
    ],
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};




const availabilityMap: Record<Product["availability"], string> = {
  in_stock: "https://schema.org/InStock",
  reserved: "https://schema.org/LimitedAvailability",
  sold: "https://schema.org/OutOfStock",
};


const conditionMap: Record<string, string> = {
  "brand new": "https://schema.org/NewCondition",
  "new": "https://schema.org/NewCondition",
  "like new": "https://schema.org/LikeNewCondition",
  "used": "https://schema.org/UsedCondition",
  "pre-owned": "https://schema.org/UsedCondition",
  "a": "https://schema.org/UsedCondition", // your current example
};

const absolutize = (url: string) =>
  url.startsWith("http") ? url : `${ORIGIN}${url}`;



// Find watch data (Placeholder implementation - fetches from local FEATURED array)
const findWatchBySlug = (slug: string) => FEATURED.find((w) => w.slug === slug);
// const WHATSAPP_ICON_SRC = "/whatsapp-icon.png";

// FUNCTION: Generates dynamic Product Schema JSON-LD
const getProductSchema = (watch: Product, routePath: string) => {

  const absoluteUrl = absolutize(routePath);
  const imagesAbs = (watch.images?.urls || []).map(absolutize);

   // Try to map your textual condition to a schema.org URL; default to UsedCondition
   const itemCondition =
   conditionMap[(watch.condition || "").toLowerCase()] ||
   "https://schema.org/UsedCondition";

 const availability =
   availabilityMap[watch.availability] || "https://schema.org/InStock";


   return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: `${watch.brand} ${watch.model}`,
    description: `Buy the authentic ${watch.brand} ${watch.model} in Dubai. Reference: ${watch.ref}. Year: ${watch.year}. Guaranteed authenticity.`,
    sku: watch.ref, // use ref as SKU (good enough if you don't have SKU/MPN/GTIN)
    brand: { "@type": "Brand", name: watch.brand },
    url: absoluteUrl,
    image: imagesAbs.length ? imagesAbs : undefined,
    material: watch.material,
    color: watch.dialcolor,         // optional but useful
    size: watch.size,               // optional but useful
    itemCondition,
    // If you later track ratings/reviews, you can add aggregateRating/review arrays here.
    offers: {
      "@type": "Offer",
      url: absoluteUrl,
      priceCurrency: watch.currency,
      price: watch.price,
      priceValidUntil: new Date(Date.now() + 1000*60*60*24*90).toISOString().split("T")[0], // ~90 days
      availability,
      itemCondition,
      seller: {
        "@type": "Organization",
        name: "WatchStory",
        url: ORIGIN,
        logo: `${ORIGIN}/F1.png`,
      },
    },
    "category":"Luxury Watch"
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
                    loading="lazy"
                    decoding="async"
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
  

  const currentPath = `/watch/${slug}`; // route path
  const absoluteOgImage = watch.images?.urls?.[0]
    ? (watch.images.urls[0].startsWith("http") ? watch.images.urls[0] : `${ORIGIN}${watch.images.urls[0]}`)
    : `${ORIGIN}/F1.png`;

  const productSchema = getProductSchema(watch, currentPath);


  // Format price for SEO description
  const priceFmt = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: watch.currency,
  });



  return (
    <Layout>
      
      {/* 1. DYNAMIC META TAGS, TITLE, AND CANONICAL (SEO Component) */}
      <Seo
        title={`${watch.brand} ${watch.model} ${watch.size} | Ref: ${watch.ref} for Sale in Dubai`}
        description={`Buy the authenticated ${watch.brand} ${watch.model}. Ref ${watch.ref}. Year ${watch.year}. Warranty included. Guaranteed authenticity.`}
        canonical={currentPath}
        ogType="product"
        ogImage={absoluteOgImage}
      />

      {/* 2. PRODUCT SCHEMA JSON-LD INJECTION */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>
      {/* ------------------------------------------------------------- */}

      <ProductBreadcrumbJsonLd title={`${watch.brand} ${watch.model}`} slug={slug!} />



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