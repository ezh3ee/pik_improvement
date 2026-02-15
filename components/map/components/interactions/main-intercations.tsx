"use client";
import MainGeoreferenceControlPoints from "@/components/map/components/controls/main-georeference-control-points";
import { TestPoint } from "@/components/map/layers/vector/test-point";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";

export default function MainInteractions() {
  const useIsGeoreferenceVisible = useGeoreferenceStore(
    (state) => state.isVisible,
  );
  const imagePath = useGeoreferenceStore((state) => state.imagePath);

  // const isPointsReady = useRefPointsStore(
  //   (state) =>
  //     state.refPoints.length >= 2 && state.mainMapRefPoints.length >= 2,
  // );

  // console.log("isPointsReady ", isPointsReady);

  return !useIsGeoreferenceVisible ? (
    <TestPoint />
  ) : (
    <MainGeoreferenceControlPoints />
  );
}
