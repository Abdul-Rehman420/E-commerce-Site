"use client";

import { useState, useEffect } from "react";
import { fetchOrders, updateOrderStatus, updatePaymentStatus } from "@/lib/data";
import { formatPrice, formatDate } from "@/lib/utils";
import { Order } from "@/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const handleStatus = async (id: string, status: string) => {
    await updateOrderStatus(id, status);
    setOrders(orders.map((o) => o.id === id ? { ...o, status: status as Order["status"] } : o));
  };

  const handlePayment = async (id: string, paymentStatus: string) => {
    await updatePaymentStatus(id, paymentStatus);
    setOrders(orders.map((o) => o.id === id ? { ...o, paymentStatus: paymentStatus as Order["paymentStatus"] } : o));
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-medium text-navy mb-8">Orders</h1>
      <div className="flex flex-wrap gap-3 mb-6">
        {["all", "pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 text-xs font-medium capitalize transition-colors ${filter === s ? "bg-navy text-beige" : "bg-transparent text-navy/60 border border-navy/20 hover:border-navy"}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="bg-white border border-navy/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy/10 bg-navy/[0.02]">
              <th className="text-left py-4 px-4 font-medium text-navy">Order ID</th>
              <th className="text-left py-4 px-4 font-medium text-navy hidden md:table-cell">Date</th>
              <th className="text-left py-4 px-4 font-medium text-navy">Customer</th>
              <th className="text-left py-4 px-4 font-medium text-navy hidden sm:table-cell">Items</th>
              <th className="text-left py-4 px-4 font-medium text-navy">Total</th>
              <th className="text-left py-4 px-4 font-medium text-navy">Payment</th>
              <th className="text-left py-4 px-4 font-medium text-navy">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-navy/5 hover:bg-navy/[0.02]">
                <td className="py-4 px-4 font-medium text-navy text-sm">{order.id}</td>
                <td className="py-4 px-4 text-navy/60 text-xs hidden md:table-cell">{formatDate(order.createdAt ?? "")}</td>
                <td className="py-4 px-4 text-sm text-navy/70">{order.shippingAddress?.fullName}</td>
                <td className="py-4 px-4 text-sm text-navy/70 hidden sm:table-cell">{order.items.length}</td>
                <td className="py-4 px-4 text-sm text-navy font-medium">{formatPrice(order.total)}</td>
                <td className="py-4 px-4 text-xs">
                  <div className="flex flex-col gap-1">
                    <span className="capitalize text-navy/60">{order.paymentMethod === "bank_transfer" ? "Bank Transfer" : "COD"}</span>
                    {order.paymentMethod === "bank_transfer" ? (
                      <button onClick={() => handlePayment(order.id, order.paymentStatus === "paid" ? "pending" : "paid")}
                        className={`text-[0.65rem] uppercase tracking-wide font-medium text-left ${order.paymentStatus === "paid" ? "text-green-600" : "text-amber-600 hover:text-green-600"}`}>
                        {order.paymentStatus === "paid" ? "Paid" : "Mark Paid"}
                      </button>
                    ) : (
                      <span className="text-navy/40">n/a</span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <select value={order.status} onChange={(e) => handleStatus(order.id, e.target.value)}
                    className={`text-[0.65rem] uppercase tracking-wide font-medium bg-transparent border-none cursor-pointer focus:outline-none ${
                      order.status === "delivered" ? "text-green-600" : 
                      order.status === "cancelled" ? "text-red-500" :
                      order.status === "shipped" ? "text-blue-600" : "text-gold"
                    }`}>
                    {["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} className="text-sm text-navy/50 p-6 text-center">No orders found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
