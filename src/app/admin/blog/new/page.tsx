"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", author: "Righteous Threads" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const posts = JSON.parse(localStorage.getItem("rt_blog_posts") || "[]");
    posts.push({ id: "b" + Date.now(), ...form, image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop", tags: [], createdAt: new Date().toISOString(), published: false });
    localStorage.setItem("rt_blog_posts", JSON.stringify(posts));
    router.push("/admin/blog");
  };

  return (
    <div className="max-w-2xl">
      <Link href="/admin/blog" className="text-xs text-navy/50 hover:text-navy mb-6 block">&larr; Back to Blog</Link>
      <h1 className="font-serif text-3xl font-medium text-navy mb-8">New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {(["title","slug","excerpt","content","author"] as const).map((f) => (
          <div key={f}>
            <label className="block text-sm font-medium text-navy mb-1.5 capitalize">{f}</label>
            {f === "excerpt" || f === "content" ? (
              <textarea rows={f === "content" ? 8 : 3} value={form[f]} onChange={(e) => setForm({...form, [f]: e.target.value})} className="w-full border border-navy/20 px-4 py-3 text-sm bg-transparent text-navy focus:outline-none focus:border-navy" required />
            ) : (
              <input type="text" required value={form[f]} onChange={(e) => setForm({...form, [f]: e.target.value})} className="w-full border border-navy/20 px-4 py-3 text-sm bg-transparent text-navy focus:outline-none focus:border-navy" />
            )}
          </div>
        ))}
        <button type="submit" className="bg-navy text-beige px-8 py-3 text-sm font-medium tracking-wide hover:bg-navy/90 transition-colors">Save Draft</button>
      </form>
    </div>
  );
}
