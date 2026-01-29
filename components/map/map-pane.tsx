"use client";

import { tileGroup } from "@/components/map/layers/tiles/group/tile-group";
import { useMapContext } from "@/components/map/providers/map-provider";
import { VIEW_CONFIG } from "@/components/map/view";
import { defaults as defaultControls, FullScreen } from "ol/control";
import Map from "ol/Map";
import "ol/ol.css";
import View from "ol/View";
import { useEffect, useRef } from "react";

export function MapPane() {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const { setMap } = useMapContext();

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

    newMap.addLayer(tileGroup);

    return () => {
      newMap.setTarget(undefined); //
    };
  }, [setMap]);

  return <div ref={mapDivRef} style={{ width: "100%", height: "100%" }} />;
}
