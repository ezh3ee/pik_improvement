import usePointCoordConverter from "@/components/map/hooks/use-point-coord-converter";
import {
  RefPoint,
  useRefPointsStore,
} from "@/components/map/state/refpoints-store";
import { altKeyOnly } from "ol/events/condition";
import Feature from "ol/Feature";
import { Geometry, Point, SimpleGeometry } from "ol/geom";
import Draw from "ol/interaction/Draw";
import Modify, { ModifyEvent } from "ol/interaction/Modify";
import Map from "ol/Map";
import MapBrowserEvent from "ol/MapBrowserEvent";
import VectorSource, { VectorSourceEvent } from "ol/source/Vector";
import { RefObject, useEffect } from "react";

type AddRefPointType = {
  modifyRef: RefObject<Modify | null>;
  sourceRef: RefObject<VectorSource | null>;
  drawRef: RefObject<Draw | null>;
  refPoints: RefPoint[];
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
  drawRef,
  refPoints,
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
    if (
      !map ||
      !isReady ||
      !modifyRef.current ||
      !sourceRef.current ||
      !drawRef.current
    )
      return;

    const modify = modifyRef.current;
    const source = sourceRef.current;

    const modifyHandler = (e: ModifyEvent) => {
      const modifiedFeatureId = e.features?.item(0).getId();
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
    };

    const addFeatureHandler = (e: VectorSourceEvent<Feature<Geometry>>) => {
      // const addFeatureHandler = (e: DrawEvent) => {
      const feature = e.feature;
      if (!feature) return;
      if (feature.getId()) return; // проверить, если фича уже есть в сторе

      feature.setId(crypto.randomUUID());

      const geometry = feature.getGeometry();

      if (geometry instanceof SimpleGeometry) {
        const coordinates = geometry.getCoordinates();
        if (!coordinates) return;

        const refPoint: RefPoint = {
          original: coordinates,
          converted: converImageDimensions(coordinates),
          id: String(feature.getId()),
        };

        addRefPoints(refPoint);
      }
    };

    const clickHandler = (e: MapBrowserEvent) => {
      if (!altKeyOnly(e)) return;
      if (!sourceRef.current) return;

      const feature = map.forEachFeatureAtPixel(e.pixel, (f) => f);

      if (feature instanceof Feature && sourceRef.current.hasFeature(feature)) {
        sourceRef.current.removeFeature(feature);
        removeRefPoint(String(feature.getId()));
      }
    };

    source.on("addfeature", addFeatureHandler);
    modify.on("modifyend", modifyHandler);
    map.on("singleclick", clickHandler);

    return () => {
      modify.un("modifyend", modifyHandler);
      source.un("addfeature", addFeatureHandler);
      map.un("singleclick", clickHandler);
    };
  }, [
    addRefPoints,
    removeRefPoint,
    updateRefPoint,
    map,
    modifyRef,
    sourceRef,
    isReady,
    converImageDimensions,
    drawRef,
    // refPoints,
  ]);

  useEffect(() => {
    if (!sourceRef.current || !isReady) return;

    if (refPoints.length > 0) {
      console.log("refPoints", refPoints);
      refPoints.map((el) => {
        if (sourceRef.current?.getFeatureById(el.id)) return;
        const feature = new Feature({
          geometry: new Point(el.original),
        });
        feature.setId(el.id);

        sourceRef.current?.addFeature(feature);
      });
    }
  }, [map, refPoints, sourceRef, isReady]);

  useEffect(() => {
    const refPoints: RefPoint[] = useRefPointsStore.getState().refPoints;
    if (refPoints.length === 0 && resetRefPointsTrigger > 0)
      sourceRef?.current?.clear();
  }, [resetRefPointsTrigger, sourceRef]);
}
