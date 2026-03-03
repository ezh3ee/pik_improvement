"use client";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { Button } from "@/components/ui/button";

export default function ToggleRefImageButton() {
  const toggleVisible = useGeoreferenceStore(
    (state) => state.toggleGeoRefImgVisible,
  );

  const isVisible = useGeoreferenceStore((state) => state.isGeoRefImgVisible);

  return (
    <Button
      onClick={() => toggleVisible()}
      variant="outline"
      className={isVisible ? "active" : ""}
    >
      {isVisible ? "Скрыть генплан" : "Показать генплан"}
    </Button>
  );
}
