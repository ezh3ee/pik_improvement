import useCombine from "@/components/map/hooks/use-combine";
import { useMap } from "@/components/map/hooks/use-map";
import { useDrawingStore } from "@/components/map/state/drawing-store";
import { Geometry as GeoJsonGeometry } from "geojson";
import { useCallback } from "react";

export default function useRenderGeometryFromDb() {
  const { map, isReady } = useMap();
  const { convertFromDb } = useCombine();

  const addFeatureToStore = useDrawingStore((state) => state.addFeature);

  return useCallback(
    ({ geojson }: { geojson: GeoJsonGeometry }) => {
      if (!isReady || !geojson || !map) return;

      const collection = convertFromDb(geojson);

      collection.forEach((feature) => {
        addFeatureToStore(feature);
      });
    },
    [map, isReady, addFeatureToStore, convertFromDb],
  );
}
