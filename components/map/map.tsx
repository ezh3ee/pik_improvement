"use client";

import ImageTile from "ol/ImageTile";
import Map from "ol/Map";
import TileState from "ol/TileState";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
import { useEffect, useRef } from "react";

const YANDEX_API_KEY = process.env.NEXT_PUBLIC_YANDEX_TILES_KEY;

if (!YANDEX_API_KEY)
  throw new Error("Missing NEXT_PUBLIC_YANDEX_TILES_KEY in .env");

export default function OLMap() {
  console.log("init");
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapDivRef.current) return;
    if (mapRef.current) return;

    const retries: Record<string, number> = {};
    console.log(retries);
    const xhrMap = new WeakMap<ImageTile, XMLHttpRequest>();

    const source = new XYZ({
      // url: `https://tiles.api-maps.yandex.ru/v1/tiles/?x={x}&y={y}&z={z}&lang=ru_RU&l=map&apikey=${YANDEX_API_KEY}`,
      url: `/api/yandex/tile?x={x}&y={y}&z={z}`,
      transition: 0,
      reprojectionErrorThreshold: 0,
      // projection: "EPSG:3395",
      // tileGrid: ol.tilegrid.createXYZ({
      //   extent: [
      //     -20037508.342789244, -20037508.342789244, 20037508.342789244,
      //     20037508.342789244,
      //   ],
      // }),

      tileLoadFunction: async (tile, src) => {
        if (!(tile instanceof ImageTile)) return;

        const prev = xhrMap.get(tile);
        if (prev) prev.abort();

        const xhr = new XMLHttpRequest();
        xhrMap.set(tile, xhr);

        const image = tile.getImage() as HTMLImageElement;
        xhr.responseType = "blob";

        xhr.addEventListener("loadend", function () {
          const data = this.response;
          if (data !== undefined && data !== null) {
            image.src = URL.createObjectURL(data);
          } else {
            tile.setState(TileState.ERROR);
          }
        });

        xhr.onreadystatechange = function () {
          if (
            (xhr.readyState === 4 && xhr.status === 0) ||
            xhr.status === 204
          ) {
            retries[src] = (retries[src] || 0) + 1;
            if (retries[src] <= 10) {
              setTimeout(() => tile.load(), retries[src] * 300);
            }
          }
        };

        xhr.open("GET", src);
        xhr.send();
      },
    });

    mapRef.current = new Map({
      target: mapDivRef.current,
      pixelRatio: 1,
      layers: [
        new TileLayer({
          source,
          preload: 0,
          useInterimTilesOnError: false,
        }),
      ],

      view: new View({
        // center: [8546575.886939, 2137169.681579],
        center: fromLonLat([55.374892, 37.539087]),
        // projection: "EPSG:3395",
        zoom: 10,
        minZoom: 5,
        maxZoom: 20,
        constrainResolution: true,
        zoomFactor: 2,
        smoothResolutionConstraint: false,
        smoothExtentConstraint: false,
      }),
    });

    return () => {};
  }, []);

  return <div ref={mapDivRef} style={{ width: "100%", height: "100%" }} />;
}
