import { Step, useComplexStore } from "@/components/map/state/complex-store";
import FormControlButton from "@/components/objects-management/subobjects-add-form/buttons/form-control-button";
import { ButtonGroup } from "@/components/ui/button-group";
import { QueryClient } from "@tanstack/react-query";
import { ArrowLeft, PanelLeftClose, RotateCcw } from "lucide-react";
import { useCallback } from "react";

export default function ComplexControlButtons() {
  // const gotoFirstStep = useComplexStore((state) => state.gotoFirstStep);
  const gotoPreviousStep = useComplexStore((state) => state.gotoPreviousStep);
  const currentStep = useComplexStore((state) => state.step);
  const resetStore = useComplexStore((state) => state.resetStore);

  const reset = useCallback(() => {
    // сброс формы и инвалидация кэша объектов и жк,
    // также принудительное отключение режима рисования

    const queryClient = new QueryClient();
    queryClient.invalidateQueries({ queryKey: ["objects"] });
    queryClient.invalidateQueries({ queryKey: ["complexes"] });
    // gotoFirstStep();
    resetStore();
  }, [resetStore]);

  return (
    <ButtonGroup className="flex justify-center">
      {!(currentStep === Step.None || currentStep === Step.ComplexAdd) && (
        <FormControlButton text="Сбросить" action={reset}>
          <RotateCcw />
        </FormControlButton>
      )}

      <FormControlButton
        text={currentStep === Step.ComplexAdd ? "Закрыть" : "Назад"}
        action={gotoPreviousStep}
      >
        {currentStep === Step.ComplexAdd ? <PanelLeftClose /> : <ArrowLeft />}
      </FormControlButton>
    </ButtonGroup>
  );
}
