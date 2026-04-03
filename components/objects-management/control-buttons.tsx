import { Step, useComplexStore } from "@/components/map/state/complex-store";
import FormControlButton from "@/components/objects-management/subobjects/buttons/form-control-button";
import { ButtonGroup } from "@/components/ui/button-group";
import { QueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, PanelLeftClose, RotateCcw } from "lucide-react";
import { useCallback } from "react";

export default function ComplexControlButtons() {
  const gotoPreviousStep = useComplexStore((state) => state.gotoPreviousStep);
  const gotoNextStep = useComplexStore((state) => state.gotoNextStep);
  const currentStep = useComplexStore((state) => state.step);
  const resetStore = useComplexStore((state) => state.resetStore);
  const complexId = useComplexStore((state) => state.complexId);

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

      {currentStep === Step.ComplexAdd && complexId && (
        <FormControlButton text="Вперед" action={gotoNextStep} reversed>
          <ArrowRight />
        </FormControlButton>
      )}
    </ButtonGroup>
  );
}
