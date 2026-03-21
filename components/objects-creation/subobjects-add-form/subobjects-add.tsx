// import { fetchResidentialComplexAction } from "@/components/objects-creation/residential-complex-add-form/action";

import { Step, useComplexStore } from "@/components/map/state/complex-store";
import { fetchResidentialComplexAction } from "@/components/objects-creation/residential-complex-add-form/action";
import { fetchSubobjectsAction } from "@/components/objects-creation/subobjects-add-form/action";
import CollapsibleSubobjectList from "@/components/objects-creation/subobjects-add-form/collapsible-subobject-list";
import SubobjectsAddForm from "@/components/objects-creation/subobjects-add-form/subobject-form";
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
    staleTime: 1000 * 60 * 1,
  });

  const objects = useQuery({
    queryKey: ["objects"],
    queryFn: () => fetchSubobjectsAction(complexId),
    staleTime: 1000 * 60 * 1,
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

  return (
    <>
      <h2 className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] scroll-m-20 text-2xl font-semibold tracking-tight mt-2 mb-2 text-center">
        {`Наименование комплекса: ${complex.name}`}
      </h2>
      {objects.isLoading && <div>Поиск сущетсвующих объектов...</div>}
      {objects.data && <CollapsibleSubobjectList objects={objects.data} />}
      <SubobjectsAddForm complexId={complexId} />
    </>
  );
}
