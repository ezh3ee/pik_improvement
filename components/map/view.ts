import { convertCoordReverser } from "@/lib/map/convert-coord-reverser";
import "@/lib/map/yandex-projections";

export const VIEW_CONFIG = {
  center: convertCoordReverser(55.74952, 37.624773), // vasiliy 55.752447, 37.623168
  zoom: 20,
  minZoom: 5,
  maxZoom: 20,
  constrainResolution: true,
  enableRotation: false,
};
