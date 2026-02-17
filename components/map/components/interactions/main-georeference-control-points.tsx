"use client";
import useAddRefPoint from "@/components/map/hooks/use-add-ref-point";
import useDrawPointsInteraction from "@/components/map/hooks/use-draw-points-interaction";
import { useMap } from "@/components/map/hooks/use-map";
import {
  RefPoint,
  useRefPointsStore,
} from "@/components/map/state/refpoints-store";

export default function MainGeoreferenceControlPoints() {
  const { map, isReady } = useMap();
  const addRefPoints = useRefPointsStore((state) => state.setMainMapRefPoints);
  const updateRefPoint = useRefPointsStore(
    (state) => state.updateMainMapRefPoint,
  );
  const removeRefPoint = useRefPointsStore(
    (state) => state.removeMainMapRefPoint,
  );
  const refPoints: RefPoint[] = useRefPointsStore.getState().mainMapRefPoints;

  const { modifyRef, sourceRef, drawRef } = useDrawPointsInteraction({
    map,
    isReady,
  });

  useAddRefPoint({
    modifyRef,
    sourceRef,
    drawRef,
    refPoints,
    map,
    isReady,
    updateRefPoint,
    addRefPoints,
    removeRefPoint,
  });

  return null;
}
