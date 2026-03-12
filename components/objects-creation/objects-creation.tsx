"use client";

import { useComplexStore } from "@/components/map/state/complex-state";
import ResidentialComplexAddForm from "@/components/objects-creation/residential-complex-add-form/residential-complex-add-form";
import SubobjectsAddForm from "@/components/objects-creation/subobjects-add-form/subobjects-add-form";

export default function ObjectsCreation() {
  const step = useComplexStore((state) => state.step);

  if (step === "complex-add") return <ResidentialComplexAddForm />;
  if (step === "object-add") return <SubobjectsAddForm />;
}
