// import { fetchResidentialComplexAction } from "@/components/objects-creation/residential-complex-add-form/action";

import { Step, useComplexStore } from "@/components/map/state/complex-store";
import { fetchResidentialComplexAction } from "@/components/objects-management/complex/action";
import CollapsibleList from "@/components/objects-management/subobjects/collapsible-list";
import SubobjectsAddForm from "@/components/objects-management/subobjects/form-container";
import { useQuery } from "@tanstack/react-query";

export default function SubobjectsStep() {
  const complexId = useComplexStore((state) => state.complexId) as string;
  const setStep = useComplexStore((state) => state.setStep);

  const {
    data: complex,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["complexes", complexId],
    queryFn: () => fetchResidentialComplexAction(complexId),
    enabled: !!complexId,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <span>Загрузка...</span>;

  if (isError || !complex) {
    return <>{setStep(Step.ComplexAdd)}</>;
  }

  const titleStyle =
    "relative rounded bg-mutedpy-[0.2rem] scroll-m-20 text-xl font-semibold tracking-tight mt-2 mb-2 border-b border-gray-200 pb-2";

  return (
    <>
      <h4 className={titleStyle}>{`ЖК: ${complex.name}`}</h4>

      <CollapsibleList />

      <SubobjectsAddForm />
    </>
  );
}
