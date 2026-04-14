import { useMap } from "@/components/map/hooks/use-map";
import { easeInOut } from "motion/react";
import VectorLayer from "ol/layer/Vector";
import { useCallback } from "react";

export default function useFitView() {
  const { map, isReady } = useMap();

  return useCallback(() => {
    if (!map || !isReady) return;

    map.getLayers().forEach((layer) => {
      if (layer instanceof VectorLayer) {
        const extent = layer
          .getSource()
          .getFeatures()[0]
          .getGeometry()
          .getExtent();

        if (!extent) return;

        map.getView().fit(extent, {
          duration: 700,
          padding: [3, 3, 3, 3],
          easing: easeInOut,
        });
      }
    });
  }, [isReady, map]);
}
