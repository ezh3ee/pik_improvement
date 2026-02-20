"use client";

import GeoreferenceBtn from "@/components/map/components/controls/georeference-btn";
import LayersSwitch from "@/components/map/components/controls/layer-switch/layers-switch";
import OpacityCtrl from "@/components/map/components/controls/opacity-ctrl";
import ShowGeoRefOnMapOnly from "@/components/map/components/controls/show-georef-on-map-only-btn";
import ToggleRefImageButton from "@/components/map/components/controls/toggle-refimg-button";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { useRefPointsStore } from "../../state/refpoints-store";

export default function MainControls() {
  const isGeoRefVisible = useGeoreferenceStore((state) => state.isVisible);
  const isGeoRefImgVisible = useGeoreferenceStore(
    (state) => state.isGeoRefImgVisible,
  );
  const isImagePathSet = useGeoreferenceStore((state) => state.imagePath);
  const showGeoRefImgOnMapOnly = useGeoreferenceStore(
    (state) => state.showGeoRefImgOnMapOnly,
  );
  const isPointsReady = useRefPointsStore(
    (state) =>
      state.refPoints.length >= 2 && state.mainMapRefPoints.length >= 2,
  );

  return (
    <>
      {!isGeoRefVisible && isImagePathSet && isPointsReady && (
        <>
          {showGeoRefImgOnMapOnly && <OpacityCtrl />}
          <ShowGeoRefOnMapOnly />
        </>
      )}
      {isGeoRefVisible && isImagePathSet && isPointsReady && (
        <>
          {isGeoRefImgVisible && <OpacityCtrl />}
          <ToggleRefImageButton />
        </>
      )}
      <LayersSwitch />
      <GeoreferenceBtn />
    </>
  );
}
