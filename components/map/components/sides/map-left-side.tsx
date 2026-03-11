"use client";

import MapGeoreference from "@/components/map/components/georeference/georeference";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import ObjectsCreation from "@/components/objects-creation/objects-creation";

export default function MapLeftSide() {
  const isGeoRefVisible = useGeoreferenceStore((state) => state.isVisible);

  return (
    <>
      <MapGeoreference />
      {!isGeoRefVisible && <ObjectsCreation />}
    </>
  );
}
