"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const wishlisted = products.filter((p) => items.includes(p.id));

  return (
    <div className="pt-12 pb-24 px-6 max-w-5xl mx-auto">
      <Link href="/account" className="text-xs text-navy/50 hover:text-navy mb-6 block">&larr; Back to Account</Link>
      <h1 className="font-serif text-3xl font-medium text-navy mb-10">My Wishlist</h1>
      {wishlisted.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-navy/50 mb-4">Your wishlist is empty</p>
          <Link href="/shop" className="inline-flex px-6 py-3 bg-navy text-beige text-sm font-medium">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlisted.map((product) => (
            <div key={product.id} className="bg-white border border-navy/10 p-4">
              <div className="relative aspect-[3/4] bg-navy/5 mb-4 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                <button onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/80 flex items-center justify-center text-xs text-navy/50 hover:text-navy">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <h3 className="text-sm font-medium text-navy mb-1">{product.name}</h3>
              <p className="text-sm text-navy mb-3">{formatPrice(product.price)}</p>
              <button onClick={() => addItem(product, 1, product.colors[0], product.sizes[0])}
                className="w-full bg-navy text-beige py-2.5 text-xs font-medium tracking-wide hover:bg-navy/90 transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
