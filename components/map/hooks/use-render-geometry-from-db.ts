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

      // const format = new GeoJSON();

      const collection = convertFromDb(geojson);

      collection.forEach((feature) => {
        addFeatureToStore(feature);
      });

      // const vectorLayer = map
      //   .getLayers()
      //   .getArray()
      //   .find((layer) => {
      //     if (
      //       layer instanceof VectorLayer &&
      //       layer.get("name") === "drawing-layer"
      //     ) {
      //       return layer;
      //     }
      //   });

      // if (vectorLayer instanceof VectorLayer && vectorLayer) {
      //   const collection = convertFromDb(geojson as unknown as GeoJsonGeometry);

      //   const vectorSource = vectorLayer.getSource();
      //   collection.forEach((feature) => {
      //     const f = format.readFeature(feature) as Feature<Geometry>;
      //     f.setId(crypto.randomUUID());
      //     vectorSource.addFeature(f);
      //   });

      //   addFeatureToStore({
      //     type: "Feature",
      //     geometry: geojson,
      //     properties: {},
      //   } as GeoJSONFeature);
      // }
    },
    [map, isReady, addFeatureToStore, convertFromDb],
  );
}
