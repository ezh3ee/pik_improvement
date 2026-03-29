import { useComplexStore } from "@/components/map/state/complex-store";
import { useDrawingStore } from "@/components/map/state/drawing-store";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Check } from "lucide-react";

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

  const toggleDrawing = useDrawingStore((state) => state.toggleDrawing);
  const turnoffAllIntercations = useDrawingStore(
    (state) => state.turnoffAllIntercations,
  );
  const isDrawing = useDrawingStore((state) => state.isDrawing);
  const resetDrawingStore = useDrawingStore((state) => state.resetStore);

  function submitGeometry() {
    if (!isDrawing) toggleDrawing();
    toggleGeometry();
    resetDrawingStore();

    if (isAddingGeometry) {
      submit?.();
      turnoffAllIntercations();
    }
    if (isAdded && !isAddingGeometry) renderGeometry?.();
  }

  let buttonContent = "";

  if (isAddingGeometry) {
    buttonContent = "Подтвердить";
  } else if (isAdded) {
    buttonContent = "Изменить геометрию";
  } else {
    buttonContent = "Добавить геометрию";
  }

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
