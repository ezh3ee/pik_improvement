import { Step, useComplexStore } from "@/components/map/state/complex-store";
import ResidentialComplexAddForm from "@/components/objects-management/complex/complex-form";
import SubobjectsAdd from "@/components/objects-management/subobjects/subobjects-add";

export default function ComplexSteps() {
  const step = useComplexStore((state) => state.step);

  if (step === Step.ComplexAdd) return <ResidentialComplexAddForm />;
  if (step === Step.ObjectAdd) return <SubobjectsAdd />;
}
