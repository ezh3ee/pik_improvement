"use client";
import ImageOnMap from "@/components/map/components/georeference/map/image-on-map";
import MainGeoreferenceControlPoints from "@/components/map/components/interactions/main-georeference-control-points";
import { TestPoint } from "@/components/map/layers/vector/test-point";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { useRefPointsStore } from "@/components/map/state/refpoints-store";

export default function MainInteractions() {
  const isVisible = useGeoreferenceStore((state) => state.isVisible);
  const isImagePathSet = useGeoreferenceStore((state) => state.imagePath);
  const isGeoRefImgVisible = useGeoreferenceStore(
    (state) => state.isGeoRefImgVisible,
  );
  const isShowGeoRefImgOnMapOnly = useGeoreferenceStore(
    (state) => state.showGeoRefImgOnMapOnly,
  );

  const isPointsReady = useRefPointsStore(
    (state) =>
      state.refPoints.length >= 2 && state.mainMapRefPoints.length >= 2,
  );

  if ((!isVisible || !isImagePathSet) && !isShowGeoRefImgOnMapOnly) {
    return <TestPoint />;
  } else if (!isVisible && isImagePathSet && isShowGeoRefImgOnMapOnly) {
    return <ImageOnMap />;
  } else {
    if (isPointsReady && isGeoRefImgVisible) {
      return (
        <>
          <ImageOnMap />
          <MainGeoreferenceControlPoints />
        </>
      );
    } else {
      return <MainGeoreferenceControlPoints />;
    }
  }
}
