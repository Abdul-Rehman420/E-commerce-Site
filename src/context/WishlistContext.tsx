"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

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
  const { user } = useAuth();
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      supabase.from("wishlists").select("product_id").eq("user_id", user.id).then(({ data }) => {
        if (data) setItems(data.map((w) => w.product_id));
      });
    } else {
      const saved = localStorage.getItem("rt_wishlist");
      if (saved) setItems(JSON.parse(saved));
    }
  }, [user]);

  useEffect(() => {
    if (!user) localStorage.setItem("rt_wishlist", JSON.stringify(items));
  }, [items, user]);

  const addToWishlist = useCallback(async (productId: string) => {
    setItems((prev) => prev.includes(productId) ? prev : [...prev, productId]);
    if (user) {
      await supabase.from("wishlists").upsert({ user_id: user.id, product_id: productId }, { onConflict: "user_id,product_id" });
    }
  }, [user]);

  const removeFromWishlist = useCallback(async (productId: string) => {
    setItems((prev) => prev.filter((id) => id !== productId));
    if (user) {
      await supabase.from("wishlists").delete().eq("user_id", user.id).eq("product_id", productId);
    }
  }, [user]);

  const isWishlisted = useCallback((productId: string) => items.includes(productId), [items]);

  const toggleWishlist = useCallback((productId: string) => {
    if (items.includes(productId)) removeFromWishlist(productId);
    else addToWishlist(productId);
  }, [items, addToWishlist, removeFromWishlist]);

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
