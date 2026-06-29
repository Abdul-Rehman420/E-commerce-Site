"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateProduct, deleteProduct } from "@/lib/data";
import { products as staticProducts } from "@/data/products";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const product = staticProducts.find((p) => p.id === params.id);
  const [form, setForm] = useState({ name: product?.name || "", price: product?.price?.toString() || "", description: product?.description || "", stock: (product?.stock ?? 10).toString(), verse: product?.verse || "", verseRef: product?.verseRef || "" });

  if (!product) return <p className="text-sm text-navy/50">Product not found</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct(params.id, { ...form, price: Number(form.price), stock: Number(form.stock) });
    router.push("/admin/products");
  };

  const handleDelete = async () => {
    await deleteProduct(params.id);
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
