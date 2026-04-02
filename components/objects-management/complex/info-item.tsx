import { LucideIcon } from "lucide-react";

export default function InfoItem({
  title,
  value,
  icon: Icon,
  unit,
  subtitle,
}: {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  unit?: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
      <div className="title">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-2 text-sm font-medium">
          {Icon && <Icon size={16} />}
          {title}
        </div>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {unit}
          </span>
        )}
      </div>

      {subtitle && <div className="text-xs text-zinc-400 mt-1">{subtitle}</div>}
    </div>
  );
}
