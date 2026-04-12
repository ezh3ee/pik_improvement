import { ZIndexes } from "@/components/map/components/config/z-indexes";
import useDifference from "@/components/map/hooks/use-difference";
import useRenderFromStored from "@/components/map/hooks/use-render-from-stored";
import { useDrawingStore } from "@/components/map/state/drawing-store";
import { Map } from "ol";
import Draw from "ol/interaction/Draw";
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
  const renderFromStored = useRenderFromStored();

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
      zIndex: ZIndexes.Intercations,
    });

    renderFromStored({ vectorSource });

    drawVectorRef.current = drawVector;
    vectorSourceRef.current = vectorSource;

    map.addLayer(drawVector);

    return () => {
      map.removeLayer(drawVector);
      drawVectorRef.current = null;
      snapRef.current = null;
      drawRef.current = null;
      vectorSourceRef.current = null;
    };
  }, [
    isReady,
    map,
    difference,
    storedFeatures,
    addFeatureToStore,
    renderFromStored,
  ]);

  return null;
}
