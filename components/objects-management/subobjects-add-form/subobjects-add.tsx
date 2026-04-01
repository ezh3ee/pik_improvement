// import { fetchResidentialComplexAction } from "@/components/objects-creation/residential-complex-add-form/action";

import { Step, useComplexStore } from "@/components/map/state/complex-store";
import { fetchResidentialComplexAction } from "@/components/objects-management/residential-complex-add-form/action";
import { fetchSubobjectsAction } from "@/components/objects-management/subobjects-add-form/action";
import CollapsibleSubobjectList from "@/components/objects-management/subobjects-add-form/collapsible-subobject-list";
import SubobjectsAddForm from "@/components/objects-management/subobjects-add-form/subobject-form";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function SubobjectsAdd() {
  const complexId = useComplexStore((state) => state.complexId) as string;
  const setStep = useComplexStore((state) => state.setStep);

  const {
    data: complex,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["complex", complexId],
    queryFn: () => fetchResidentialComplexAction(complexId),
    enabled: !!complexId,
    // staleTime: 1000 * 60 * 1,
  });

  const objects = useQuery({
    queryKey: ["objects"],
    queryFn: () => fetchSubobjectsAction(complexId),
  });

  if (isLoading) return "Загрузка...";

  if (isError || !complex) {
    setStep(Step.ComplexAdd);
    return (
      <>
        `ЖК не найден. {isError}` <Button>Назад</Button>
      </>
    );
  }

  const titleStyle =
    "relative rounded bg-mutedpy-[0.2rem] scroll-m-20 text-xl font-semibold tracking-tight mt-2 mb-2";

  const statusStyle = "text-xl text-muted-foreground mt-2 mb-2";

  return (
    <>
      <h4 className={titleStyle}>{`Наименование ЖК: ${complex.name}`}</h4>

      {objects.isLoading ? (
        <h5 className={statusStyle}>Поиск существующих объектов...</h5>
      ) : objects.data?.length ? (
        <CollapsibleSubobjectList objects={objects.data} />
      ) : (
        <h5 className={statusStyle}>Не найдено объектов в ЖК</h5>
      )}

      <SubobjectsAddForm complexId={complexId} />
    </>
  );
}
