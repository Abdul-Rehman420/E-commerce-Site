"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/admin/products", label: "Products", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { href: "/admin/orders", label: "Orders", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { href: "/admin/coupons", label: "Coupons", icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" },
  { href: "/admin/blog", label: "Blog", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
  { href: "/admin/reviews", label: "Reviews", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
];

const bottomLinks = [
  { href: "/", label: "Back to Store", icon: "M10 19l-7-7m0 0l7-7m-7 7h18" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy text-beige min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="font-serif text-xl tracking-tighter font-semibold uppercase">RT Admin</Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 text-sm rounded transition-colors",
                active ? "bg-gold/20 text-gold" : "text-beige/60 hover:text-beige hover:bg-white/5"
              )}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={link.icon} />
              </svg>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        {bottomLinks.map((link) => (
          <Link key={link.href} href={link.href} className="flex items-center gap-3 px-4 py-2.5 text-sm text-beige/50 hover:text-beige transition-colors rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={link.icon} />
            </svg>
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
