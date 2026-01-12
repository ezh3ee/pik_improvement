import { convertCoordReverser } from "@/lib/map/convert-coord-reverser";
import "@/lib/map/yandex-projections";

export const VIEW_CONFIG = {
  // center: fromLonLat([37.617635, 55.755814], "EPSG:3395"), // kremlin 55.755814, 37.617635
  // center: fromLonLat([37.623168, 55.752447], "EPSG:3395"), // vasiliy 55.752447, 37.623168
  center: convertCoordReverser(55.74952, 37.624773), // vasiliy 55.752447, 37.623168
  zoom: 20,
  minZoom: 5,
  maxZoom: 21,
  constrainResolution: true,
};
