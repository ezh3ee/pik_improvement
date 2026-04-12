import { ZIndexes } from "@/components/map/components/config/z-indexes";
import useRenderFromStored from "@/components/map/hooks/use-render-from-stored";
import { useDrawingStore } from "@/components/map/state/drawing-store";
import DrawHoleTurf from "@/lib/map/draw-hole";
import { Map } from "ol";
import { pointerMove } from "ol/events/condition";
import GeoJSON, { GeoJSONFeature } from "ol/format/GeoJSON";
import { DrawEvent } from "ol/interaction/Draw";
import Select from "ol/interaction/Select";
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

  const renderFromStored = useRenderFromStored();

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

    // storedFeatures.forEach((feature) => {
    //   const f = format.readFeature(feature) as Feature<Geometry>;
    //   f.setId(feature.id);
    //   vectorSource.addFeature(f);
    // });
    renderFromStored({ vectorSource });

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

    const hover = new Select({
      condition: pointerMove,
      layers: [drawVector],
      style: new Style({
        stroke: new Stroke({
          color: "rgba(202, 54, 54, 0.5)",
          width: 3,
        }),
        fill: new Fill({
          color: "rgba(202, 54, 54, 0.5)",
        }),
      }),
    });

    const drawStartHandler = (event: DrawEvent) => {
      hover.getFeatures().clear();
      // map.removeInteraction(hover);
      hover.setActive(false);
      console.log("target style after removal: ", event.feature);
    };

    drawhole.on("drawstart", drawStartHandler);

    drawhole.onHoleCut((feature) => {
      const geojson = JSON.parse(
        format.writeFeature(feature),
      ) as GeoJSONFeature;

      updateFeature(geojson);
      // map.addInteraction(hover);
      hover.setActive(true);
    });

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        drawhole.removeLastPoint();
      }
    };

    document.addEventListener("keydown", handler);

    const drawAbortHandler = () => {
      drawhole._restoreTargetStyle();
      // map.addInteraction(hover);
      hover.setActive(true);
    };

    drawhole.on("drawabort", drawAbortHandler);

    drawVectorRef.current = drawVector;
    vectorSourceRef.current = vectorSource;

    map.addLayer(drawVector);
    map.addInteraction(hover);
    map.addInteraction(drawhole);

    return () => {
      map.removeLayer(drawVector);
      map.removeInteraction(drawhole);
      map.removeInteraction(hover);
      drawVectorRef.current = null;
      vectorSourceRef.current = null;
      drawhole.un("drawabort", drawAbortHandler);
      drawhole.un("drawstart", drawStartHandler);
      document.removeEventListener("keydown", handler);
    };
  }, [isReady, map, storedFeatures, updateFeature]);

  // useEffect(() => {
  //   if (!map || !isReady) return;

  //   const hover = new Select({
  //     condition: pointerMove,
  //     style: new Style({
  //       stroke: new Stroke({
  //         color: "rgba(202, 54, 54, 0.5)",
  //         width: 3,
  //       }),
  //       fill: new Fill({
  //         color: "rgba(202, 54, 54, 0.5)",
  //       }),
  //     }),
  //   });

  //   if (!isHoverDisabled) {
  //     map.addInteraction(hover);
  //   }

  //   return () => {
  //     map.removeInteraction(hover);
  //   };
  // }, [isReady, map, isHoverDisabled]);
}
