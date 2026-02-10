"use client";
import {
  blackCrossStyle,
  redCrossStyle,
} from "@/components/map/common/cross-style";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import SimpleGeometry from "ol/geom/SimpleGeometry";
import Draw from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useEffect } from "react";

export default function ControlPoints() {
  const map = useGeoreferenceStore((state) => state.map);
  const isReady = useGeoreferenceStore((state) => state.isReady);

  useEffect(() => {
    if (!map || !isReady) return;

    const source = new VectorSource();

    const vLayer = new VectorLayer({
      source: source,
      style: redCrossStyle,
    });

    vLayer.setMap(map);

    const draw = new Draw({
      type: "Point",
      source: source,
      style: blackCrossStyle,
    });
    map.addInteraction(draw);
    draw.set("source", vLayer.getSource());

    source.on("addfeature", (e) => {
      // console.log(e.feature.getGeometry()?.getCoordinates());

      const geometry = e.feature?.getGeometry();

      if (geometry instanceof SimpleGeometry) {
        const coordinates = geometry.getCoordinates();
        console.log(coordinates);
        // Use coordinates here
      }

      // const f = lastPt = e.feature
      // f.on('delete', () => {
      //   vector.getSource().removeFeature(f)
      // })
      // if (!f.get('control')) {
      //   map.dispatchEvent({
      //     type: 'addControlPoint',
      //     feature: e.feature
      //   })
      // }
    });

    // map.on("singleclick", (e) => {
    //   const point = new Point([e.coordinate[0], e.coordinate[1]]);

    //   const layer = new VectorLayer({
    //     // тестовая точкв
    //     source: new VectorSource({
    //       features: [new Feature(point)],
    //     }),
    //     style: {
    //       "circle-radius": 9,
    //       "circle-fill-color": "red",
    //     },
    //     properties: { name: "point" },
    //   });

    //   console.log(layer);

    //   map.addLayer(layer);

    //   //   console.log(e.coordinate[0] + 1553 / 2, e.coordinate[1] + 900 / 2); // точки картинки нужны для конверта
    // });

    return () => {};
  }, [map, isReady]);
  return null;
}
