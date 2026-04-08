import { Geometry as GeoJsonGeometry } from "geojson";
import { useCallback } from "react";

export function useClearFormFields() {
  return useCallback(
    (values: Record<string, string | number | boolean | GeoJsonGeometry>) => {
      Object.keys(values).forEach((key) => {
        values[key as keyof typeof values] = "";
      });

      return values;
    },
    [],
  );
}
