import { useDrawingStore } from "@/components/map/state/drawing-store";
import * as turf from "@turf/turf";
import { Geometry as GeoJsonGeometry } from "geojson";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import { Polygon } from "ol/geom";
import Geometry from "ol/geom/Geometry";
import { useCallback, useMemo } from "react";

export default function useCombine() {
  const storedFeatures = useDrawingStore((state) => state.storedFeatures);
  const format = useMemo(() => new GeoJSON(), []);

  const сonvertToDb = useCallback(() => {
    if (!storedFeatures || storedFeatures.length === 0) return null;

    const features = storedFeatures
      .map((feature) => {
        const f = format.readFeature(feature) as Feature<Geometry>;
        const geometry = f.getGeometry();

        if (!geometry) return null;

        if (geometry instanceof Polygon) {
          const coordinates = geometry.getCoordinates();

          return turf.polygon(coordinates);
        }

        return null;
      })
      .filter((feature) => feature !== null);

    const combined = turf.combine({
      type: "FeatureCollection",
      features: features,
    }).features[0].geometry;

    return JSON.stringify(combined) as unknown as GeoJsonGeometry;
  }, [storedFeatures, format]);

  const сonvertFromDb = useCallback((geojson: GeoJsonGeometry) => {
    const flattened = turf.flatten(geojson);

    console.log(flattened);
  }, []);

  return { сonvertToDb, сonvertFromDb };
}
