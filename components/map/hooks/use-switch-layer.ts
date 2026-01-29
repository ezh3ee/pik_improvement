import { useMap } from "@/components/map/hooks/use-map";
import { useCallback } from "react";

export function useBaseLayer(layer: string) {
  const { map } = useMap();

  const setBaseLayer = useCallback(
    (currentLayer: string) => {
      if (!map) return;

      map.getLayers().forEach((layer) => {
        console.log("layer loop ", layer);
        if (layer.get("layerType") === currentLayer) {
          layer.setVisible(true);
          console.log("layer is visible ", layer);
        } else {
          layer.setVisible(false);
          console.log("layer is not visible ", layer);
        }
      });
    },
    [map],
  );

  return { setBaseLayer };
}
