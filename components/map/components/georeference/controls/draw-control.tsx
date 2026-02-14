"use client";
import useAddRefPoint from "@/components/map/hooks/use-add-ref-point";
import useDrawPointsInteraction from "@/components/map/hooks/use-draw-points-interaction";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { useRefPointsStore } from "@/components/map/state/refpoints-store";

export default function ControlPoints() {
  const map = useGeoreferenceStore((state) => state.map);
  const isReady = useGeoreferenceStore((state) => state.isReady);
  const addRefPoints = useRefPointsStore((state) => state.setRefPoints);
  const updateRefPoint = useRefPointsStore((state) => state.updateRefPoint);
  const removeRefPoint = useRefPointsStore((state) => state.removeRefPoint);

  const { modifyRef, sourceRef } = useDrawPointsInteraction({ map, isReady });

  useAddRefPoint({
    modifyRef,
    sourceRef,
    map,
    isReady,
    updateRefPoint,
    addRefPoints,
    removeRefPoint,
  });

  return null;
}
