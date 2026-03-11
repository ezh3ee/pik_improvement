"use client";

import { useComplexStore } from "@/components/map/state/complex-state";
import ResidentialComplexAddForm from "./residential-complex-add-form/residential-complex-add-form";

export default function ObjectsCreation() {
  const step = useComplexStore((state) => state.step);

  return step === "complex-add" && <ResidentialComplexAddForm />;
}
