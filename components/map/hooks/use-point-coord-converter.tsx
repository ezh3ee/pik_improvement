import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { useCallback } from "react";

export default function usePointCoordConverter() {
  const imageDimensions = useGeoreferenceStore(
    (state) => state.imageDimensions,
  );

  return useCallback(
    (coords: number[]): number[] => {
      return [
        coords[0] + imageDimensions.width / 2,
        coords[1] + imageDimensions.width / 2,
      ];
    },
    [imageDimensions],
  );
}
