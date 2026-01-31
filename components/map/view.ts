import "@/lib/map/projections";
import { fromLonLat } from "ol/proj";

export const VIEW_CONFIG = {
  // center: convertCoordReverser(55.74952, 37.624773), // vasiliy 55.752447, 37.623168
  center: fromLonLat([37.624773, 55.74952]), // vasiliy 55.752447, 37.623168
  zoom: 19,
  minZoom: 5,
  maxZoom: 20,
  constrainResolution: true,
  enableRotation: false,
  // projection: "EPSG:3395",
  // projection: "EPSG:3857",
};
