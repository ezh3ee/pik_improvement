"use client";

import { useMapContext } from "@/components/map/providers/map-provider";
import { VIEW_CONFIG } from "@/components/map/view";
import Map from "ol/Map";
import View from "ol/View";
import { useEffect, useRef } from "react";

export function MapPane() {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const { setMap } = useMapContext();
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!mapDivRef.current || isInitializedRef.current) return;

    const newMap = new Map({
      target: mapDivRef.current,
      layers: [],
      view: new View(VIEW_CONFIG),
    });

    setMap(newMap);
    isInitializedRef.current = true;

    return () => {
      newMap.setTarget(undefined); //
    };
  }, [setMap]);

  return <div ref={mapDivRef} style={{ width: "100%", height: "100%" }} />;
}
