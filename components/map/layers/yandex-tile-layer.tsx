"use client";
import { useMap } from "@/components/map/hooks/use-map";
import { tileLoadFunction } from "@/components/map/tile-load";
import Layer from "ol/layer/Layer";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { useEffect, useRef } from "react";

const source = new XYZ({
  url: `/api/yandex/tile?x={x}&y={y}&z={z}`,
  tileLoadFunction: tileLoadFunction,
});

export function YandexTileLayer() {
  const { map, isReady } = useMap();
  const layerRef = useRef<Layer<XYZ> | null>(null);

  useEffect(() => {
    if (!map || !isReady) return;

    const layer = new TileLayer({
      source,
      zIndex: 0,
    });

    layerRef.current = layer;
    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, isReady]);
  return null;
}
