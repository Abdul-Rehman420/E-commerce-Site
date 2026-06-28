"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const product = products.find((p) => p.id === params.id);
  const [form, setForm] = useState({ name: product?.name || "", price: product?.price?.toString() || "", description: product?.description || "", stock: (product?.stock ?? 10).toString(), verse: product?.verse || "", verseRef: product?.verseRef || "" });

  if (!product) return <p className="text-sm text-navy/50">Product not found</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("rt_admin_products") || "[]");
    const idx = existing.findIndex((p: { id: string }) => p.id === params.id);
    if (idx >= 0) {
      existing[idx] = { ...existing[idx], ...form, price: Number(form.price), stock: Number(form.stock) };
      localStorage.setItem("rt_admin_products", JSON.stringify(existing));
    }
    router.push("/admin/products");
  };

  const handleDelete = () => {
    const existing = JSON.parse(localStorage.getItem("rt_admin_products") || "[]");
    localStorage.setItem("rt_admin_products", JSON.stringify(existing.filter((p: { id: string }) => p.id !== params.id)));
    router.push("/admin/products");
  };

  return (
    <div className="max-w-2xl">
      <Link href="/admin/products" className="text-xs text-navy/50 hover:text-navy mb-6 block">&larr; Back to Products</Link>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-medium text-navy">Edit Product</h1>
        <button onClick={handleDelete} className="text-xs text-red-500 underline hover:text-red-700">Delete</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {(["name","price","description","stock","verse","verseRef"] as const).map((f) => (
          <div key={f}>
            <label className="block text-sm font-medium text-navy mb-1.5 capitalize">{f.replace(/([A-Z])/g, " $1")}</label>
            {f === "description" ? (
              <textarea rows={3} value={form[f]} onChange={(e) => setForm({...form, [f]: e.target.value})} className="w-full border border-navy/20 px-4 py-3 text-sm bg-transparent text-navy focus:outline-none focus:border-navy" />
            ) : (
              <input type={f === "price" || f === "stock" ? "number" : "text"} required value={form[f]} onChange={(e) => setForm({...form, [f]: e.target.value})} className="w-full border border-navy/20 px-4 py-3 text-sm bg-transparent text-navy focus:outline-none focus:border-navy" />
            )}
          </div>
        ))}
        <button type="submit" className="bg-navy text-beige px-8 py-3 text-sm font-medium tracking-wide hover:bg-navy/90 transition-colors">Save Changes</button>
      </form>
    </div>
  );
}
