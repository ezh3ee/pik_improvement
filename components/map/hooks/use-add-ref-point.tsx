import {
  RefPoint,
  useGeoreferenceStore,
} from "@/components/map/state/georeference-store";
import { altKeyOnly } from "ol/events/condition";
import Feature from "ol/Feature";
import { Point, SimpleGeometry } from "ol/geom";
import Modify from "ol/interaction/Modify";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import { RefObject, useEffect } from "react";

type AddRefPointType = {
  modifyRef: RefObject<Modify | null>;
  sourceRef: RefObject<VectorSource | null>;
  map: Map | null;
  isReady: boolean;
  updateRefPoint: (id: string, coordinates: number[]) => void;
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
  const resetRefPointsTrigger = useGeoreferenceStore(
    (state) => state.resetRefPointTrigger,
  );
  useEffect(() => {
    if (!map || !isReady || !modifyRef.current || !sourceRef.current) return;

    const refPoints: RefPoint[] = useGeoreferenceStore.getState().refPoints;

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

      sourceRef?.current?.forEachFeature((f) => {
        if (f.getId() === modifiedFeatureId) {
          const geometry = f.getGeometry();
          if (geometry instanceof SimpleGeometry) {
            updateRefPoint(
              String(f.getId()),
              geometry.getCoordinates() as number[],
            );
          }
        }
      });
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
          converted: [coordinates[0] + 1553 / 2, coordinates[1] + 900 / 2],
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
  ]);

  useEffect(() => {
    const refPoints: RefPoint[] = useGeoreferenceStore.getState().refPoints;
    if (refPoints.length === 0 && resetRefPointsTrigger > 0)
      sourceRef?.current?.clear();
  }, [resetRefPointsTrigger, sourceRef]);
}
