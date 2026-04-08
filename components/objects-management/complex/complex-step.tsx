"use client";
import { useComplexStore } from "@/components/map/state/complex-store";
import ComplexDetailed from "@/components/objects-management/complex/detailed";
import ComplexForm from "@/components/objects-management/complex/form";

type ResidentialComplexFetched = {
  name: string;
};

export default function ComplexStep() {
  const complexId = useComplexStore((state) => state.complexId);
  const isComplexEditing = useComplexStore((state) => state.isComplexEditing);

  const isFormVisible = !complexId || isComplexEditing;
  const isCardVisible = complexId && !isComplexEditing;

  return (
    <div>
      {isCardVisible && <ComplexDetailed complexId={complexId} />}
      {isFormVisible && <ComplexForm />}
    </div>
  );
}
