"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

interface WishlistContextType {
  items: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("rt_wishlist");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("rt_wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.includes(productId) ? prev : [...prev, productId]);
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.filter((id) => id !== productId));
  }, []);

  const isWishlisted = useCallback((productId: string) => items.includes(productId), [items]);

  const toggleWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]);
  }, []);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
