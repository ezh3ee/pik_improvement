"use client";

import ComplexCreationControlButtons from "@/components/objects-management/complex-control-buttons";
import ComplexSteps from "@/components/objects-management/complex-steps";
import StepTitle from "@/components/objects-management/step-title";

export default function ObjectsCreation() {
  return (
    <>
      <ComplexCreationControlButtons />
      <StepTitle />
      <ComplexSteps />
    </>
  );
}
