import { ZIndexes } from "@/components/map/components/config/z-indexes";
import { useDrawingStore } from "@/components/map/state/drawing-store";
import { Feature, Map } from "ol";
import { singleClick } from "ol/events/condition";
import GeoJSON, { GeoJSONFeature } from "ol/format/GeoJSON";
import { Geometry, MultiPoint, SimpleGeometry } from "ol/geom";
import { Select, Snap } from "ol/interaction";
import Modify, { ModifyEvent } from "ol/interaction/Modify";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { useEffect, useRef } from "react";

type UseDrawingProps = {
  map: Map | null;
  isReady: boolean;
};

export default function useModifying({ map, isReady }: UseDrawingProps) {
  const drawVectorRef = useRef<VectorLayer>(null);
  const snapRef = useRef<Snap>(null);
  const vectorSourceRef = useRef<VectorSource>(null);
  const modifyRef = useRef<Modify>(null);
  const selectRef = useRef<Select>(null);

  const storedFeatures = useDrawingStore((state) => state.storedFeatures);
  const updateFeature = useDrawingStore((state) => state.updateFeature);

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

    const sClick = new Select({
      layers: [drawVector],
      style: function (feature) {
        const layerStyleFunction = drawVector.getStyleFunction();

        if (layerStyleFunction) {
          const originalStyles = layerStyleFunction(
            feature,
            map.getView().getResolution() as number,
          ) as Style[];

          return [
            ...originalStyles,
            new Style({
              stroke: new Stroke({
                color: "rgb(0, 0, 0)",
                width: 5,
              }),
            }),
            new Style({
              image: new CircleStyle({
                radius: 5,
                fill: new Fill({
                  color: "rgb(216, 11, 11)",
                  // color: "orange",
                }),
              }),
              geometry: function (feature) {
                const geometry = feature.getGeometry() as Geometry;

                if (geometry instanceof SimpleGeometry) {
                  const coordinates = geometry.getCoordinates()?.[0];
                  return new MultiPoint(coordinates);
                }
              },
            }),
          ];
        }
      },
      condition: function (mapBrowserEvent) {
        // if (
        //   mapBrowserEvent.type !== "pointermove" &&
        //   mapBrowserEvent.type !== "pointerdrag"
        // ) {
        //   console.log(mapBrowserEvent);
        //   console.log(
        //     "should click be blocked? ",
        //     Date.now() - lastModifyEnd < 400,
        //   );
        // }
        // if (Date.now() - lastModifyEnd < 400) {
        //   return false;
        // }
        // if (
        //   mapBrowserEvent.type !== "pointermove" &&
        //   mapBrowserEvent.type !== "pointerdrag"
        // ) {
        //   console.log("anyway click", mapBrowserEvent);
        // }
        return singleClick(mapBrowserEvent);
      },
    });

    const modifyInteraction = new Modify({
      features: sClick.getFeatures(),
      // trace: true,
      // traceSource: baseVector.getSource(),
    });

    storedFeatures.forEach((feature) => {
      const f = format.readFeature(feature) as Feature<Geometry>;
      f.setId(feature.id);
      vectorSource.addFeature(f);
    });

    const modifyHandler = (event: ModifyEvent) => {
      const feature = event.features?.item(0);

      const geojson = JSON.parse(
        format.writeFeature(feature),
      ) as GeoJSONFeature;

      updateFeature(geojson);
    };

    modifyInteraction.on("modifyend", modifyHandler);

    drawVectorRef.current = drawVector;
    snapRef.current = snap;
    vectorSourceRef.current = vectorSource;
    modifyRef.current = modifyInteraction;
    selectRef.current = sClick;

    map.addInteraction(sClick);
    map.addInteraction(modifyInteraction);
    map.addInteraction(snap);
    map.addLayer(drawVector);

    return () => {
      map.removeInteraction(sClick);
      map.removeInteraction(modifyInteraction);
      map.removeInteraction(snap);
      map.removeLayer(drawVector);
      drawVectorRef.current = null;
      snapRef.current = null;
      vectorSourceRef.current = null;
      modifyRef.current = null;
      selectRef.current = null;
    };
  }, [isReady, map, updateFeature]); // не добавил специально storedFeatures.
  //  Потом это все будет переделываться.
  //  Пока специально так,
  // чтобы не пропадало выделение с фичи после модификации

  return null;
}
