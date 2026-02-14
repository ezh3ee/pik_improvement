import usePointCoordConverter from "@/components/map/hooks/use-point-coord-converter";
import { RefPoint } from "@/components/map/state/refpoints-store";
import { altKeyOnly } from "ol/events/condition";
import Feature from "ol/Feature";
import { Point, SimpleGeometry } from "ol/geom";
import Modify from "ol/interaction/Modify";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import { RefObject, useEffect } from "react";
import { useRefPointsStore } from "../state/refpoints-store";

type AddRefPointType = {
  modifyRef: RefObject<Modify | null>;
  sourceRef: RefObject<VectorSource | null>;
  map: Map | null;
  isReady: boolean;
  updateRefPoint: (
    id: string,
    coordinates: number[],
    original: number[],
  ) => void;
  addRefPoints: (refPoint: RefPoint) => void;
  removeRefPoint: (id: string) => void;
};

export default function useAddRefPoint({
  modifyRef,
  sourceRef,
  map,
  isReady,
  updateRefPoint,
  addRefPoints,
  removeRefPoint,
}: AddRefPointType) {
  const resetRefPointsTrigger = useRefPointsStore(
    (state) => state.resetRefPointTrigger,
  );
  const converImageDimensions = usePointCoordConverter();
  useEffect(() => {
    if (!map || !isReady || !modifyRef.current || !sourceRef.current) return;

    const refPoints: RefPoint[] = useRefPointsStore.getState().refPoints;

    if (refPoints.length > 0)
      refPoints.map((el) => {
        const feature = new Feature({
          geometry: new Point(el.original),
        });
        feature.setId(el.id);

        sourceRef?.current?.addFeature(feature);
      });

    modifyRef.current.on("modifyend", (e) => {
      const modifiedFeatureId = e.features.item(0).getId();
      if (!modifiedFeatureId) return;

      const feature = sourceRef?.current?.getFeatureById(modifiedFeatureId);

      if (!feature) return;

      const geometry = feature.getGeometry();

      if (!geometry) return;
      if (!(geometry instanceof SimpleGeometry)) return;

      const coordinates = geometry.getCoordinates();
      if (!coordinates) return;

      updateRefPoint(
        String(modifiedFeatureId),
        coordinates,
        converImageDimensions(coordinates),
      );
    });

    sourceRef.current.on("addfeature", (e) => {
      const feature = e.feature;
      if (!feature) return;

      feature.setId(crypto.randomUUID());

      const geometry = feature.getGeometry();

      if (geometry instanceof SimpleGeometry) {
        const coordinates = geometry.getCoordinates();
        if (!coordinates) return;

        const refPoints: RefPoint = {
          original: coordinates,
          converted: converImageDimensions(coordinates),
          id: String(feature.getId()),
        };

        addRefPoints(refPoints);
      }
    });

    map.on("singleclick", (e) => {
      if (!altKeyOnly(e)) return;
      if (!sourceRef.current) return;

      const feature = map.forEachFeatureAtPixel(e.pixel, (f) => f);

      if (feature instanceof Feature && sourceRef.current.hasFeature(feature)) {
        sourceRef.current.removeFeature(feature);
        removeRefPoint(String(feature.getId()));
      }
    });
  }, [
    addRefPoints,
    removeRefPoint,
    updateRefPoint,
    map,
    modifyRef,
    sourceRef,
    isReady,
    converImageDimensions,
  ]);

  useEffect(() => {
    const refPoints: RefPoint[] = useRefPointsStore.getState().refPoints;
    if (refPoints.length === 0 && resetRefPointsTrigger > 0)
      sourceRef?.current?.clear();
  }, [resetRefPointsTrigger, sourceRef]);
}
