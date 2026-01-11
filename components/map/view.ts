import { fromLonLat } from "ol/proj";

export const VIEW_CONFIG = {
  // center: [8546575.886939, 2137169.681579],
  center: fromLonLat([55.374892, 37.539087]),
  // projection: "EPSG:3395",
  zoom: 10,
  minZoom: 5,
  maxZoom: 20,
  constrainResolution: true,
  // zoomFactor: 2,
  // smoothResolutionConstraint: false,
  // smoothExtentConstraint: false,
};
