import { GeocoderResponseDto } from "@/components/map/components/controls/geocoder/types";
import useCenterViewByCoords from "@/components/map/hooks/use-center-view-by-coords";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function GeocoderList({
  addresses,
}: {
  addresses: GeocoderResponseDto;
}) {
  const centerViewByCoords = useCenterViewByCoords();

  return (
    <div className="flex w-[250px] max-w-md flex-col">
      <ScrollArea className="flex max-h-40 flex-col">
        {addresses.results.map((item) => (
          <Item
            variant="outline"
            className="bg-white cursor-pointer"
            key={`${item.lat}-${item.lon}`}
            onClick={() => centerViewByCoords(item.lon, item.lat)}
          >
            <ItemContent>
              <ItemTitle>{item.address}</ItemTitle>
            </ItemContent>
          </Item>
        ))}

        <ScrollBar />
      </ScrollArea>
    </div>
  );
}
