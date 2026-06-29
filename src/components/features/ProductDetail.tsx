"use client";

import { useState, useEffect } from "react";
import { fetchProductReviews } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Product, Review } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { AddToWishlist } from "@/components/features/AddToWishlist";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    fetchProductReviews(product.id).then(setProductReviews);
  }, [product.id]);

  const avgRating = productReviews.length ? Math.round(productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length) : 0;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <div className="flex flex-col space-y-4">
          <div className="relative aspect-[3/4] bg-white overflow-hidden group">
            <Image src={product.images[selectedImage]} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
            <div className="absolute top-3 right-3 z-10">
              <AddToWishlist productId={product.id} className="text-navy/50 hover:text-terracotta w-10 h-10 bg-white/80 flex items-center justify-center" />
            </div>
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(1).map((img, index) => (
                <button key={index} className="relative aspect-square bg-white overflow-hidden" onClick={() => setSelectedImage(index + 1)}>
                  <Image src={img} alt={`${product.name} view ${index + 2}`} fill sizes="25vw" className="object-cover hover:opacity-80 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center sticky top-28 h-fit">
          <div className="flex items-center gap-2 text-navy/60 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /><path d="M4 12h16" />
            </svg>
            <span className="text-xs font-serif italic font-medium">{product.verseRef}</span>
            {productReviews.length > 0 && (
              <span className="text-xs text-gold ml-auto">{'★'.repeat(avgRating)}{'☆'.repeat(5-avgRating)} ({productReviews.length})</span>
            )}
          </div>

          <h1 className="font-serif text-3xl lg:text-4xl tracking-tight font-medium text-navy mb-2">{product.name}</h1>
          <p className="text-xl text-navy font-medium mb-6">{formatPrice(product.price)}</p>
          <p className="text-sm text-navy/70 leading-relaxed mb-8">{product.description}</p>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-navy">Color: <span className="text-navy/60 font-normal">{selectedColor.color}</span></span>
            </div>
            <div className="flex space-x-3">
              {product.colors.map((variant) => (
                <button key={variant.color} onClick={() => setSelectedColor(variant)} disabled={!variant.inStock}
                  className={`w-8 h-8 rounded-full transition-all ${selectedColor.color === variant.color ? "ring-2 ring-offset-2 ring-offset-beige ring-navy" : "ring-1 ring-offset-2 ring-offset-beige ring-transparent hover:ring-navy/30"} ${!variant.inStock ? "opacity-40 cursor-not-allowed" : ""}`}
                  style={{ backgroundColor: variant.colorHex }} aria-label={variant.color} />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-navy">Size</span>
              <Link href="/size-guide" className="text-xs text-navy/60 underline hover:text-navy">Fit Guide</Link>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {product.sizes.map((size) => (
                <button key={size.label} onClick={() => setSelectedSize(size)} disabled={!size.inStock}
                  className={`py-2.5 border text-sm font-medium transition-colors ${selectedSize.label === size.label ? "border-navy text-navy bg-navy/5" : "border-navy/20 text-navy hover:border-navy"} ${!size.inStock ? "opacity-50 cursor-not-allowed" : ""}`}>{size.label}</button>
              ))}
            </div>
          </div>

          <button onClick={() => addItem(product, 1, selectedColor, selectedSize)}
            className="w-full bg-navy text-beige py-4 text-sm font-medium tracking-wide hover:bg-navy/90 transition-colors mb-8">Add to Cart - {formatPrice(product.price)}</button>

          <div className="border-t border-navy/10 pt-6">
            <div className="mb-4">
              <button className="text-sm font-medium text-navy pb-2 border-b-2 border-navy">The Inspiration</button>
            </div>
            <p className="text-sm text-navy/70 leading-relaxed font-light">&ldquo;{product.verse}&rdquo;</p>
          </div>

          {productReviews.length > 0 && (
            <div className="border-t border-navy/10 pt-6 mt-6">
              <h3 className="text-sm font-medium text-navy mb-4">Reviews ({productReviews.length})</h3>
              <div className="space-y-4">
                {productReviews.map((r) => (
                  <div key={r.id} className="border-b border-navy/5 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gold">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span>
                      <span className="text-xs font-medium text-navy">{r.userName}</span>
                    </div>
                    <p className="text-xs text-navy/70">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
