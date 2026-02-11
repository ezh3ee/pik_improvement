"use client";
import {
  blackCrossStyle,
  redCrossStyle,
} from "@/components/map/common/cross-style";
import {
  RefPoint,
  useGeoreferenceStore,
} from "@/components/map/state/georeference-store";
import { altKeyOnly } from "ol/events/condition";
import BaseEvent from "ol/events/Event";
import Feature from "ol/Feature";
import Geometry from "ol/geom/Geometry";
import SimpleGeometry from "ol/geom/SimpleGeometry";
import Draw from "ol/interaction/Draw";
import Modify from "ol/interaction/Modify";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef } from "react";

declare module "ol/events/Event" {
  interface BaseEvent {
    feature: Feature<Geometry>;
  }
}

export default function ControlPoints() {
  const map = useGeoreferenceStore((state) => state.map);
  const isReady = useGeoreferenceStore((state) => state.isReady);
  const addRefPoints = useGeoreferenceStore((state) => state.setRefPoints);
  const updateRefPoint = useGeoreferenceStore((state) => state.updateRefPoint);
  const sourceRef = useRef<VectorSource | null>(null);
  const vLayerRef = useRef<VectorLayer | null>(null);
  const drawRef = useRef<Draw | null>(null);
  const modifyRef = useRef<Modify | null>(null);

  useEffect(() => {
    if (!map || !isReady) return;

    const refPoints: RefPoint[] = useGeoreferenceStore.getState().refPoints;

    // console.log("refPoints ", refPoints);

    const source = new VectorSource();

    const vLayer = new VectorLayer({
      source: source,
      style: redCrossStyle,
    });

    const draw = new Draw({
      type: "Point",
      source: source,
      style: blackCrossStyle,
      condition: (e) =>
        !(source.getFeatures().length === 2) &&
        !altKeyOnly(e) &&
        !(refPoints.length === 2), // добавить рефпоинты
    });

    const modify = new Modify({
      source: source,
      style: blackCrossStyle,
    });

    vLayer.setMap(map);

    if (refPoints.length > 0)
      refPoints.map((el) => source.addFeature(el.feature));

    vLayerRef.current = vLayer;
    sourceRef.current = source;
    drawRef.current = draw;
    modifyRef.current = modify;

    modify.on("modifyend", (e) => {
      const modifiedFeatureId = e.features.item(0).getId();
      source.forEachFeature((f) => {
        if (f.getId() === modifiedFeatureId) {
          const geometry = f.getGeometry();
          if (geometry instanceof SimpleGeometry) {
            updateRefPoint(
              f.getId() as string,
              geometry.getCoordinates() as number[],
            );
          }
        }
      });

      // const f = e.features.item(0);
      // map.dispatchEvent({
      //   type: "updateControlPoint",
      //   feature: f,
      // } as unknown as BaseEvent);
    });

    map.addInteraction(modify);
    map.addInteraction(draw);

    draw.set("source", vLayer.getSource());

    source.on("addfeature", (e) => {
      const feature = e.feature;
      if (!feature) return;
      feature.setId(crypto.randomUUID());

      const geometry = feature.getGeometry();

      if (geometry instanceof SimpleGeometry) {
        const coordinates = geometry.getCoordinates();
        if (!coordinates) return;

        const refPoints: RefPoint = {
          feature: feature,
          converted: [
            coordinates[0] + 1553 / 2,
            coordinates[1] + 900 / 2,
          ] as number[],
          id: feature.getId() as string,
        };

        addRefPoints(refPoints);
      }
    });

    map.on("singleclick", (e) => {
      if (!altKeyOnly(e)) return;

      const feature = map.forEachFeatureAtPixel(e.pixel, (f) => f);
      if (feature instanceof Feature && source.hasFeature(feature))
        source.removeFeature(feature);
    });

    return () => {
      map.removeInteraction(draw);
      map.removeInteraction(modify);
      source.clear();
      sourceRef.current = null;
      drawRef.current = null;
      modifyRef.current = null;
      vLayerRef.current = null;
    };
  }, [map, isReady, addRefPoints]);

  return null;
}
