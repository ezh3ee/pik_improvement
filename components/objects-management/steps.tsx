import { Step, useComplexStore } from "@/components/map/state/complex-store";
import ComplexStep from "@/components/objects-management/complex/complex-step";
import SubobjectsStep from "@/components/objects-management/subobjects/subobjects-step";
import SubobjectDetailed from "./subobjects/detailed/detailed";

export default function ComplexSteps() {
  const step = useComplexStore((state) => state.step);

  if (step === Step.ComplexAdd) return <ComplexStep />;
  if (step === Step.ObjectAdd) return <SubobjectsStep />;
  if (step === Step.ObjectCard) return <SubobjectDetailed />;
}
