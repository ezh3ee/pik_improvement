import { Step, useComplexStore } from "@/components/map/state/complex-store";
import FormControlButton from "@/components/objects-management/subobjects/buttons/form-control-button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  PanelLeftClose,
  Pencil,
  RotateCcw,
  Trash,
} from "lucide-react";
import { useCallback } from "react";
import { deleteResidentialComplexAction } from "./complex/action";

export default function ComplexControlButtons() {
  const gotoPreviousStep = useComplexStore((state) => state.gotoPreviousStep);
  const gotoNextStep = useComplexStore((state) => state.gotoNextStep);
  const gotoFirstStep = useComplexStore((state) => state.gotoFirstStep);
  const currentStep = useComplexStore((state) => state.step);
  const resetStore = useComplexStore((state) => state.resetStore);
  const complexId = useComplexStore((state) => state.complexId);
  const isComplexEditing = useComplexStore((state) => state.isComplexEditing);
  const setComplexEditing = useComplexStore((state) => state.setComplexEditing);

  const reset = useCallback(() => {
    // сброс формы и инвалидация кэша объектов и жк,
    // также принудительное отключение режима рисования

    const queryClient = new QueryClient();
    queryClient.invalidateQueries({ queryKey: ["objects"] });
    queryClient.invalidateQueries({ queryKey: ["complexes"] });
    // gotoFirstStep();
    resetStore();
  }, [resetStore]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteResidentialComplexAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complexes"] });
      gotoFirstStep();
    },
  });

  return (
    <ButtonGroup className="flex justify-center">
      {currentStep !== Step.None && complexId && (
        <FormControlButton text="" action={reset}>
          <RotateCcw />
        </FormControlButton>
      )}

      <FormControlButton
        text={currentStep === Step.ComplexAdd ? "Закрыть" : "Назад"}
        action={gotoPreviousStep}
      >
        {currentStep === Step.ComplexAdd ? <PanelLeftClose /> : <ArrowLeft />}
      </FormControlButton>

      {currentStep === Step.ComplexAdd && !isComplexEditing && complexId && (
        <FormControlButton
          text="Редактировать ЖК"
          action={() => setComplexEditing(true)}
        >
          <Pencil />
        </FormControlButton>
      )}

      {currentStep === Step.ComplexAdd && complexId && (
        <FormControlButton
          text="Удалить ЖК"
          action={() => mutation.mutate({ id: complexId })}
          variant="destructive"
        >
          <Trash />
        </FormControlButton>
      )}

      {currentStep === Step.ComplexAdd && complexId && (
        <FormControlButton text="Вперед" action={gotoNextStep} reversed>
          <ArrowRight />
        </FormControlButton>
      )}
    </ButtonGroup>
  );
}
