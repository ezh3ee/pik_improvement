// import { fetchResidentialComplexAction } from "@/components/objects-creation/residential-complex-add-form/action";

import { Step, useComplexStore } from "@/components/map/state/complex-state";
import { fetchResidentialComplexAction } from "@/components/objects-creation/residential-complex-add-form/action";
import { useQuery } from "@tanstack/react-query";

export default function SubobjectsAddForm() {
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
    return "ЖК не найден. {isError} <Button>Добавить ЖК</Button>";
  }

  return `ЖК: ${complex.name}`;
}
