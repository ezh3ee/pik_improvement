"use client";

import { tileGroup } from "@/components/map/layers/tiles/group/tile-group";
import { useMapStore } from "@/components/map/state/map-store";
import { VIEW_CONFIG } from "@/components/map/view";
import { defaults as defaultControls, FullScreen } from "ol/control";
import Map from "ol/Map";
import "ol/ol.css";
import View from "ol/View";
import { useEffect, useRef } from "react";

export function MapPane() {
  const mapDivRef = useRef<HTMLDivElement>(null);
  // const { setMap, setContainer } = useMapContext();
  const setMap = useMapStore((state) => state.setMap);
  const setContainer = useMapStore((state) => state.setContainer);
  // const map = useMapStore((state) => state.map);

  useEffect(() => {
    if (!mapDivRef.current) return;

    const newMap = new Map({
      target: mapDivRef.current,
      layers: [],
      view: new View(VIEW_CONFIG),
      controls: defaultControls().extend([
        new FullScreen({
          source: "fullscreen",
        }),
      ]),
    });

    setMap(newMap);
    setContainer(mapDivRef.current);

    newMap.addLayer(tileGroup);

    return () => {
      newMap.setTarget(undefined); //
    };
  }, [setMap, setContainer]);

  return <div ref={mapDivRef} style={{ width: "100%", height: "100%" }} />;
}
