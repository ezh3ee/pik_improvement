"use client";

import { tileLoadFunction } from "@/components/map/tile-load";
import { VIEW_CONFIG } from "@/components/map/view";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { useEffect, useRef } from "react";

const YANDEX_API_KEY = process.env.NEXT_PUBLIC_YANDEX_TILES_KEY;

if (!YANDEX_API_KEY)
  throw new Error("Missing NEXT_PUBLIC_YANDEX_TILES_KEY in .env");

export default function OLMap() {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapDivRef.current) return;
    if (mapRef.current) return;

    const source = new XYZ({
      url: `/api/yandex/tile?x={x}&y={y}&z={z}`,
      tileLoadFunction: tileLoadFunction,
    });

    mapRef.current = new Map({
      target: mapDivRef.current,
      layers: [
        new TileLayer({
          source,
        }),
      ],
      view: new View(VIEW_CONFIG),
    });

    return () => {};
  }, []);

  return <div ref={mapDivRef} style={{ width: "100%", height: "100%" }} />;
}
