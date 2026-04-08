import { SubObjectFull } from "@/components/objects-management/subobjects/action";
import InfoItem from "@/components/objects-management/subobjects/detailed/info-item";

export default function MkdBlock({
  title,
  object,
}: {
  title: string;
  object: SubObjectFull;
}) {
  return (
    <div className="p-4 flex flex-col gap-2 border-b border-gray-200">
      <div className="title text-md font-bold">{title}</div>
      <InfoItem name="МОП 1 этажа" value="130 м²" />
      <InfoItem name="МОП 2+ этажей" value="3 143 м²" />
      <InfoItem name="Кладовые / тех." value="251 м²" />
      <InfoItem name="Сотрудников" value="1" />
    </div>
  );
}
