"use client";
import { useMap } from "@/components/map/hooks/use-map";
import { tileGroup } from "@/components/map/layers/tiles/group/tile-group";
import { Extent, getTopLeft, getWidth } from "ol/extent";
import Layer from "ol/layer/Layer";
import TileLayer from "ol/layer/Tile";
import { get as getProjection } from "ol/proj";
import XYZ from "ol/source/XYZ";
import { TileGrid } from "ol/tilegrid";
import { useEffect, useRef } from "react";

const proj = getProjection("EPSG:3857");
const extent = proj?.getExtent() as Extent;

const resolutions: number[] = [];
for (let z = 0; z <= 21; z++) {
  resolutions[z] = getWidth(extent) / (256 * Math.pow(2, z));
}

export function CadasterTileLayer() {
  const { map, isReady } = useMap();
  const layerRef = useRef<Layer<XYZ> | null>(null);
  console.log("cadaster");
  useEffect(() => {
    if (!map || !isReady) return;

    const source = new XYZ({
      url: "https://api.roscadastres.com/tiles/raster/{z}/{x}/{y}.png",
      tileGrid: new TileGrid({
        origin: getTopLeft(extent),
        resolutions: resolutions,
        tileSize: 1024,
      }),
    });

    const layer = new TileLayer({
      source,
      zIndex: 1,
      properties: { layerType: "cadaster" },
      visible: false,
      minZoom: 14,
    });

    layerRef.current = layer;
    tileGroup.getLayers().push(layer);

    return () => {
      map.removeLayer(layer);
      layerRef.current = null;
    };
  }, [map, isReady]);
  return null;
}
