import { useComplexStore } from "@/components/map/state/complex-store";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Check } from "lucide-react";

export default function UploadGeometryButton({
  isAdded,
  submit,
}: {
  isAdded?: boolean;
  submit?: () => void;
}) {
  const toggleGeometry = useComplexStore((state) => state.toggleAddingGeometry);
  const isAddingGeometry = useComplexStore((state) => state.isAddingGeometry);

  function submitGeometry() {
    toggleGeometry();
    if (isAddingGeometry) submit?.();
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
