"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-24 px-6 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-navy/30">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <h1 className="font-serif text-3xl font-medium text-navy mb-4">Your cart is empty</h1>
        <p className="text-navy/60 text-sm mb-8 font-light">Add some declarations to your collection.</p>
        <Link href="/shop" className="inline-flex px-8 py-3.5 bg-navy text-beige text-sm font-medium tracking-wide hover:bg-navy/90 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-12 pb-24 px-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight font-medium text-navy">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-xs text-navy/50 underline hover:text-navy transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6 mb-12">
        {items.map((item) => (
          <div
            key={`${item.product.id}-${item.selectedSize.label}-${item.selectedColor.color}`}
            className="flex gap-6 pb-6 border-b border-navy/10"
          >
            <div className="relative w-24 h-32 bg-navy/5 shrink-0">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-navy mb-1">{item.product.name}</h3>
              <p className="text-xs text-navy/50 mb-2">
                {item.selectedColor.color} / {item.selectedSize.label}
              </p>
              <p className="text-sm font-medium text-navy">{formatPrice(item.product.price)}</p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => removeItem(item.product.id, item.selectedSize.label, item.selectedColor.color)}
                className="text-navy/40 hover:text-navy transition-colors"
                aria-label="Remove item"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
              <div className="flex items-center border border-navy/20">
                <button
                  onClick={() => updateQuantity(item.product.id, item.selectedSize.label, item.selectedColor.color, item.quantity - 1)}
                  className="w-8 h-8 text-xs text-navy/60 hover:text-navy"
                >
                  -
                </button>
                <span className="w-8 h-8 flex items-center justify-center text-xs font-medium text-navy border-x border-navy/20">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.selectedSize.label, item.selectedColor.color, item.quantity + 1)}
                  className="w-8 h-8 text-xs text-navy/60 hover:text-navy"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-navy/10 pt-8">
        <div className="flex justify-between items-center mb-8">
          <span className="text-base font-medium text-navy">Estimated Total</span>
          <span className="text-2xl font-medium text-navy">{formatPrice(total)}</span>
        </div>
        <Link href="/checkout" className="block w-full bg-navy text-beige py-4 text-sm font-medium tracking-wide hover:bg-navy/90 transition-colors text-center">
          Checkout
        </Link>
        <Link
          href="/shop"
          className="block text-center mt-4 text-xs text-navy/50 underline hover:text-navy transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
