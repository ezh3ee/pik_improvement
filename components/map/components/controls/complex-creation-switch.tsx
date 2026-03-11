"use client";

import { useComplexStore } from "@/components/map/state/complex-state";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { Button } from "@/components/ui/button";

export default function ComplexToggleBtn() {
  const step = useComplexStore((state) => state.step);
  const setStep = useComplexStore((state) => state.setStep);

  const isGeoRefVisible = useGeoreferenceStore((state) => state.isVisible);
  const toggleGeoRefVisible = useGeoreferenceStore(
    (state) => state.toggleVisible,
  );

  return step === "none" ? (
    <Button onClick={() => setStep("complex-add")} variant="outline">
      Добавить ЖК
    </Button>
  ) : (
    <Button
      onClick={() => {
        setStep("none");

        if (isGeoRefVisible) {
          toggleGeoRefVisible();
        }
      }}
      variant="outline"
    >
      Карта
    </Button>
  );
}
