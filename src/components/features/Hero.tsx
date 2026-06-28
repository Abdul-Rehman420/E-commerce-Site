import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <header className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2062&auto=format&fit=crop"
          alt="Faith based streetwear lifestyle"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy/40 mix-blend-multiply" />
        <div className="bg-gradient-to-t from-navy/80 via-transparent to-transparent absolute inset-0" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center mt-16">
        <h1 className="md:text-6xl lg:text-7xl leading-[1.1] text-5xl font-medium text-white tracking-tighter font-serif mb-6">
          Walk In Faith.<br />Stand Out In Style.
        </h1>
        <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Premium faith-based apparel designed to inspire conversations and declare your beliefs.
        </p>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button href="/shop" variant="primary" className="w-full sm:w-auto px-8 py-3.5">
            Shop New Arrivals
          </Button>
          <Button href="/collections" variant="secondary" className="w-full sm:w-auto px-8 py-3.5">
            Explore Collections
          </Button>
        </div>
      </div>
    </header>
  );
}
