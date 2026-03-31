import { Step, useComplexStore } from "@/components/map/state/complex-store";
import ResidentialComplexAddForm from "@/components/objects-management/residential-complex-add-form/residential-complex-form";
import SubobjectsAdd from "@/components/objects-management/subobjects-add-form/subobjects-add";

export default function ComplexSteps() {
  const step = useComplexStore((state) => state.step);

  if (step === Step.ComplexAdd) return <ResidentialComplexAddForm />;
  if (step === Step.ObjectAdd) return <SubobjectsAdd />;
}
