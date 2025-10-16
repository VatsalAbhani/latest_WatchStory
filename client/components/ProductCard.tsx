// client/components/ProductCard.tsx

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/state/cart";
import type { Product } from "@/lib/data";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // IMPORTED CAROUSEL COMPONENTS

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const priceFmt = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: product.currency,
  });

  const primaryImage = product.images.urls[0] || "/placeholder.svg";

  // New toast function to confirm add to cart
  const handleAddToCart = () => {
    add({
      id: product.id,
      title: `${product.brand} ${product.model}`,
      price: product.price,
      image: primaryImage,
    });
    toast.success(`${product.brand} ${product.model} added to cart`);
  };

  // Guard clause to ensure we have images to display
  if (product.images.urls.length === 0) {
    return (
      <div className="group bg-card/60 border rounded-lg overflow-hidden p-6 text-offwhite/50">
        No images available.
      </div>
    );
  }

  return (
    <div className="group bg-card/60 border rounded-lg overflow-hidden">

      {/* aspect-[16/9] will increase/decrease the image size in the Buy page */}
      {/* aspect-[4/5] */}
      <div className="relative aspect-[4/5]">
        {/* CAROUSEL IMPLEMENTATION */}
        <Carousel className="w-full h-full">
          <CarouselContent>
            {product.images.urls.map((image, index) => (
              <CarouselItem key={index}>
                <div className="w-full h-full overflow-hidden flex justify-center items-center">
                  <img
                    src={image}
                    alt={`${product.brand} ${product.model} - View ${index + 1}`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* NAVIGATION BUTTONS */}
          {product.images.urls.length > 1 && (
            <>
              {/* Position and style arrows to be visible over the image */}
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 size-8 bg-card/70 border-none opacity-80 hover:opacity-100" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 size-8 bg-card/70 border-none opacity-80 hover:opacity-100" />
            </>
          )}
        </Carousel>
      </div>

      <div className="p-4 space-y-2">
        <div className="text-sm text-offwhite/60">{product.brand}</div>
        <div className="font-title text-lg">
          {product.model}{" "}
          <span className="text-offwhite/50">(Ref {product.ref})</span>
        </div>
        <div className="text-offwhite/80">{priceFmt.format(product.price)}</div>
        <p className="text-sm text-offwhite/70 line-clamp-2">
          {product.story}
        </p>
        <div className="flex gap-2 pt-2">
          <Link to={`/watch/${product.slug}`} className="ws-button-secondary">
            View
          </Link>
          <button className="ws-button-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}