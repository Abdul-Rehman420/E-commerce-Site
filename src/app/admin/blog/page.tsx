"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchBlogPosts, toggleBlogPost } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types";

export default function AdminBlogPage() {
  const [list, setList] = useState<BlogPost[]>([]);

  useEffect(() => { fetchBlogPosts().then(setList); }, []);

  const handleToggle = async (id: string, published: boolean) => {
    await toggleBlogPost(id, !published);
    setList(list.map((p) => p.id === id ? { ...p, published: !p.published } : p));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-medium text-navy">Blog Posts</h1>
        <Link href="/admin/blog/new" className="bg-navy text-beige px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-navy/90 transition-colors">+ New Post</Link>
      </div>
      <div className="bg-white border border-navy/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy/10 bg-navy/[0.02]">
              <th className="text-left py-4 px-4 font-medium text-navy">Title</th>
              <th className="text-left py-4 px-4 font-medium text-navy hidden md:table-cell">Date</th>
              <th className="text-left py-4 px-4 font-medium text-navy hidden sm:table-cell">Status</th>
              <th className="text-right py-4 px-4 font-medium text-navy">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((post) => (
              <tr key={post.id} className="border-b border-navy/5">
                <td className="py-4 px-4 font-medium text-navy text-sm">{post.title}</td>
                <td className="py-4 px-4 text-navy/60 text-xs hidden md:table-cell">{formatDate(post.createdAt ?? "")}</td>
                <td className="py-4 px-4 hidden sm:table-cell"><span className={`text-xs ${post.published ? "text-green-600" : "text-navy/40"}`}>{post.published ? "Published" : "Draft"}</span></td>
                <td className="py-4 px-4 text-right space-x-3">
                  <button onClick={() => handleToggle(post.id, post.published)} className="text-xs text-navy/50 underline hover:text-navy">{post.published ? "Unpublish" : "Publish"}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
