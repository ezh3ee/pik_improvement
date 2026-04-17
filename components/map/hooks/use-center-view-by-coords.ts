import { useMap } from "@/components/map/hooks/use-map";
import { fromLonLat } from "ol/proj";
import { useCallback } from "react";

export default function useCenterViewByCoords() {
  const { map, isReady } = useMap();

  return useCallback(
    (lon: number, lat: number) => {
      if (!map || !isReady) return;

      map.getView().animate({
        center: fromLonLat([lon, lat]),
        duration: 700,
        zoom: 17,
      });
    },
    [isReady, map],
  );
}
