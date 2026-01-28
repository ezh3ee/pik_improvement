"use client";

import { useMap } from "@/components/map/hooks/use-map";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef } from "react";

export function TestPoint() {
  const { map, isReady } = useMap();
  const layerRef = useRef<VectorLayer | null>(null);

  useEffect(() => {
    if (!map || !isReady) return;
    // const point = new Point(convertCoordReverser(55.749521, 37.62481)); // 1
    // const point = new Point(convertCoordReverser(55.749689, 37.625712));
    const point = new Point(fromLonLat([37.625712, 55.749689]));

    const layer = new VectorLayer({
      // тестовая точкв
      source: new VectorSource({
        features: [new Feature(point)],
      }),
      style: {
        "circle-radius": 9,
        "circle-fill-color": "red",
      },
    });

    layerRef.current = layer;
    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, isReady]);
  return null;
}
