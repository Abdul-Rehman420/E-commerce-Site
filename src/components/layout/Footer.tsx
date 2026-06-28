import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-beige pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <span className="font-serif text-2xl tracking-tighter font-semibold uppercase mb-4 block">RT</span>
          <p className="text-xs text-navy/60 leading-relaxed font-light mb-6 max-w-xs">
            Wear your faith. Live your truth. Premium apparel for the modern believer.
          </p>
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-navy/50 hover:text-navy transition-colors" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-navy/50 hover:text-navy transition-colors" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-navy/50 hover:text-navy transition-colors" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="text-navy/50 hover:text-navy transition-colors" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm text-navy mb-4 tracking-wide">Shop</h4>
          <ul className="space-y-3">
            <li><Link href="/shop" className="text-xs text-navy/60 hover:text-navy transition-colors">New Arrivals</Link></li>
            <li><Link href="/shop" className="text-xs text-navy/60 hover:text-navy transition-colors">Best Sellers</Link></li>
            <li><Link href="/shop?category=hoodies" className="text-xs text-navy/60 hover:text-navy transition-colors">Men&apos;s Collection</Link></li>
            <li><Link href="/shop?category=tees" className="text-xs text-navy/60 hover:text-navy transition-colors">Women&apos;s Collection</Link></li>
            <li><Link href="/shop?category=accessories" className="text-xs text-navy/60 hover:text-navy transition-colors">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-sm text-navy mb-4 tracking-wide">Support</h4>
          <ul className="space-y-3">
            <li><Link href="/size-guide" className="text-xs text-navy/60 hover:text-navy transition-colors">Size Guide</Link></li>
            <li><a href="#" className="text-xs text-navy/60 hover:text-navy transition-colors">Returns &amp; Exchanges</a></li>
            <li><a href="#" className="text-xs text-navy/60 hover:text-navy transition-colors">Track My Order</a></li>
            <li><a href="#" className="text-xs text-navy/60 hover:text-navy transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-sm text-navy mb-4 tracking-wide">About</h4>
          <ul className="space-y-3">
            <li><Link href="/about" className="text-xs text-navy/60 hover:text-navy transition-colors">Our Mission</Link></li>
            <li><a href="#" className="text-xs text-navy/60 hover:text-navy transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-xs text-navy/60 hover:text-navy transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-navy/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-[0.65rem] text-navy/50 uppercase tracking-widest">
          &copy; 2024 Righteous Threads. All rights reserved.
        </p>
        <p className="text-[0.65rem] text-navy/50 font-serif italic">
          Created with faith.
        </p>
      </div>
    </footer>
  );
}
