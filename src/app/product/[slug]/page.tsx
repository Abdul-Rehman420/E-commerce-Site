import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetail } from "@/components/features/ProductDetail";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

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
