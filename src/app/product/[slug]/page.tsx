"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { fetchProductBySlug, fetchProducts } from "@/lib/data";
import { ProductDetail } from "@/components/features/ProductDetail";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Product } from "@/types";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    fetchProductBySlug(params.slug).then((p) => {
      if (!p) return notFound();
      setProduct(p);
      fetchProducts().then((all) =>
        setRelated(all.filter((r) => r.category === p.category && r.id !== p.id).slice(0, 4))
      );
    });
  }, [params.slug]);

  if (!product) return null;

  return (
    <>
      <ProductDetail product={product} />
      {related.length > 0 && (
        <Container className="pb-24">
          <div className="border-t border-navy/10 pt-16">
            <h2 className="font-serif text-2xl tracking-tight font-medium text-navy mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
