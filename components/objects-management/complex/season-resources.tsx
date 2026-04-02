import { ClipboardList, Snowflake, Sun } from "lucide-react";

export default function SeasonResources({
  title,
  summerPersonal,
  summerTechnical,
  winterPersonal,
  winterTechnical,
}: {
  title: string;
  summerPersonal: string | number;
  summerTechnical: string | number;
  winterPersonal: string | number;
  winterTechnical: string | number;
}) {
  return (
    <div className="md:col-span-1 lg:col-span-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        <ClipboardList size={18} /> {title}
      </h4>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-sm font-medium mb-2">
            <Sun size={16} /> Летний период
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="text-xs text-zinc-500">Сотрудников</div>
              <div className="text-lg font-bold">{summerPersonal}</div>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="text-xs text-zinc-500">Техники</div>
              <div className="text-lg font-bold">{summerTechnical}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-2">
            <Snowflake size={16} /> Зимний период
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="text-xs text-zinc-500">Сотрудников</div>
              <div className="text-lg font-bold">{winterPersonal}</div>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="text-xs text-zinc-500">Техники</div>
              <div className="text-lg font-bold">{winterTechnical}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
