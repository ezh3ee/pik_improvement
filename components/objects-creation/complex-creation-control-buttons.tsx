import { Step, useComplexStore } from "@/components/map/state/complex-store";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { RotateCcw } from "lucide-react";

export default function ComplexCreationControlButtons() {
  const gotoFirstStep = useComplexStore((state) => state.gotoFirstStep);
  const currentStep = useComplexStore((state) => state.step);

  return (
    <ButtonGroup className="flex justify-center">
      <Button
        variant="outline"
        size="icon-lg"
        onClick={gotoFirstStep}
        style={{
          display:
            currentStep === Step.None || currentStep === Step.ComplexAdd
              ? "none"
              : "flex",
        }}
      >
        <RotateCcw />
      </Button>
    </ButtonGroup>
  );
}
