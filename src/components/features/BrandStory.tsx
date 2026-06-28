import Image from "next/image";
import Link from "next/link";

export function BrandStory() {
  return (
    <section className="bg-navy py-24 text-beige">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2689&auto=format&fit=crop"
            alt="Community"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center grayscale-[20%] sepia-[10%]"
          />
          <div className="border border-white/10 absolute inset-4" />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-gold uppercase text-xs tracking-[0.2em] font-semibold mb-4">
            More Than Just Fabric
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight font-medium mb-6 leading-[1.2]">
            Every design is rooted<br />in scripture.
          </h2>
          <p className="text-beige/70 text-base lg:text-lg mb-10 leading-relaxed font-light max-w-lg">
            We aren&apos;t just making clothes; we&apos;re making declarations. Join a movement of believers who express their
            identity in Christ through fashion. It&apos;s faith that fits.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <div className="flex items-start">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" className="mt-1 shrink-0">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-beige mb-1">Ethical Quality</h4>
                <p className="text-xs text-beige/50 leading-relaxed">Durable garments crafted with integrity and care.</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" className="mt-1 shrink-0">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-beige mb-1">Community First</h4>
                <p className="text-xs text-beige/50 leading-relaxed">10% of every purchase tithed to global missions.</p>
              </div>
            </div>
          </div>

          <div>
            <Link href="/about" className="inline-flex items-center pb-1 border-b border-gold text-gold text-sm font-medium hover:text-white hover:border-white transition-colors duration-300 group">
              Read Our Story
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2 group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
