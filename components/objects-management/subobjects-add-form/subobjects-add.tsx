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
    "relative rounded bg-muted px-[0.3rem] py-[0.2rem] scroll-m-20 text-2xl font-semibold tracking-tight mt-2 mb-2 text-center";

  return (
    <>
      <h2 className={titleStyle}>{`Наименование ЖК: ${complex.name}`}</h2>
      {objects.isLoading && (
        <h2 className={titleStyle}>Поиск сущестсвующих объектов...</h2>
      )}
      {objects.data?.length ? (
        <CollapsibleSubobjectList objects={objects.data} />
      ) : (
        <h2 className={titleStyle}>Нет существующих объектов</h2>
      )}
      <SubobjectsAddForm complexId={complexId} />
    </>
  );
}
