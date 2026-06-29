"use client";

import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/ui/ProductCard";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types";

export function Bestsellers() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => { fetchProducts().then((all) => setProducts(all.slice(0, 4))); }, []);

  return (
    <Container className="pt-24 pb-24">
      <SectionHeader
        title="Featured Declarations"
        subtitle="Designed for the daily walk."
        viewAllHref="/shop"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-12 md:hidden flex justify-center">
        <Button href="/shop" variant="outline" className="px-6 py-3">
          View All Products
        </Button>
      </div>
    </Container>
  );
}
