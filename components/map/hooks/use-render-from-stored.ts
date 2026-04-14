import { useDrawingStore } from "@/components/map/state/drawing-store";
import { Feature } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { Geometry } from "ol/geom";
import VectorSource from "ol/source/Vector";
import { useCallback } from "react";

export default function useRenderFromStored() {
  const storedFeatures = useDrawingStore((state) => state.storedFeatures);

  return useCallback(
    ({ vectorSource }: { vectorSource: VectorSource<Feature<Geometry>> }) => {
      const format = new GeoJSON();

      if (storedFeatures && storedFeatures.length > 0) {
        storedFeatures.forEach((feature) => {
          const f = format.readFeature(feature) as Feature<Geometry>;
          f.setId(feature.id);
          vectorSource.addFeature(f);
        });

        // const extent = vectorSource.getFeatures()[0].getGeometry()?.getExtent();
        // if (extent) addExtent(extent);
      }
    },
    [storedFeatures],
  );
}
