import { SubObjectFull } from "@/components/objects-management/subobjects/action";
import InfoItem from "@/components/objects-management/subobjects/detailed/info-item";

export default function TerritoryBlock({
  title,
  object,
}: {
  title: string;
  object: SubObjectFull;
}) {
  return (
    <div className="p-4 flex flex-col gap-2 border-b border-gray-200">
      <div className="title text-md font-bold">{title}</div>
      <InfoItem name="Общая площадь" value="4 619 м²" />
      <InfoItem name="Ручная уборка" value="1 683 м²" />
      <InfoItem name="Озеленение" value="2 185 м²" />
      <InfoItem name="Мех. уборка" value="750 м²" />
    </div>
  );
}
