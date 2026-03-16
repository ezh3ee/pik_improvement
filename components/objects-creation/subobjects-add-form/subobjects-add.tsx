// import { fetchResidentialComplexAction } from "@/components/objects-creation/residential-complex-add-form/action";

import { Step, useComplexStore } from "@/components/map/state/complex-state";
import { fetchResidentialComplexAction } from "@/components/objects-creation/residential-complex-add-form/action";
import SubobjectsAddForm from "@/components/objects-creation/subobjects-add-form/form";
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
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight pt-2 pb-2">
        {`Наименование: ${complex.name}`}
      </h2>
      <SubobjectsAddForm />
    </>
  );
}
