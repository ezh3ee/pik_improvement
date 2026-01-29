"use client";
import { useMap } from "@/components/map/hooks/use-map";
import { tileGroup } from "@/components/map/layers/tiles/group/tile-group";
import Layer from "ol/layer/Layer";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { useEffect, useRef } from "react";
import { tileLoadFunction } from "../../tile-load-retry";

// const resolutions = [];
// const size = (20037508.342789244 * 2) / 256;
// for (let i = 0; i < 21; i++) {
//   resolutions.push(size / Math.pow(2, i));
// }

// const yandexTileGrid = new TileGrid({
//   extent: extent,
//   resolutions: resolutions,
//   origin: [-20037508.342789244, 20037508.342789244],
//   tileSize: 256,
// });

export function YandexTileLayer() {
  const { map, isReady } = useMap();
  const layerRef = useRef<Layer<XYZ> | null>(null);

  useEffect(() => {
    if (!map || !isReady) return;

    const source = new XYZ({
      url: `/api/yandex/tile?x={x}&y={y}&z={z}`,
      // url: `https://tiles.api-maps.yandex.ru/v1/tiles/?x={x}&y={y}&z={z}&lang=ru_RU&scale=2&l=map&apikey=${process.env.NEXT_PUBLIC_YANDEX_TILES_KEY}`,
      tileLoadFunction: tileLoadFunction,
      projection: "EPSG:3395",
      // tileGrid: yandexTileGrid,
    });

    const layer = new TileLayer({
      source,
      zIndex: 0,
      properties: { layerType: "yandex" },
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
