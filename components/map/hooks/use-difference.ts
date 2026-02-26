import useSubtractWithTurf from "@/components/map/hooks/use-subtract-with-turf";
import { difference, featureCollection, union } from "@turf/turf";
import { Feature, MultiPolygon, Polygon } from "geojson";
import GeoJSON from "ol/format/GeoJSON";
import { DrawEvent } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import { useCallback } from "react";

export default function useDifference() {
  const subtractWithTurf = useSubtractWithTurf();

  return useCallback(
    (
      event: DrawEvent,
      vectorLayer: VectorLayer,
      subtractCheckboxActive: boolean,
    ) => {
      const justDrawnFeature = event.feature;

      if (!subtractCheckboxActive) {
        return justDrawnFeature;
      }

      const existingFeatures = vectorLayer.getSource()?.getFeatures();

      if (!existingFeatures) {
        return justDrawnFeature;
      }

      if (existingFeatures.length <= 1) {
        if (existingFeatures.length === 1) {
          const subtractedFeature = subtractWithTurf(
            existingFeatures[0],
            justDrawnFeature,
          );

          if (subtractedFeature) {
            return subtractedFeature;
          }
        } else {
          return justDrawnFeature;
        }
      } else {
        const format = new GeoJSON();
        let unionedFeature = format.writeFeatureObject(
          existingFeatures[0],
        ) as Feature<Polygon | MultiPolygon>;

        for (let i = 0; i < existingFeatures.length; i++) {
          const featureJSON = format.writeFeatureObject(
            existingFeatures[i],
          ) as Feature<Polygon | MultiPolygon>;

          if (
            unionedFeature.geometry.type !== "Polygon" &&
            unionedFeature.geometry.type !== "MultiPolygon" &&
            featureJSON.geometry.type !== "Polygon" &&
            featureJSON.geometry.type !== "MultiPolygon"
          ) {
            return justDrawnFeature;
          }

          unionedFeature = union(
            featureCollection([unionedFeature, featureJSON]),
          ) as Feature<Polygon | MultiPolygon>;
        }

        if (!unionedFeature) {
          return justDrawnFeature;
        }

        const result = difference(
          featureCollection([
            format.writeFeatureObject(justDrawnFeature) as Feature<
              Polygon | MultiPolygon
            >,
            unionedFeature,
          ]),
        );

        if (result) {
          return format.readFeature(result);
        }
      }
    },
    [subtractWithTurf],
  );
}
