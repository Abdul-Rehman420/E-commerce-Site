"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-medium text-navy">Products</h1>
        <Link href="/admin/products/new" className="bg-navy text-beige px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-navy/90 transition-colors">+ Add Product</Link>
      </div>
      <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md border border-navy/20 px-4 py-2.5 text-sm bg-transparent text-navy focus:outline-none focus:border-navy mb-6" />
      <div className="bg-white border border-navy/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy/10 bg-navy/[0.02]">
              <th className="text-left py-4 px-4 font-medium text-navy">Product</th>
              <th className="text-left py-4 px-4 font-medium text-navy hidden md:table-cell">Category</th>
              <th className="text-left py-4 px-4 font-medium text-navy">Price</th>
              <th className="text-left py-4 px-4 font-medium text-navy hidden sm:table-cell">Stock</th>
              <th className="text-right py-4 px-4 font-medium text-navy">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-navy/5 hover:bg-navy/[0.02]">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-13 bg-navy/5 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-medium text-navy text-sm">{p.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-navy/60 text-xs hidden md:table-cell capitalize">{p.category}</td>
                <td className="py-4 px-4 text-sm text-navy">{formatPrice(p.price)}</td>
                <td className="py-4 px-4 hidden sm:table-cell"><span className={`text-xs ${(p.stock ?? 0) < 5 ? "text-red-500" : "text-green-600"}`}>{p.stock ?? 0} units</span></td>
                <td className="py-4 px-4 text-right">
                  <Link href={`/admin/products/${p.id}/edit`} className="text-xs text-navy/50 underline hover:text-navy">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-sm text-navy/50 p-6 text-center">No products found</p>}
      </div>
    </div>
  );
}
