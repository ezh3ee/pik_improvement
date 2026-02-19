"use client";

import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { Button } from "@/components/ui/button";

export default function ShowGeoRefOnMapOnly() {
  const toggleShowGeoRefImgOnMapOnly = useGeoreferenceStore(
    (state) => state.toggleShowGeoRefImgOnMapOnly,
  );

  return (
    <Button
      onClick={() => toggleShowGeoRefImgOnMapOnly()}
      className="layered-genplan-btn"
    >
      Наложенный генлан
    </Button>
  );
}
