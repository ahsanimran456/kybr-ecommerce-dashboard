import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export default function StatsCard({ title, value, change, icon: Icon }: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl border border-neutral-200/80 p-6 hover:shadow-md hover:border-neutral-300 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="text-2xl font-bold text-neutral-900 tracking-tight">{value}</p>
        </div>
        <div className="p-3 rounded-xl bg-neutral-100 group-hover:bg-neutral-900 transition-colors duration-300">
          <Icon className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors duration-300" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-4">
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-semibold",
            isPositive ? "text-neutral-900" : "text-neutral-500"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {isPositive ? "+" : ""}{Math.abs(change)}%
        </div>
        <span className="text-sm text-neutral-400">vs last month</span>
      </div>
    </div>
  );
}
