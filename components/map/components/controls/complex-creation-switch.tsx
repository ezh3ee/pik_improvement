"use client";

import { Step, useComplexStore } from "@/components/map/state/complex-store";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { Button } from "@/components/ui/button";

export default function ComplexToggleBtn() {
  const step = useComplexStore((state) => state.step);
  const setStep = useComplexStore((state) => state.setStep);
  const complexId = useComplexStore((state) => state.complexId);

  const isGeoRefVisible = useGeoreferenceStore((state) => state.isVisible);
  const toggleGeoRefVisible = useGeoreferenceStore(
    (state) => state.toggleVisible,
  );

  return step === Step.None ? (
    <Button
      onClick={() => {
        if (complexId) {
          setStep(Step.ObjectAdd);
        } else {
          setStep(Step.ComplexAdd);
        }
      }}
      variant="outline"
    >
      Объекты
    </Button>
  ) : (
    <Button
      onClick={() => {
        setStep(Step.None);

        if (isGeoRefVisible) {
          toggleGeoRefVisible();
        }
      }}
      variant="outline"
    >
      Назад к карте
    </Button>
  );
}
