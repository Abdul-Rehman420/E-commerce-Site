import Image from "next/image";
import { Container } from "@/components/ui/Container";

export default function AboutPage() {
  return (
    <>
      <section className="pt-12 pb-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-gold uppercase text-xs tracking-[0.2em] font-semibold mb-4 block">
              Our Mission
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight font-medium text-navy mb-6 leading-[1.15]">
              Wear your faith. <br />
              <span className="text-gold">Live your truth.</span>
            </h1>
            <p className="text-navy/60 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
              Righteous Threads exists to create premium apparel that sparks conversations about faith.
              Every design is rooted in scripture, crafted with integrity, and made to be worn as a daily
              declaration of belief.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2689&auto=format&fit=crop"
                alt="Our community"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-medium text-navy mb-6">Our Story</h2>
              <div className="space-y-4 text-sm text-navy/70 leading-relaxed font-light">
                <p>
                  What started as a small group of friends printing scripture on tees in a garage has grown into a
                  movement of believers who express their identity in Christ through fashion.
                </p>
                <p>
                  We believe that what you wear can be a conversation starter. Every piece we create is designed
                  not just for style, but for statement — a way to declare your faith without saying a word.
                </p>
                <p>
                  From our community events to our quarterly giving, everything we do is rooted in our core belief:
                  that faith should be seen, shared, and celebrated.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { title: "Scripture-Inspired", desc: "Every design is anchored in a verse of the Bible." },
              { title: "Ethically Made", desc: "We partner with certified ethical manufacturers." },
              { title: "Giving Back", desc: "10% of profits support global missions and local ministries." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-serif text-xl font-medium text-navy mb-3">{item.title}</h3>
                <p className="text-sm text-navy/60 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
