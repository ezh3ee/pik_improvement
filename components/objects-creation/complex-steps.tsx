import { Step, useComplexStore } from "@/components/map/state/complex-state";
import ResidentialComplexAddForm from "@/components/objects-creation/residential-complex-add-form/residential-complex-add-form";
import SubobjectsAddForm from "@/components/objects-creation/subobjects-add-form/subobjects-add-form";

export default function ComplexSteps() {
  const step = useComplexStore((state) => state.step);

  if (step === Step.ComplexAdd) return <ResidentialComplexAddForm />;
  if (step === Step.ObjectAdd) return <SubobjectsAddForm />;
}
