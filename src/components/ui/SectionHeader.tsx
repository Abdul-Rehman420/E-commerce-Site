import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
}

export function SectionHeader({ title, subtitle, viewAllHref }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-12">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl tracking-tight font-medium text-navy">
          {title}
        </h2>
        {subtitle && <p className="text-navy/60 mt-2 text-sm">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="hidden md:flex items-center text-sm font-medium text-navy hover:text-gold transition-colors duration-200 group"
        >
          View All
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2 group-hover:translate-x-1 transition-transform">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}
