"use client";
import GeoImage from "ol-ext/source/GeoImage";
import LayerImage from "ol/layer/Image";
import Layer from "ol/layer/Layer";
import ImageSource from "ol/source/Image";

import { pixelProjection } from "@/components/map/components/georeference/map/map-pane";
import { useEffect, useRef } from "react";

/**
 * https://github.com/IGNF-Ma-carte/mcgeoimage/blob/main/src/map/imageMap.js
 * у чела (автора ol-ext и решения с георфефренсом) в коде в GeoImage передается проекция. B в JS это раюотает, а TS - орёт.
 * В его же документации в ol-ext этого нет. Но, я так понимаю, что наследование GeoImage идеот от ImageLayer.
 * Поэтому я пореопределяю тип принимаемых параметров GeoImage.
 */

import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import type { ProjectionLike } from "ol/proj";

declare module "ol-ext/source/GeoImage" {
  interface Options {
    projection?: ProjectionLike;
  }
}

/** */

export default function ImageLayerRef() {
  const map = useGeoreferenceStore((state) => state.map);
  const isReady = useGeoreferenceStore((state) => state.isReady);
  const layerRef = useRef<Layer<ImageSource> | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const imgUrl = useGeoreferenceStore((state) => state.imagePath);

  useEffect(() => {
    if (!map || !isReady || !imgUrl) return;
    layerRef.current = new LayerImage();

    const source = new GeoImage({
      url: imgUrl,
      imageCenter: [0, 0],
      imageScale: [1, 1],
      projection: pixelProjection,
    });

    imageRef.current = source.getGeoImage();
    layerRef.current.setSource(source);

    map.addLayer(layerRef.current);

    return () => {};
  }, [map, isReady, imgUrl]);

  return null;
}
