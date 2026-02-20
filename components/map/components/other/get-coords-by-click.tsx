"use client";
import { useMap } from "@/components/map/hooks/use-map";
import Point from "ol/geom/Point";
import BaseLayer from "ol/layer/Base";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat, toLonLat } from "ol/proj";

export default function GetCoordsByClick() {
  const { map } = useMap();

  if (!map) return;

  map.on("singleclick", (event) => {
    if (!event.coordinate) return;
    const coords = toLonLat(event.coordinate);

    map.getLayers().forEach((layer: BaseLayer | VectorLayer) => {
      if (layer.get("name") === "point") {
        if (layer instanceof VectorLayer) {
          const features = layer.getSource().getFeatures();
          const point = features[0].getGeometry();
          if (point instanceof Point) {
            point.setCoordinates(fromLonLat(coords));
            layer.getSource().changed();
          }
        }
      }
    });

    // alert(coords[1] + " " + coords[0]);
  });

  return null;
}
