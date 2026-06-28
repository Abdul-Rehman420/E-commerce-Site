"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", slug: "", price: "", description: "", category: "tees", stock: "10", verse: "", verseRef: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem("rt_admin_products") || "[]");
    products.push({ id: "p" + Date.now(), ...form, price: Number(form.price), stock: Number(form.stock), images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop"], colors: [{ color: "Default", colorHex: "#1A1A2E", inStock: true }], sizes: [{ label: "M", inStock: true }], createdAt: new Date().toISOString() });
    localStorage.setItem("rt_admin_products", JSON.stringify(products));
    router.push("/admin/products");
  };

  return (
    <div className="max-w-2xl">
      <Link href="/admin/products" className="text-xs text-navy/50 hover:text-navy mb-6 block">&larr; Back to Products</Link>
      <h1 className="font-serif text-3xl font-medium text-navy mb-8">New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {(["name","slug","price","description","stock","verse","verseRef"] as const).map((f) => (
          <div key={f}>
            <label className="block text-sm font-medium text-navy mb-1.5 capitalize">{f.replace(/([A-Z])/g, " $1")}</label>
            {f === "description" ? (
              <textarea rows={3} value={form[f]} onChange={(e) => setForm({...form, [f]: e.target.value})} className="w-full border border-navy/20 px-4 py-3 text-sm bg-transparent text-navy focus:outline-none focus:border-navy" />
            ) : (
              <input type={f === "price" || f === "stock" ? "number" : "text"} required value={form[f]} onChange={(e) => setForm({...form, [f]: e.target.value})} className="w-full border border-navy/20 px-4 py-3 text-sm bg-transparent text-navy focus:outline-none focus:border-navy" />
            )}
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Category</label>
          <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full border border-navy/20 px-4 py-3 text-sm bg-transparent text-navy focus:outline-none focus:border-navy">
            {["tees","hoodies","sweatshirts","accessories"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button type="submit" className="bg-navy text-beige px-8 py-3 text-sm font-medium tracking-wide hover:bg-navy/90 transition-colors">Save Product</button>
      </form>
    </div>
  );
}
