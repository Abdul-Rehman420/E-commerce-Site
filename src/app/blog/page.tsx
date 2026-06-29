"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchPublishedPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => { fetchPublishedPosts().then(setPosts); }, []);

  return (
    <div className="pt-12 pb-24 px-6 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight font-medium text-navy mb-4">The Word &amp; The Wardrobe</h1>
        <p className="text-navy/60 text-sm font-light max-w-lg">Devotionals, style tips, and stories from the Righteous community.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-navy/5">
              <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <p className="text-[0.65rem] text-navy/50 uppercase tracking-widest mb-2">{formatDate(post.createdAt ?? "")}</p>
            <h2 className="font-serif text-lg font-medium text-navy mb-2 group-hover:text-gold transition-colors">{post.title}</h2>
            <p className="text-xs text-navy/60 font-light leading-relaxed">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
