"use client";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { useEffect, useRef } from "react";

export default function OLMap() {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapDivRef.current) return;
    if (mapRef.current) return;

    console.log(process.env.NEXT_PUBLIC_YANDEX_TILES_KEY);

    mapRef.current = new Map({
      target: mapDivRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://tiles.api-maps.yandex.ru/v1/tiles/?x={x}&y={y}&z={z}&lang=ru_RU&l=map&apikey=8c98e0f0-0a7e-4c0e-bdbc-3c3447909f9d`,
            attributions: "© Yandex",
            transition: 0,
            reprojectionErrorThreshold: 0,
          }),
          preload: 0,
        }),
      ],

      view: new View({
        center: [8546575.886939, 2137169.681579],
        zoom: 10,
        minZoom: 5,
        maxZoom: 18,
        constrainResolution: true,
      }),
    });

    return () => {};
  }, []);

  return <div ref={mapDivRef} style={{ width: "100%", height: "100%" }} />;
}

// new TileLayer({
//           source: new XYZ({
//             url: `https://tiles.api-maps.yandex.ru/v1/tiles/?x={x}&y={y}&z={z}&lang=ru_RU&l=map&apikey=8c98e0f0-0a7e-4c0e-bdbc-3c3447909f9d`,
//             attributions: "© Yandex",
//           }),
//         }),
