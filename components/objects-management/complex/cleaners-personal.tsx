import { Users } from "lucide-react";

export default function CleanersPersonal({
  title,
  label,
  value,
}: {
  title: string;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-medium mb-1">
          <Users size={18} />
          <span>{title}</span>
        </div>
        <div className="text-xs text-blue-600/70 dark:text-blue-400/70">
          {label}
        </div>
      </div>
      <span className="text-3xl font-bold text-blue-700 dark:text-blue-300">
        {value}
      </span>
    </div>
  );
}
