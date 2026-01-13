import { get as getProjection } from "ol/proj";
import { register } from "ol/proj/proj4";
import proj4 from "proj4";

proj4.defs(
  "EPSG:3395",
  "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs"
);

register(proj4);

export const yandexProjection = getProjection("EPSG:3395");

yandexProjection?.setExtent([
  -20037508.342789244, -20037508.342789244, 20037508.342789244,
  20037508.342789244,
]);
