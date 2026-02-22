"use client";

import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { Button } from "@/components/ui/button";

export default function ShowGeoRefOnMapOnly() {
  const toggleShowGeoRefImgOnMapOnly = useGeoreferenceStore(
    (state) => state.toggleShowGeoRefImgOnMapOnly,
  );
  const isShowGeoRefImgOnMapOnly = useGeoreferenceStore(
    (state) => state.showGeoRefImgOnMapOnly,
  );

  return (
    <Button
      variant="outline"
      onClick={() => toggleShowGeoRefImgOnMapOnly()}
      className={isShowGeoRefImgOnMapOnly ? "active" : ""}
    >
      Наложенный генлан
    </Button>
  );

  // return (
  //   <Button
  //     onClick={() => toggleShowGeoRefImgOnMapOnly()}
  //     className="layered-genplan-btn"
  //   >
  //     Наложенный генлан
  //   </Button>
  // );
}
