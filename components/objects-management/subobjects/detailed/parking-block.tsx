import { SubObjectFull } from "@/components/objects-management/subobjects/action";
import InfoItem from "@/components/objects-management/subobjects/detailed/info-item";

export default function ParkingBlock({
  title,
  object,
}: {
  title: string;
  object: SubObjectFull;
}) {
  return (
    <div className="p-4 flex flex-col gap-2 border-b border-gray-200">
      <div className="title text-md font-bold">{title}</div>
      <InfoItem name="Площадь паркинга" value="0 м²" />
      <InfoItem name="Сотрудников" value="0" />
    </div>
  );
}
