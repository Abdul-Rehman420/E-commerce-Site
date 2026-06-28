"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount, toggleCart } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-beige/90 backdrop-blur-md border-b border-navy/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button
          className="lg:hidden text-navy"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        <Link href="/" className="flex flex-col items-center justify-center group">
          <span className="font-serif text-2xl tracking-tighter font-semibold uppercase leading-none group-hover:text-gold transition-colors duration-300">
            RT
          </span>
        </Link>

        <div className="hidden lg:flex items-center space-x-10">
          <Link href="/shop" className="text-sm font-medium tracking-wide hover:text-gold transition-colors duration-200">Shop</Link>
          <Link href="/collections" className="text-sm font-medium tracking-wide hover:text-gold transition-colors duration-200">Collections</Link>
          <Link href="/blog" className="text-sm font-medium tracking-wide hover:text-gold transition-colors duration-200">Blog</Link>
          <Link href="/about" className="text-sm font-medium tracking-wide hover:text-gold transition-colors duration-200">The Word</Link>
          <Link href="/size-guide" className="text-sm font-medium tracking-wide hover:text-gold transition-colors duration-200">Size Guide</Link>
        </div>

        <div className="flex items-center space-x-5">
          <button
            className="text-navy hover:text-gold transition-colors duration-200 flex items-center"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <Link href="/account" className="text-navy hover:text-gold transition-colors duration-200 flex items-center" aria-label="Account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="5" />
              <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
            </svg>
          </Link>
          <button
            className="text-navy hover:text-gold transition-colors duration-200 flex items-center relative"
            onClick={toggleCart}
            aria-label="Cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gold text-navy text-[0.65rem] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-navy/5 bg-beige px-6 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
            }}
            className="max-w-2xl mx-auto flex gap-4"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-b border-navy/30 pb-2 text-sm text-navy placeholder:text-navy/40 bg-transparent focus:outline-none focus:border-navy"
              autoFocus
            />
            <button type="submit" className="text-sm font-medium text-navy hover:text-gold">Search</button>
          </form>
        </div>
      )}

      {mobileOpen && (
        <div className="lg:hidden border-t border-navy/5 bg-beige px-6 py-4 space-y-4">
          <Link href="/shop" className="block text-sm font-medium tracking-wide hover:text-gold" onClick={() => setMobileOpen(false)}>Shop</Link>
          <Link href="/collections" className="block text-sm font-medium tracking-wide hover:text-gold" onClick={() => setMobileOpen(false)}>Collections</Link>
          <Link href="/blog" className="block text-sm font-medium tracking-wide hover:text-gold" onClick={() => setMobileOpen(false)}>Blog</Link>
          <Link href="/about" className="block text-sm font-medium tracking-wide hover:text-gold" onClick={() => setMobileOpen(false)}>The Word</Link>
          <Link href="/size-guide" className="block text-sm font-medium tracking-wide hover:text-gold" onClick={() => setMobileOpen(false)}>Size Guide</Link>
          <Link href="/account" className="block text-sm font-medium tracking-wide hover:text-gold" onClick={() => setMobileOpen(false)}>My Account</Link>
        </div>
      )}
    </nav>
  );
}
