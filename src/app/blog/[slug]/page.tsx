import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/store";
import { formatDate } from "@/lib/utils";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post || !post.published) notFound();

  return (
    <article className="pt-12 pb-24 px-6 max-w-3xl mx-auto">
      <Link href="/blog" className="text-xs text-navy/50 hover:text-navy mb-8 block">&larr; Back to Blog</Link>
      <div className="relative aspect-[16/9] overflow-hidden mb-8 bg-navy/5">
        <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
      </div>
      <p className="text-[0.65rem] text-navy/50 uppercase tracking-widest mb-3">{formatDate(post.createdAt)} &middot; {post.author}</p>
      <h1 className="font-serif text-3xl md:text-4xl font-medium text-navy mb-4 leading-tight">{post.title}</h1>
      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag) => (
          <span key={tag} className="text-[0.65rem] uppercase tracking-wide bg-navy/5 text-navy/60 px-2 py-1">{tag}</span>
        ))}
      </div>
      <div className="prose prose-sm max-w-none text-navy/70 font-light leading-relaxed space-y-4">
        <p>{post.content}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </article>
  );
}
