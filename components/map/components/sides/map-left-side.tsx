"use client";

import MapGeoreference from "@/components/map/components/georeference/georeference";
import { Step, useComplexStore } from "@/components/map/state/complex-store";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import ObjectsCreation from "@/components/objects-management/creation";

export default function MapLeftSide() {
  const isGeoRefVisible = useGeoreferenceStore((state) => state.isVisible);
  const objectCreationStep = useComplexStore((state) => state.step);

  const isVisible = isGeoRefVisible || objectCreationStep !== Step.None;

  return (
    isVisible && (
      <div className="left-side pr-4">
        <MapGeoreference />
        {!isGeoRefVisible && <ObjectsCreation />}
      </div>
    )
  );
}
