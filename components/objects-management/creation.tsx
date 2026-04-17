"use client";

import ComplexCreationControlButtons from "@/components/objects-management/control-buttons";
import ComplexSteps from "@/components/objects-management/steps";
import StepTitle from "@/components/objects-management/title";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Creation() {
  return (
    <>
      <ScrollArea className="h-[86vh]">
        <ComplexCreationControlButtons />
        <StepTitle />
        <ComplexSteps />
      </ScrollArea>
    </>
  );
}
