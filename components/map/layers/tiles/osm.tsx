"use client";
import { useMap } from "@/components/map/hooks/use-map";
import Layer from "ol/layer/Layer";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { useEffect, useRef } from "react";

import { tileGroup } from "@/components/map/layers/tiles/tile-group";
import "@/lib/map/projections";
import { OSM } from "ol/source";

export function OSMTileLayer() {
  const { map, isReady } = useMap();
  const layerRef = useRef<Layer<XYZ> | null>(null);

  useEffect(() => {
    if (!map || !isReady) return;

    const layer = new TileLayer({
      source: new OSM({
        attributions: "Open Street Map Топография © OpenStreetMap.org",
      }),
      zIndex: 0,
      properties: { layerType: "osm" },
      visible: false,
    });

    layerRef.current = layer;
    // map.addLayer(layer);
    tileGroup.getLayers().push(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, isReady]);
  return null;
}
