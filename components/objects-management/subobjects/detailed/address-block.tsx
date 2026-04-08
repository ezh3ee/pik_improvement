import { SubObjectFull } from "@/components/objects-management/subobjects/action";
import InfoItem from "@/components/objects-management/subobjects/detailed/info-item";
import { mapSubobjectType } from "@/components/objects-management/subobjects/subobject-type-map";

export default function AddressBlock({
  title,
  object,
}: {
  title: string;
  object: SubObjectFull;
}) {
  return (
    <div className="p-4 flex flex-col gap-2 border-b border-gray-200">
      <div className="title text-md font-bold">{title}</div>
      <InfoItem name="ЖК" value={object.name} />
      <InfoItem name="Тип" value={mapSubobjectType(object.type)} />
      <InfoItem
        name="Стр. адрес"
        value="Москва, Б. Академическая ул., 85, корп.3"
      />
      <InfoItem
        name="Почт. адрес"
        value="г. Москва, ул. Б. Академическая, д.85 к 3"
      />
    </div>
  );
}
