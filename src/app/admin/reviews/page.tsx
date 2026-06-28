"use client";

import { useState } from "react";
import { reviews } from "@/data/store";
import { formatDate } from "@/lib/utils";

export default function AdminReviewsPage() {
  const [list, setList] = useState(reviews);

  const toggleApprove = (id: string) => {
    setList(list.map((r) => r.id === id ? { ...r, approved: !r.approved } : r));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-medium text-navy">Product Reviews</h1>
      </div>
      <div className="bg-white border border-navy/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy/10 bg-navy/[0.02]">
              <th className="text-left py-4 px-4 font-medium text-navy">Product</th>
              <th className="text-left py-4 px-4 font-medium text-navy">Customer</th>
              <th className="text-left py-4 px-4 font-medium text-navy">Rating</th>
              <th className="text-left py-4 px-4 font-medium text-navy hidden md:table-cell">Comment</th>
              <th className="text-left py-4 px-4 font-medium text-navy hidden sm:table-cell">Date</th>
              <th className="text-left py-4 px-4 font-medium text-navy">Status</th>
              <th className="text-right py-4 px-4 font-medium text-navy">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((review) => (
              <tr key={review.id} className="border-b border-navy/5">
                <td className="py-4 px-4 text-sm text-navy font-medium">{review.productId}</td>
                <td className="py-4 px-4 text-sm text-navy/70">{review.userName}</td>
                <td className="py-4 px-4 text-sm text-gold">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</td>
                <td className="py-4 px-4 text-xs text-navy/60 hidden md:table-cell max-w-[200px] truncate">{review.comment}</td>
                <td className="py-4 px-4 text-xs text-navy/50 hidden sm:table-cell">{formatDate(review.createdAt)}</td>
                <td className="py-4 px-4"><span className={`text-xs ${review.approved ? "text-green-600" : "text-navy/40"}`}>{review.approved ? "Approved" : "Pending"}</span></td>
                <td className="py-4 px-4 text-right">
                  <button onClick={() => toggleApprove(review.id)} className="text-xs text-navy/50 underline hover:text-navy">{review.approved ? "Unapprove" : "Approve"}</button>
                </td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan={7} className="text-sm text-navy/50 p-6 text-center">No reviews yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
