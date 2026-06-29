"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchBlogPosts().then((posts) => {
      const found = posts.find((p) => p.slug === params.slug);
      if (found) setPost(found);
      else notFound();
    });
  }, [params.slug]);

  if (!post) return null;

  return (
    <article className="pt-12 pb-24 px-6 max-w-3xl mx-auto">
      <Link href="/blog" className="text-xs text-navy/50 hover:text-navy mb-8 block">&larr; Back to Blog</Link>
      <div className="relative aspect-[2/1] overflow-hidden mb-10 bg-navy/5">
        <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
      </div>
      <p className="text-[0.65rem] text-navy/50 uppercase tracking-widest mb-4">{formatDate(post.createdAt ?? "")}</p>
      <h1 className="font-serif text-3xl md:text-4xl tracking-tight font-medium text-navy mb-6">{post.title}</h1>
      <div className="prose prose-sm max-w-none text-navy/70 leading-relaxed">
        {post.content.split('\n').map((p, i) => <p key={i} className="mb-4">{p}</p>)}
      </div>
      <div className="flex flex-wrap gap-2 mt-10">
        {post.tags.map((tag: string) => (
          <span key={tag} className="text-[0.65rem] uppercase tracking-widest text-navy/50 border border-navy/20 px-3 py-1">{tag}</span>
        ))}
      </div>
    </article>
  );
}
