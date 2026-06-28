"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.colors[0], product.sizes[0]);
  };

  const badgeStyles = {
    navy: "bg-navy text-beige",
    terracotta: "bg-terracotta text-white",
  };

  return (
    <Link href={`/product/${product.slug}`} className="group cursor-pointer">
      <div className="relative aspect-[3/4] bg-navy/5 overflow-hidden mb-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {product.badge && (
          <div className={`absolute top-3 left-3 text-xs px-2 py-1 font-medium tracking-wide ${badgeStyles[product.badgeColor || "navy"]}`}>
            {product.badge}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-beige/90 backdrop-blur text-navy py-3 text-sm font-medium hover:bg-beige transition-colors shadow-sm"
          >
            Quick Add
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-medium text-navy">{product.name}</h3>
          <p className="text-xs text-navy/50 mt-1">
            {product.colors[0]?.color}{product.material ? ` / ${product.material}` : ""}
          </p>
        </div>
        <span className="text-sm font-medium text-navy">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}
