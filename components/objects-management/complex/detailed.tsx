import { fetchResidentialComplexAction } from "@/components/objects-management/complex/action";
import CleanersPersonal from "@/components/objects-management/complex/cleaners-personal";
import CollapsibleSection from "@/components/objects-management/complex/collapsible-section";
import InfoItem from "@/components/objects-management/complex/info-item";
import SeasonPersonal from "@/components/objects-management/complex/season-personal";
import SeasonResources from "@/components/objects-management/complex/season-resources";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArchiveRestore,
  Building2,
  Car,
  ClipboardList,
  Ruler,
  Trees,
  Wrench,
} from "lucide-react";

export default function ComplexDetailed({ complexId }: { complexId: string }) {
  const queryClient = useQueryClient();

  const complex = useQuery({
    queryKey: ["complexes", complexId],
    queryFn: () => {
      return fetchResidentialComplexAction(complexId);
    },
    enabled: !!complexId,
    // staleTime: 1000 * 60 * 1,
  });

  return (
    <div className="border rounded-md p-4 mt-4 mb-4">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full relative">
        <div>
          <h1 className="text-xl font-semibold dark:text-white mb-2">
            {complex?.data?.name}
          </h1>

          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 w-fit">
            <ClipboardList size={16} />
            <span className="text-sm font-medium">Подрядчик ИП Иванов</span>
          </div>
        </div>
      </header>

      {/* МКД */}
      <section className="flex flex-col gap-4">
        <CollapsibleSection title="Многоквартирные дома (МКД)" icon={Building2}>
          <InfoItem title="Секции" icon={Building2} value={8} />
          <InfoItem title="Этажи" icon={Ruler} value={25} unit="эт." />
          <InfoItem
            title="МОП 1 этажа"
            value={250}
            unit="м²"
            subtitle="Площадь уборки"
            icon={Wrench}
          />
          <InfoItem
            title="МОП Выше 2 эт."
            value={523}
            unit="м²"
            subtitle="Площадь уборки"
            icon={Wrench}
          />
          <InfoItem
            title="Тех. помещения"
            value={65}
            unit="м²"
            subtitle="Кладовые/ОДС"
            icon={Wrench}
          />
          <InfoItem
            title="Количество лифтов"
            value={2}
            unit="шт"
            icon={ArchiveRestore}
          />
          <CleanersPersonal
            title="Штат уборщиков МКД"
            label="Постоянный состав"
            value={8}
          />
        </CollapsibleSection>

        {/* Паркинг / Гараж */}
        <CollapsibleSection title="Паркинг / Гараж" icon={Car}>
          <InfoItem
            title="Уборочная площадь"
            value={800}
            unit="м²"
            icon={Ruler}
          />
          <InfoItem title="Машиноместа" value={25} unit="шт." icon={Car} />
          <SeasonPersonal
            title="Персонал по сезонам"
            summerValue={8}
            winterValue={5}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Прилегающая территория" icon={Trees}>
          <InfoItem title="Общая площадь" value={1023} unit="м²" icon={Ruler} />
          <InfoItem title="Ручная уборка" value={25} unit="м²" icon={Wrench} />
          <InfoItem
            title="Механическая уборка"
            value={43}
            unit="м²"
            icon={Car}
          />
          <InfoItem title="Озеленение" value={33} unit="м²" icon={Trees} />
          <SeasonResources
            title="Ресурсы по сезонам"
            summerPersonal={32}
            summerTechnical={323}
            winterPersonal={6}
            winterTechnical={234}
          />
        </CollapsibleSection>
      </section>
    </div>
  );
}
