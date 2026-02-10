"use client";

import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import Map from "ol/Map";
import "ol/ol.css";
import Projection from "ol/proj/Projection";
import View from "ol/View";
import { useEffect, useRef } from "react";

export const pixelProjection = new Projection({
  code: "pixel",
  units: "pixels",
  extent: [-100000, -100000, 100000, 100000],
});

export function MapPane() {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const setMap = useGeoreferenceStore((state) => state.setMap);
  const setContainer = useGeoreferenceStore((state) => state.setContainer);

  useEffect(() => {
    if (!mapDivRef.current) return;

    const newMap = new Map({
      target: mapDivRef.current,
      layers: [],
      view: new View({
        projection: pixelProjection,
        zoom: 8,
        center: [0, 0],
      }),
      controls: [],
    });

    setMap(newMap);
    setContainer(mapDivRef.current);

    return () => {
      newMap.setTarget(undefined); //
    };
  }, [setMap, setContainer]);

  return (
    <div
      ref={mapDivRef}
      style={{ width: "100%", height: "100%" }}
      className="map-pane"
    />
  );
}
