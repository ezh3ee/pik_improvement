"use client";

import MapGeoreference from "@/components/map/components/georeference/georeference";
import { Step, useComplexStore } from "@/components/map/state/complex-store";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import ObjectsCreation from "@/components/objects-creation/objects-creation";

export default function MapLeftSide() {
  const isGeoRefVisible = useGeoreferenceStore((state) => state.isVisible);
  const objectCreationStep = useComplexStore((state) => state.step);

  const isVisible = isGeoRefVisible || objectCreationStep !== Step.None;

  return (
    <div
      className="left-side pr-4"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <MapGeoreference />
      {!isGeoRefVisible && <ObjectsCreation />}
    </div>
  );
}
