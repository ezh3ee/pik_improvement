import { difference, featureCollection } from "@turf/turf";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON.js";
import { MultiPolygon, Polygon } from "ol/geom";
import Geometry from "ol/geom/Geometry.js";
import { useCallback } from "react";

export default function useSubtractWithTurf() {
  const subtractWithTurf = useCallback(
    (fromFeature: Feature<Geometry>, existingFeature: Feature<Geometry>) => {
      const format = new GeoJSON();
      const from = format.writeFeatureObject(fromFeature);
      const existing = format.writeFeatureObject(existingFeature);

      if (
        !(from instanceof Polygon) ||
        !(from instanceof MultiPolygon) ||
        !(existing instanceof Polygon) ||
        !(existing instanceof MultiPolygon)
      )
        return;

      const result = difference(featureCollection([from, existing]));

      if (result) return format.readFeature(result);
    },
    [],
  );
}
