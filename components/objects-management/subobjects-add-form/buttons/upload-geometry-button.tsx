import { useComplexStore } from "@/components/map/state/complex-store";
import { useDrawingStore } from "@/components/map/state/drawing-store";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Check } from "lucide-react";
import { useCallback, useEffect } from "react";

export default function UploadGeometryButton({
  isAdded,
  submit,
  renderGeometry,
}: {
  isAdded?: boolean;
  submit?: () => void;
  renderGeometry?: () => void;
}) {
  const toggleGeometry = useComplexStore((state) => state.toggleAddingGeometry);
  const isAddingGeometry = useComplexStore((state) => state.isAddingGeometry);

  const storedFeatures = useDrawingStore((state) => state.storedFeatures);
  const toggleDrawing = useDrawingStore((state) => state.toggleDrawing);
  const turnoffAllIntercations = useDrawingStore(
    (state) => state.turnoffAllIntercations,
  );
  const isDrawing = useDrawingStore((state) => state.isDrawing);
  const isCutting = useDrawingStore((state) => state.isCutting);
  const isModifying = useDrawingStore((state) => state.isModifying);

  const resetDrawingStore = useDrawingStore((state) => state.resetStore);

  const submitGeometry = useCallback(() => {
    if (!isDrawing) {
      toggleDrawing();
    }

    toggleGeometry();
    resetDrawingStore();

    if (isAddingGeometry) {
      submit?.();
      turnoffAllIntercations();
    }

    if (isAdded && !isAddingGeometry) renderGeometry?.();
  }, [
    isAdded,
    isAddingGeometry,
    isDrawing,
    renderGeometry,
    resetDrawingStore,
    submit,
    toggleDrawing,
    toggleGeometry,
    turnoffAllIntercations,
  ]);

  let buttonContent = "";

  if (isAddingGeometry) {
    buttonContent = "Подтвердить";
  } else if (isAdded) {
    buttonContent = "Изменить геометрию";
  } else {
    buttonContent = "Добавить геометрию";
  }

  useEffect(() => {
    if (!isAddingGeometry && (isDrawing || isCutting || isModifying))
      toggleGeometry();
    else if (isAddingGeometry && !isDrawing && !isCutting && !isModifying) {
      submitGeometry();
    }
  }, [
    isDrawing,
    isCutting,
    isModifying,
    isAddingGeometry,
    toggleGeometry,
    submitGeometry,
    storedFeatures,
  ]);

  return (
    <div className="flex justify-start items-center gap-2">
      <Button variant="secondary" type="button" onClick={submitGeometry}>
        <span>{buttonContent}</span>
        <span>{isAddingGeometry && <Spinner data-icon="inline-start" />}</span>
      </Button>

      {isAdded && !isAddingGeometry ? <Check color="green" /> : null}
    </div>
  );
}
