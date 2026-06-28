import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

export function StatsCard({ title, value, icon, trend, trendUp }: StatsCardProps) {
  return (
    <div className="bg-white border border-navy/10 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-gold/10 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2">
            <path d={icon} />
          </svg>
        </div>
        {trend && (
          <span className={cn("text-xs font-medium", trendUp ? "text-green-600" : "text-red-500")}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-medium text-navy">{value}</p>
      <p className="text-xs text-navy/50 mt-1">{title}</p>
    </div>
  );
}
