"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, generateId } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ fullName: user?.name || "", phone: user?.phone || "", street: "", city: "Lahore", province: "Punjab", zipCode: "" });
  const [placed, setPlaced] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  const applyCoupon = () => {
    const saved = JSON.parse(localStorage.getItem("rt_coupons") || "[]");
    const coupons = [
      { code: "FAITH10", type: "percentage", value: 10, minOrder: 1000 },
      { code: "FIRSTORDER", type: "fixed", value: 200, minOrder: 1500 },
      { code: "GRACE20", type: "percentage", value: 20, minOrder: 2000 },
      ...saved,
    ];
    const c = coupons.find((c: { code: string; type: string; value: number; minOrder: number }) => c.code === couponCode.toUpperCase());
    if (!c) { setCouponMsg("Invalid coupon"); return; }
    if (total < c.minOrder) { setCouponMsg(`Minimum order Rs. ${c.minOrder}`); return; }
    const disc = c.type === "percentage" ? (total * c.value) / 100 : c.value;
    setDiscount(Math.min(disc, total));
    setCouponMsg(`Coupon applied! You saved ${formatPrice(Math.min(disc, total))}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    const orders = JSON.parse(localStorage.getItem("rt_orders") || "[]");
    orders.push({
      id: "ORD-" + Date.now(), userId: user?.id || "guest", items, total: total - discount, subtotal: total,
      discount, couponCode, status: "pending", paymentMethod: "cod",
      shippingAddress: { id: generateId(), userId: user?.id || "guest", ...form, isDefault: true },
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), notes: "",
    });
    localStorage.setItem("rt_orders", JSON.stringify(orders));
    clearCart();
  };

  if (placed) {
    return (
      <div className="pt-24 pb-24 px-6 max-w-lg mx-auto text-center">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" className="mx-auto mb-6">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h1 className="font-serif text-3xl font-medium text-navy mb-4">Order Placed!</h1>
        <p className="text-sm text-navy/60 mb-8">Thank you for your order. You&apos;ll pay <strong>{formatPrice(total - discount)}</strong> on delivery via COD.</p>
        <button onClick={() => router.push("/shop")} className="bg-navy text-beige px-8 py-3 text-sm font-medium hover:bg-navy/90 transition-colors">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="pt-12 pb-24 px-6 max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl md:text-4xl tracking-tight font-medium text-navy mb-10">Checkout</h1>
      {items.length === 0 ? (
        <p className="text-sm text-navy/50">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="font-serif text-xl font-medium text-navy mb-4">Shipping Details</h2>
            {(["fullName","phone","street","city","province","zipCode"] as const).map((f) => (
              <div key={f}>
                <label className="block text-sm font-medium text-navy mb-1.5 capitalize">{f === "zipCode" ? "ZIP Code" : f.replace(/([A-Z])/g, " $1")}</label>
                <input type="text" required value={form[f]} onChange={(e) => setForm({...form, [f]: e.target.value})} className="w-full border border-navy/20 px-4 py-3 text-sm bg-transparent text-navy focus:outline-none focus:border-navy" />
              </div>
            ))}
            <div className="pt-4">
              <div className="flex items-center gap-3 mb-6 p-4 bg-navy/5">
                <input type="radio" checked readOnly className="accent-navy" />
                <span className="text-sm text-navy">Cash on Delivery (COD)</span>
              </div>
              <button type="submit" className="w-full bg-navy text-beige py-3.5 text-sm font-medium tracking-wide hover:bg-navy/90 transition-colors">Place Order - Pay {formatPrice(total - discount)} on Delivery</button>
            </div>
          </form>

          <div>
            <h2 className="font-serif text-xl font-medium text-navy mb-4">Order Summary</h2>
            <div className="bg-white border border-navy/10 p-6 space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-navy/70">{item.product.name} x{item.quantity}</span>
                  <span className="text-navy font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-navy/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-navy/70"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
                {discount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
                <div className="flex justify-between text-base font-medium text-navy pt-2 border-t border-navy/10"><span>Total</span><span>{formatPrice(total - discount)}</span></div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-navy mb-3">Have a coupon?</h3>
              <div className="flex gap-3">
                <input type="text" placeholder="Enter code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-1 border border-navy/20 px-4 py-2.5 text-sm bg-transparent text-navy focus:outline-none focus:border-navy" />
                <button type="button" onClick={applyCoupon} className="bg-navy text-beige px-5 py-2.5 text-sm font-medium hover:bg-navy/90 transition-colors">Apply</button>
              </div>
              {couponMsg && <p className="text-xs mt-2 text-navy/60">{couponMsg}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
