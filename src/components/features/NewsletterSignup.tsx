export function NewsletterSignup() {
  return (
    <section className="bg-[#DDE2DB] py-24 px-6 border-y border-navy/10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl tracking-tight font-medium text-navy mb-4">
          Get The Word &amp; The Wardrobe.
        </h2>
        <p className="text-navy/70 text-sm mb-10 font-light">
          Sign up for our weekly devotional, early access to new drops, and exclusive community events.
        </p>

        <form className="flex flex-col sm:flex-row max-w-md mx-auto relative">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full bg-transparent border-b border-navy/30 pb-3 text-navy text-sm placeholder:text-navy/40 focus:outline-none focus:border-navy transition-colors mb-4 sm:mb-0"
          />
          <button
            type="submit"
            className="sm:absolute right-0 bottom-3 text-sm font-medium text-navy hover:text-gold transition-colors flex items-center group"
          >
            Subscribe
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1 group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
