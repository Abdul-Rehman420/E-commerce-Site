import Image from "next/image";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop",
    alt: "Community gathering",
  },
  {
    src: "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?q=80&w=1974&auto=format&fit=crop",
    alt: "Fashion portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop",
    alt: "Group study",
  },
  {
    src: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    alt: "Fashion editorial",
  },
];

export function InstagramGallery() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="text-center mb-10 px-6">
        <h2 className="font-serif text-3xl tracking-tight font-medium text-navy">#WearYourFaith</h2>
        <p className="text-navy/60 mt-2 text-sm">Not just a brand, a brotherhood.</p>
      </div>

      <div className="flex gap-4 px-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className="snap-center shrink-0 w-[70vw] sm:w-[40vw] md:w-[25vw] aspect-square relative group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 768px) 40vw, 25vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
