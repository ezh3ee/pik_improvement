import { useComplexStore } from "@/components/map/state/complex-store";
import { fetchSubobject } from "@/components/objects-management/subobjects/action";
import AddressBlock from "@/components/objects-management/subobjects/detailed/address-block";
import MkdBlock from "@/components/objects-management/subobjects/detailed/mkd-block";
import ParkingBlock from "@/components/objects-management/subobjects/detailed/parking-block";
import SummerBlock from "@/components/objects-management/subobjects/detailed/summer-block";
import TerritoryBlock from "@/components/objects-management/subobjects/detailed/territory-block";
import WinterBlock from "@/components/objects-management/subobjects/detailed/winter-block";
import { useQuery } from "@tanstack/react-query";

export default function SubobjectDetailed() {
  const objectIdToCard = useComplexStore((state) => state.objectIdToCard);

  const {
    data: object,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["objects", objectIdToCard],
    queryFn: () => {
      if (!objectIdToCard) return;
      return fetchSubobject(objectIdToCard);
    },
    enabled: !!objectIdToCard,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <span>Загрузка объекта...</span>;
  if (isError || !object) return <span>Ошибка загрузки объекта</span>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 p-2.5">
      <AddressBlock title="Адрес объекта" object={object} />
      <MkdBlock title="Многоквартирный дом" object={object} />
      <TerritoryBlock title="Прилегающая территория" object={object} />
      <ParkingBlock title="Паркинг / Гараж" object={object} />
      <SummerBlock title="Летний период" object={object} />
      <WinterBlock title="Зимний период" object={object} />
    </div>
  );
}
