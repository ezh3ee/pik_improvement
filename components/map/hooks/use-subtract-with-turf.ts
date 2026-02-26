import { difference, featureCollection } from "@turf/turf";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
// import { MultiPolygon, Polygon } from "ol/geom";
import { Feature as GJFeature, MultiPolygon, Polygon } from "geojson";
import Geometry from "ol/geom/Geometry";
import { useCallback } from "react";

export default function useSubtractWithTurf() {
  return useCallback(
    (existingFeature: Feature<Geometry>, fromFeature: Feature<Geometry>) => {
      const format = new GeoJSON();
      const from = format.writeFeatureObject(fromFeature);
      const existing = format.writeFeatureObject(existingFeature);

      if (
        from.geometry.type !== "Polygon" &&
        from.geometry.type !== "MultiPolygon" &&
        existing.geometry.type !== "Polygon" &&
        existing.geometry.type !== "MultiPolygon"
      ) {
        return;
      }

      // if (
      //   !(from instanceof Polygon) ||
      //   !(from instanceof MultiPolygon) ||
      //   !(existing instanceof Polygon) ||
      //   !(existing instanceof MultiPolygon)
      // )
      //   return;

      const result = difference(
        featureCollection([
          from as GJFeature<Polygon | MultiPolygon>,
          existing as GJFeature<Polygon | MultiPolygon>,
        ]),
      );

      if (result) return format.readFeature(result);
    },
    [],
  );
}
