import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function LoadingGeometryButton({
  isAdding,
}: {
  isAdding?: boolean;
}) {
  return (
    <Button variant="secondary" disabled={isAdding} type="button">
      {isAdding ? "Добавление" : "Добавить объект на карте"}
      {isAdding && <Spinner data-icon="inline-start" />}
    </Button>
  );
}
