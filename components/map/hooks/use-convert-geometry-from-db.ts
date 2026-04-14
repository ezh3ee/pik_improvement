import useCombine from "@/components/map/hooks/use-combine";
import { useMap } from "@/components/map/hooks/use-map";
import { useDrawingStore } from "@/components/map/state/drawing-store";
import { bbox } from "@turf/turf";
import { Geometry as GeoJsonGeometry } from "geojson";
import { useCallback } from "react";

export default function useConvertGeometryFromDb() {
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

      const bboxExtent = bbox(geojson);
      if (!bboxExtent) return;
      return bboxExtent;
    },
    [map, isReady, addFeatureToStore, convertFromDb],
  );
}
