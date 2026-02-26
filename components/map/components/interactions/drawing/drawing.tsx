"use client";

import useDifference from "@/components/map/hooks/use-difference";
import { useMap } from "@/components/map/hooks/use-map";
import Feature from "ol/Feature";
import { Geometry } from "ol/geom";
import Draw from "ol/interaction/Draw";
import Snap from "ol/interaction/Snap.js";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import { useEffect, useRef } from "react";

// const drawIntercation = (e: DrawEvent) => {
//   const currentFeature = e.feature;
//   vectorSource.addFeature(justDrawnFeature);
// };

export default function Drawing() {
  const { map, isReady } = useMap();

  const drawVectorRef = useRef<VectorLayer>(null);
  const snapRef = useRef<Snap>(null);
  const drawRef = useRef<Draw>(null);
  const vectorSourceRef = useRef<VectorSource>(null);

  const difference = useDifference();

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

    const drawInteraction = new Draw({
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

    drawInteraction.on("drawend", (event) => {
      const justDrawnFeature = difference(event, drawVector, true);
      if (!justDrawnFeature) return;
      vectorSource.addFeature(justDrawnFeature as Feature<Geometry>);
    });

    drawVectorRef.current = drawVector;
    snapRef.current = snap;
    drawRef.current = drawInteraction;
    vectorSourceRef.current = vectorSource;

    map.addInteraction(drawInteraction);
    map.addInteraction(snap);
    map.addLayer(drawVector);

    return () => {
      map.removeInteraction(drawInteraction);
      map.removeInteraction(snap);
      map.removeLayer(drawVector);
      drawVectorRef.current = null;
      snapRef.current = null;
    };
  }, [isReady, map, difference]);

  // useEffect(() => {
  //   const drawVector = drawVectorRef.current;
  // }, []);

  return null;
}
