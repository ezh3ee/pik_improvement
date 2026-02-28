import { ZIndexes } from "@/components/map/components/config/z-indexes";
import { useDrawingStore } from "@/components/map/state/drawing-store";
import DrawHoleTurf from "@/lib/map/draw-hole";
import { Feature, Map } from "ol";
import GeoJSON, { GeoJSONFeature } from "ol/format/GeoJSON";
import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import { useEffect, useRef } from "react";

type UseDrawHoleProps = {
  map: Map | null;
  isReady: boolean;
};

export default function useDrawHole({ map, isReady }: UseDrawHoleProps) {
  const drawVectorRef = useRef<VectorLayer>(null);
  const vectorSourceRef = useRef<VectorSource>(null);

  const storedFeatures = useDrawingStore((state) => state.storedFeatures);
  const updateFeature = useDrawingStore((state) => state.updateFeature);

  useEffect(() => {
    if (!map || !isReady || storedFeatures.length === 0) return;

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

    storedFeatures.forEach((feature) => {
      const f = format.readFeature(feature) as Feature<Geometry>;
      f.setId(feature.id);
      vectorSource.addFeature(f);
    });

    const drawhole = new DrawHoleTurf({
      layers: [drawVector],
      style: [
        new Style({
          stroke: new Stroke({
            color: "rgb(184, 8, 8)",
            width: 3,
          }),
          fill: new Fill({
            color: "rgb(184, 8, 8, 0.3)",
          }),
        }),
      ],
    });

    drawhole.onHoleCut((feature) => {
      const geojson = JSON.parse(
        format.writeFeature(feature),
      ) as GeoJSONFeature;

      updateFeature(geojson);
    });

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        drawhole.removeLastPoint();
      }
    };

    document.addEventListener("keydown", handler);

    drawhole.on("drawabort", drawhole._restoreTargetStyle);

    drawVectorRef.current = drawVector;
    vectorSourceRef.current = vectorSource;

    map.addLayer(drawVector);
    map.addInteraction(drawhole);

    return () => {
      map.removeLayer(drawVector);
      map.removeInteraction(drawhole);
      drawVectorRef.current = null;
      vectorSourceRef.current = null;
      drawhole.un("drawabort", drawhole._restoreTargetStyle);
      document.removeEventListener("keydown", handler);
    };
  }, [isReady, map, storedFeatures, updateFeature]);
}
