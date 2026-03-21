import { useComplexStore } from "@/components/map/state/complex-store";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

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
    <>
      <Button variant="secondary" type="button" onClick={submitGeometry}>
        <span>{buttonContent}</span>
        <span>{isAddingGeometry && <Spinner data-icon="inline-start" />}</span>
      </Button>
    </>
  );
}
