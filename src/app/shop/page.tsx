"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Container } from "@/components/ui/Container";

function ShopContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.verseRef.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-12 pb-24">
      <Container>
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight font-medium text-navy mb-4">
            All Declarations
          </h1>
          <p className="text-navy/60 text-sm font-light max-w-lg">
            Every piece is rooted in scripture. Find the design that speaks to your walk.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mb-12 pb-6 border-b border-navy/10">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors ${
                  activeCategory === cat
                    ? "bg-navy text-beige"
                    : "bg-transparent text-navy/60 border border-navy/20 hover:border-navy hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 bg-transparent border-b border-navy/30 pb-2 text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy transition-colors"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-navy/50 text-sm py-12 text-center">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-12 pb-24"><Container><p className="text-sm text-navy/50">Loading...</p></Container></div>}>
      <ShopContent />
    </Suspense>
  );
}
