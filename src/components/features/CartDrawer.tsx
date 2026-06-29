"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, itemCount, total } = useCart();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100]" onClick={toggleCart}>
          <div className="absolute inset-0 bg-navy/50" />
        </div>
      )}
      <div
        className={`fixed top-0 right-0 z-[101] h-full w-full sm:w-[420px] bg-beige shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b border-navy/10">
            <h2 className="font-serif text-xl font-medium text-navy">Cart ({itemCount})</h2>
            <button onClick={toggleCart} className="text-navy/50 hover:text-navy" aria-label="Close cart">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-navy/30 mb-4">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <p className="text-sm text-navy/50">Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize.label}-${item.selectedColor.color}`} className="flex gap-4 pb-6 border-b border-navy/10">
                  <div className="relative w-20 h-24 bg-navy/5 shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-navy">{item.product.name}</h3>
                    <p className="text-xs text-navy/50 mb-1">{item.selectedColor.color} / {item.selectedSize.label}</p>
                    <p className="text-sm font-medium text-navy">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-navy/20">
                        <button onClick={() => updateQuantity(item.product.id, item.selectedSize.label, item.selectedColor.color, item.quantity - 1)} className="w-7 h-7 text-xs text-navy/60 hover:text-navy">-</button>
                        <span className="w-7 h-7 flex items-center justify-center text-xs font-medium text-navy border-x border-navy/20">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.selectedSize.label, item.selectedColor.color, item.quantity + 1)} className="w-7 h-7 text-xs text-navy/60 hover:text-navy">+</button>
                      </div>
                      <button onClick={() => removeItem(item.product.id, item.selectedSize.label, item.selectedColor.color)} className="text-xs text-navy/40 hover:text-navy underline">Remove</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-navy/10 px-6 py-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-navy/70">Subtotal</span>
                <span className="font-medium text-navy">{formatPrice(total)}</span>
              </div>
              <Link
                href="/cart"
                onClick={toggleCart}
                className="block w-full bg-navy text-beige py-3.5 text-sm font-medium tracking-wide text-center hover:bg-navy/90 transition-colors"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={toggleCart}
                className="block w-full border border-navy text-navy py-3 text-sm font-medium tracking-wide text-center hover:bg-navy hover:text-beige transition-colors"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
