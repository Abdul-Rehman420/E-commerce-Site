"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { fetchUserOrders } from "@/lib/data";
import { formatPrice, formatDate } from "@/lib/utils";
import { Order } from "@/types";

export default function AccountPage() {
  const { user, profile, logout } = useAuth();
  const router = useRouter();
  const { count } = useWishlist();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) router.replace("/auth/login");
    else if (user.id) fetchUserOrders(user.id).then(setOrders);
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="pt-12 pb-24 px-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="font-serif text-3xl font-medium text-navy">My Account</h1>
          <p className="text-sm text-navy/60 mt-1">Welcome back, {profile?.name || user.email}</p>
        </div>
        <button onClick={logout} className="text-xs text-navy/50 underline hover:text-navy">Sign Out</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Link href="/account/orders" className="bg-white border border-navy/10 p-6 hover:border-navy/30 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" className="mb-4">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-sm font-medium text-navy mb-1">Orders</h3>
          <p className="text-xs text-navy/50">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
        </Link>
        <Link href="/account/wishlist" className="bg-white border border-navy/10 p-6 hover:border-navy/30 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" className="mb-4">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <h3 className="text-sm font-medium text-navy mb-1">Wishlist</h3>
          <p className="text-xs text-navy/50">{count} item{count !== 1 ? "s" : ""}</p>
        </Link>
        <div className="bg-white border border-navy/10 p-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" className="mb-4">
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6M23 11h-6" />
          </svg>
          <h3 className="text-sm font-medium text-navy mb-1">Profile</h3>
          <p className="text-xs text-navy/50">{user.email}</p>
        </div>
      </div>

      {orders.length > 0 && (
        <div>
          <h2 className="font-serif text-xl font-medium text-navy mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="bg-white border border-navy/10 p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-navy">{order.id}</p>
                  <p className="text-xs text-navy/50">{formatDate(order.createdAt ?? "")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-navy">{formatPrice(order.total)}</p>
                  <span className="text-[0.65rem] uppercase tracking-wide text-navy/50">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
