import { useComplexStore } from "@/components/map/state/complex-store";
import { fetchSubobjectsAction } from "@/components/objects-management/subobjects/action";
import CollapsibleItem from "@/components/objects-management/subobjects/collapsible-item";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export default function CollapsibleSubobjectList() {
  const complexId = useComplexStore((state) => state.complexId) as string;

  const {
    data: objects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["objects"],
    queryFn: () => fetchSubobjectsAction(complexId),
    enabled: !!complexId,
    staleTime: 1000 * 60 * 5,
  });

  const statusStyle = "text-xl text-muted-foreground mt-2 mb-2";

  if (isLoading)
    return <span className={statusStyle}>Поиск существующих объектов...</span>;

  if (objects?.length === 0)
    return <span className={statusStyle}>Не найдено объектов в ЖК</span>;

  if (isError)
    return (
      <span className={statusStyle}>
        Ошибка загрузки объектов. Попробуйте повторить позже.
      </span>
    );

  return (
    <Card className="w-full max-w-sm">
      {/* <CardContent className="space-y-2"> */}
      <CardContent className="space-y-2">
        <CardTitle>Найденные объекты</CardTitle>
        {objects?.map((object) => (
          <CollapsibleItem object={object} key={object.id} />
        ))}
      </CardContent>
    </Card>
  );
}
