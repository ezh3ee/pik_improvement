import { SubObjectFull } from "@/components/objects-management/subobjects/action";
import InfoItem from "@/components/objects-management/subobjects/detailed/info-item";

export default function SummerBlock({
  title,
  object,
}: {
  title: string;
  object: SubObjectFull;
}) {
  return (
    <div className="p-4 flex flex-col gap-2 border-b border-gray-200">
      <div className="title text-md font-bold">{title}</div>
      <InfoItem name="Сотр. территории" value="1" />
      <InfoItem name="Кол-во техники" value="0,25" />
    </div>
  );
}
