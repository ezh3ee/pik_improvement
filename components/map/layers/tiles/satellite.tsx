"use client";
import Layer from "ol/layer/Layer";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { useEffect, useRef } from "react";

import { useMap } from "@/components/map/hooks/use-map";
import { tileGroup } from "@/components/map/layers/tiles/group/tile-group";
import "@/lib/map/projections";

export function SatteliteLayer() {
  const { map, isReady } = useMap();
  const layerRef = useRef<Layer<XYZ> | null>(null);

  useEffect(() => {
    if (!map || !isReady) return;

    const source = new XYZ({
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      maxZoom: 19,
    });

    const layer = new TileLayer({
      source,
      visible: false,
      zIndex: 0,
      properties: { layerType: "satellite" },
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
