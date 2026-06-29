"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchUserOrders } from "@/lib/data";
import { formatPrice, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Order } from "@/types";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user?.id) fetchUserOrders(user.id).then(setOrders);
  }, [user]);

  return (
    <div className="pt-12 pb-24 px-6 max-w-4xl mx-auto">
      <Link href="/account" className="text-xs text-navy/50 hover:text-navy mb-6 block">&larr; Back to Account</Link>
      <h1 className="font-serif text-3xl font-medium text-navy mb-10">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-sm text-navy/50">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-navy/10 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-navy">{order.id}</p>
                  <p className="text-xs text-navy/50">{formatDate(order.createdAt ?? "")}</p>
                </div>
                <span className="text-xs uppercase tracking-wide font-medium text-navy/60">{order.status}</span>
              </div>
              <div className="border-t border-navy/10 pt-4">
                {order.items.map((item, i: number) => (
                  <div key={i} className="flex justify-between text-sm text-navy/70 mb-2">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600 mt-2">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-medium text-navy border-t border-navy/10 pt-3 mt-3">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
