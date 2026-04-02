import { LucideIcon, Snowflake, Sun } from "lucide-react";

export default function SeasonPersonal({
  title,
  summerValue,
  winterValue,
  icon: Icon,
}: {
  title: string;
  summerValue: string | number;
  winterValue: string | number;
  icon?: LucideIcon;
}) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 col-span-1 md:col-span-1">
      <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-2">
        {Icon && <Icon size={16} />}
        <span>{title}</span>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
            <Sun size={14} /> Лето
          </div>
          <span className="font-bold">{summerValue} чел.</span>
        </div>
        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400">
            <Snowflake size={14} /> Зима
          </div>
          <span className="font-bold">{winterValue} чел.</span>
        </div>
      </div>
    </div>
  );
}
