import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/products";
import { Container } from "@/components/ui/Container";

export default function CollectionsPage() {
  return (
    <div className="pt-12 pb-24">
      <Container>
        <div className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight font-medium text-navy mb-4">
            Collections
          </h1>
          <p className="text-navy/60 text-sm font-light max-w-lg">
            Explore our curated collections, each rooted in a theme of faith and purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/shop?collection=${collection.slug}`}
              className="group relative aspect-[4/5] overflow-hidden block"
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-serif text-2xl text-white font-medium mb-2">{collection.name}</h3>
                <p className="text-white/70 text-sm font-light">{collection.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
