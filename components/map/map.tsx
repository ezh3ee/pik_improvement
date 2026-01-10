"use client";

import ImageTile from "ol/ImageTile";
import Map from "ol/Map";
import View from "ol/View";
import { intersects } from "ol/extent";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
import { useEffect, useRef } from "react";

const YANDEX_API_KEY = process.env.NEXT_PUBLIC_YANDEX_TILES_KEY;

if (!YANDEX_API_KEY) {
  throw new Error("Missing NEXT_PUBLIC_YANDEX_TILES_KEY in .env");
}

export default function OLMap() {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapDivRef.current) return;
    if (mapRef.current) return;

    function killImage(image: HTMLImageElement) {
      console.log("killing image ", image);
      image.onload = null;
      image.onerror = null;
      image.src = "";
    }

    const source = new XYZ({
      url: `https://tiles.api-maps.yandex.ru/v1/tiles/?x={x}&y={y}&z={z}&lang=ru_RU&l=map&apikey=${YANDEX_API_KEY}`,
      transition: 0,
      reprojectionErrorThreshold: 0,
      // projection: "EPSG:3395",
      // tileGrid: ol.tilegrid.createXYZ({
      //   extent: [
      //     -20037508.342789244, -20037508.342789244, 20037508.342789244,
      //     20037508.342789244,
      //   ],
      // }),

      tileLoadFunction: async (imageTile, src) => {
        if (!(imageTile instanceof ImageTile)) return;
        const image = imageTile.getImage() as HTMLImageElement;

        const map = mapRef.current;
        if (!map) return;

        const size = map.getSize();
        if (!size) return;

        const view = map.getView();
        const viewExtent = view.calculateExtent(size);

        const tileGrid = source.getTileGrid();
        const tileCoord = imageTile.getTileCoord();
        if (!tileCoord || !tileGrid) return;

        const tileExtent = tileGrid.getTileCoordExtent(tileCoord);

        if (blockTiles) {
          console.log("blockTiles working....");
          image.src = "";
          return;
        }

        if (!intersects(viewExtent, tileExtent)) {
          console.log("!intersects");
          killImage(image);
          return;
        }

        // await tilesDelay();
        image.src = src;
      },
    });

    mapRef.current = new Map({
      target: mapDivRef.current,
      maxTilesLoading: 2,
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

      // interactions: defaultInteractions({
      //   mouseWheelZoom: true,
      // }).extend([
      //   new MouseWheelZoom({
      //     duration: 0, // Animation duration
      //     timeout: 100, // Delay before zooming
      //     constrainResolution: true, // Snap to tile levels
      //     maxDelta: 1,
      //   }),
      // ]),
    });

    // const view = mapRef.current.getView();

    // view.on("change:resolution", () => {
    //   console.log("RESOLUTION CHANGE", view.getZoom());
    // });

    mapRef.current.getView().setHint("animating", 0);
    mapRef.current.getView().setHint("interacting", 0);

    let blockTiles = false;

    mapRef.current.on("movestart", () => {
      blockTiles = true;
    });

    mapRef.current.on("moveend", () => {
      blockTiles = false;
      source.refresh();
    });

    return () => {};
  }, []);

  return <div ref={mapDivRef} style={{ width: "100%", height: "100%" }} />;
}

const tilesDelay = async () => {
  return new Promise((resolve) => setTimeout(resolve, 10));
};
