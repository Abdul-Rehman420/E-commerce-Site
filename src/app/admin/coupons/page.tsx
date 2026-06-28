"use client";

import { useState } from "react";
import { coupons } from "@/data/store";
import { formatPrice, generateId } from "@/lib/utils";

export default function AdminCouponsPage() {
  const [list, setList] = useState(coupons);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", type: "percentage" as "percentage"|"fixed", value: "", minOrder: "", usageLimit: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoupon = { id: generateId(), code: form.code.toUpperCase(), type: form.type, value: Number(form.value), minOrder: Number(form.minOrder), usageLimit: Number(form.usageLimit), usedCount: 0, expiresAt: "2027-12-31", active: true };
    setList([...list, newCoupon]);
    setForm({ code: "", type: "percentage", value: "", minOrder: "", usageLimit: "" });
    setShowForm(false);
  };

  const toggleActive = (id: string) => {
    setList(list.map((c) => c.id === id ? { ...c, active: !c.active } : c));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-medium text-navy">Coupons</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-navy text-beige px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-navy/90 transition-colors">{showForm ? "Cancel" : "+ Add Coupon"}</button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white border border-navy/10 p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <input type="text" placeholder="Code" required value={form.code} onChange={(e) => setForm({...form, code: e.target.value})} className="border border-navy/20 px-3 py-2 text-sm bg-transparent text-navy focus:outline-none focus:border-navy" />
          <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value as "percentage"|"fixed"})} className="border border-navy/20 px-3 py-2 text-sm bg-transparent text-navy focus:outline-none focus:border-navy">
            <option value="percentage">Percentage</option><option value="fixed">Fixed Amount</option>
          </select>
          <input type="number" placeholder="Value" required value={form.value} onChange={(e) => setForm({...form, value: e.target.value})} className="border border-navy/20 px-3 py-2 text-sm bg-transparent text-navy focus:outline-none focus:border-navy" />
          <input type="number" placeholder="Min Order" required value={form.minOrder} onChange={(e) => setForm({...form, minOrder: e.target.value})} className="border border-navy/20 px-3 py-2 text-sm bg-transparent text-navy focus:outline-none focus:border-navy" />
          <input type="number" placeholder="Usage Limit" required value={form.usageLimit} onChange={(e) => setForm({...form, usageLimit: e.target.value})} className="border border-navy/20 px-3 py-2 text-sm bg-transparent text-navy focus:outline-none focus:border-navy" />
          <button type="submit" className="sm:col-span-5 bg-navy text-beige py-2.5 text-sm font-medium hover:bg-navy/90 transition-colors">Create Coupon</button>
        </form>
      )}

      <div className="bg-white border border-navy/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy/10 bg-navy/[0.02]">
              <th className="text-left py-4 px-4 font-medium text-navy">Code</th>
              <th className="text-left py-4 px-4 font-medium text-navy">Value</th>
              <th className="text-left py-4 px-4 font-medium text-navy hidden md:table-cell">Used</th>
              <th className="text-left py-4 px-4 font-medium text-navy hidden sm:table-cell">Status</th>
              <th className="text-right py-4 px-4 font-medium text-navy">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id} className="border-b border-navy/5">
                <td className="py-4 px-4 font-medium text-navy">{c.code}</td>
                <td className="py-4 px-4 text-navy/70">{c.type === "percentage" ? `${c.value}%` : formatPrice(c.value)}</td>
                <td className="py-4 px-4 text-navy/60 text-xs hidden md:table-cell">{c.usedCount}/{c.usageLimit}</td>
                <td className="py-4 px-4 hidden sm:table-cell"><span className={`text-xs ${c.active ? "text-green-600" : "text-red-500"}`}>{c.active ? "Active" : "Inactive"}</span></td>
                <td className="py-4 px-4 text-right">
                  <button onClick={() => toggleActive(c.id)} className="text-xs text-navy/50 underline hover:text-navy">{c.active ? "Deactivate" : "Activate"}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
