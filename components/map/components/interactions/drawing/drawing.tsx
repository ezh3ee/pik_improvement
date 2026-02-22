"use client";

import { useMap } from "@/components/map/hooks/use-map";
import Draw from "ol/interaction/Draw";
import Snap from "ol/interaction/Snap.js";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import { useEffect, useRef } from "react";

export default function Drawing() {
  const { map, isReady } = useMap();

  const drawVectorRef = useRef<VectorLayer>(null);
  const snapRef = useRef<Snap>(null);
  const drawRef = useRef<Draw>(null);

  useEffect(() => {
    if (!map || !isReady) return;

    const vectorSource = new VectorSource();

    const drawVector = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: "rgb(0, 89, 255)",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(116, 181, 255, 0.4)",
        }),
      }),
    });

    const snap = new Snap({
      source: vectorSource,
    });

    const draw = new Draw({
      // type: value,
      type: "Polygon",
      // source: drawVector.getSource(),
      // trace: true,
      // traceSource: drawVector.getSource(),
      style: {
        "stroke-color": "rgba(9, 146, 238, 0.5)",
        "stroke-width": 1.5,
        "fill-color": "rgba(0, 27, 180, 0.25)",
        "circle-radius": 6,
        "circle-fill-color": "rgba(179, 11, 165, 0.5)",
      },
    });

    drawVectorRef.current = drawVector;
    snapRef.current = snap;
    drawRef.current = draw;

    map.addInteraction(draw);
    map.addInteraction(snap);

    return () => {
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      drawVectorRef.current = null;
      snapRef.current = null;
    };
  }, [isReady, map]);

  return null;
}
