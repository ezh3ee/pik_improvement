import { ZIndexes } from "@/components/map/components/config/z-indexes";
import useDifference from "@/components/map/hooks/use-difference";
import { useDrawingStore } from "@/components/map/state/drawing-store";
import { Feature, Map } from "ol";
import GeoJSON, { GeoJSONFeature } from "ol/format/GeoJSON";
import { Geometry } from "ol/geom";
import Draw, { DrawEvent } from "ol/interaction/Draw";
import Snap from "ol/interaction/Snap";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import { useEffect, useRef } from "react";

type UseDrawingProps = {
  map: Map | null;
  isReady: boolean;
};

export default function useDrawing({ map, isReady }: UseDrawingProps) {
  const drawVectorRef = useRef<VectorLayer>(null);
  const snapRef = useRef<Snap>(null);
  const drawRef = useRef<Draw>(null);
  const vectorSourceRef = useRef<VectorSource>(null);

  const difference = useDifference();

  const addFeatureToStore = useDrawingStore((state) => state.addFeature);
  const storedFeatures = useDrawingStore((state) => state.storedFeatures);

  useEffect(() => {
    if (!map || !isReady) return;

    const vectorSource = new VectorSource();

    const format = new GeoJSON();

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
      zIndex: ZIndexes.Intercations,
    });

    const snap = new Snap({
      source: vectorSource,
    });

    const drawInteraction = new Draw({
      type: "Polygon",
      style: {
        "stroke-color": "rgba(9, 146, 238, 0.5)",
        "stroke-width": 1.5,
        "fill-color": "rgba(0, 27, 180, 0.25)",
        "circle-radius": 6,
        "circle-fill-color": "rgba(179, 11, 165, 0.5)",
      },
    });

    if (storedFeatures) {
      storedFeatures.forEach((feature) => {
        const f = format.readFeature(feature) as Feature<Geometry>;
        f.setId(feature.id);
        vectorSource.addFeature(f);
      });
    }

    const drawEndHandler = (event: DrawEvent) => {
      const justDrawnFeature = difference(
        event,
        drawVector,
      ) as Feature<Geometry>;
      if (!justDrawnFeature) return;
      justDrawnFeature.setId(crypto.randomUUID());
      vectorSource.addFeature(justDrawnFeature);

      const geojson = JSON.parse(
        format.writeFeature(justDrawnFeature),
      ) as GeoJSONFeature;

      addFeatureToStore(geojson);
    };

    drawInteraction.on("drawend", drawEndHandler);

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        drawInteraction.removeLastPoint();
      }
    };

    document.addEventListener("keydown", handler);

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
      drawRef.current = null;
      vectorSourceRef.current = null;
      drawInteraction.un("drawend", drawEndHandler);
      document.removeEventListener("keydown", handler);
    };
  }, [isReady, map, difference, storedFeatures, addFeatureToStore]);

  return null;
}
