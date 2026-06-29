"use client";

import { useState, useEffect } from "react";
import { StatsCard } from "@/components/admin/StatsCard";
import { fetchOrders, fetchProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Order, Product } from "@/types";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
    fetchProducts().then(setProducts);
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "confirmed").length;

  return (
    <div>
      <h1 className="font-serif text-3xl font-medium text-navy mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard title="Total Revenue" value={formatPrice(totalRevenue)} icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <StatsCard title="Total Orders" value={orders.length.toString()} icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        <StatsCard title="Pending Orders" value={pendingOrders.toString()} icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        <StatsCard title="Products" value={products.length.toString()} icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-medium text-navy">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-navy/50 hover:text-navy underline">View All</Link>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between bg-white border border-navy/10 p-4">
                <div>
                  <p className="text-sm font-medium text-navy">{order.id}</p>
                  <p className="text-xs text-navy/50">{order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-navy">{formatPrice(order.total)}</p>
                  <span className="text-[0.65rem] uppercase tracking-wide text-navy/50">{order.status}</span>
                </div>
              </div>
            ))}
            {orders.length === 0 && <p className="text-sm text-navy/50">No orders yet</p>}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-medium text-navy">Quick Links</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { href: "/admin/products/new", label: "Add Product", icon: "M12 4v16m8-8H4" },
              { href: "/admin/coupons", label: "Coupons", icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" },
              { href: "/admin/blog/new", label: "New Blog Post", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
              { href: "/admin/reviews", label: "Reviews", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="bg-white border border-navy/10 p-5 hover:border-navy/30 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" className="mb-3">
                  <path d={link.icon} />
                </svg>
                <p className="text-sm font-medium text-navy">{link.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
