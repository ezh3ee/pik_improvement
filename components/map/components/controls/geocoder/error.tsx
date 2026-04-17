import { Item, ItemContent, ItemTitle } from "@/components/ui/item";

export default function GeocoderListError({
  isError,
  empty,
}: {
  isError: boolean;
  empty: boolean;
}) {
  let title;

  if (isError) {
    title = "Ошибка соединения с сервисом Яндекс";
  } else if (empty) {
    title = "Ничего не найдено";
  }

  return (
    <div className="flex w-full max-w-md flex-col">
      <Item variant="outline" className="bg-white cursor-pointer">
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}
