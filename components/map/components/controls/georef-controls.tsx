"use client";

// import GeoreferenceBtn from "@/components/map/components/controls/georeference-btn";
import GeoreferenceBtn from "@/components/map/components/controls/georeference-btn";
import OpacityCtrl from "@/components/map/components/controls/opacity-ctrl";
import ShowGeoRefOnMapOnly from "@/components/map/components/controls/show-georef-on-map-only-btn";
import ToggleRefImageButton from "@/components/map/components/controls/toggle-refimg-button";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { useRefPointsStore } from "@/components/map/state/refpoints-store";
import { ButtonGroup } from "@/components/ui/button-group";

export default function GeoRefControls() {
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

  const showOpacityCtrl =
    isImagePathSet &&
    isPointsReady &&
    ((!isGeoRefVisible && showGeoRefImgOnMapOnly) ||
      (isGeoRefVisible && isGeoRefImgVisible));

  const showOnlyGeoRefBtn = !isGeoRefVisible && isImagePathSet && isPointsReady;
  const showToggleImageBtn = isGeoRefVisible && isImagePathSet && isPointsReady;

  return (
    <>
      <ButtonGroup>
        {showOnlyGeoRefBtn && <ShowGeoRefOnMapOnly />}
        {showToggleImageBtn && <ToggleRefImageButton />}
        <GeoreferenceBtn />
      </ButtonGroup>
      {showOpacityCtrl && <OpacityCtrl />}
    </>
  );
}
