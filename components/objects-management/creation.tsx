"use client";

import ComplexCreationControlButtons from "@/components/objects-management/control-buttons";
import ComplexSteps from "@/components/objects-management/steps";
import StepTitle from "@/components/objects-management/title";

export default function Creation() {
  return (
    <>
      <ComplexCreationControlButtons />
      <StepTitle />
      <ComplexSteps />
    </>
  );
}
