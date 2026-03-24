import { Step, useComplexStore } from "@/components/map/state/complex-store";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { QueryClient } from "@tanstack/react-query";
import { RotateCcw } from "lucide-react";
import { useCallback } from "react";

export default function ComplexCreationControlButtons() {
  const gotoFirstStep = useComplexStore((state) => state.gotoFirstStep);
  const currentStep = useComplexStore((state) => state.step);

  const reset = useCallback(() => {
    // сброс формы и инвалидация кэша объектов
    const queryClient = new QueryClient();
    queryClient.invalidateQueries({ queryKey: ["objects"] });
    queryClient.invalidateQueries({ queryKey: ["complexes"] });
    gotoFirstStep();
  }, [gotoFirstStep]);

  return (
    <ButtonGroup className="flex justify-center">
      <Button
        variant="outline"
        size="icon-lg"
        onClick={reset}
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
