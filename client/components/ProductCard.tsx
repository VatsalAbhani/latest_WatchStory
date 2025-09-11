import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/state/cart";
import type { Product } from "@/lib/data";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const priceFmt = new Intl.NumberFormat(undefined, { style: "currency", currency: product.currency });

  return (
    <div className="group bg-card/60 border rounded-lg overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={product.images.primary} alt={`${product.brand} ${product.model}`} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        {product.images.secondary && (
          <img src={product.images.secondary} alt="alt view" className="absolute inset-0 object-cover w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" />
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="text-sm text-offwhite/60">{product.brand}</div>
        <div className="font-title text-lg">{product.model} <span className="text-offwhite/50">(Ref {product.ref})</span></div>
        <div className="text-offwhite/80">{priceFmt.format(product.price)}</div>
        <p className="text-sm text-offwhite/70 line-clamp-2">{product.story}</p>
        <div className="flex gap-2 pt-2">
          <Link to={`/watch/${product.slug}`} className="ws-button-secondary">View</Link>
          <button className="ws-button-primary" onClick={() => { add({ id: product.id, title: `${product.brand} ${product.model}`, price: product.price, image: product.images.primary }); toast("Added to cart"); }}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
