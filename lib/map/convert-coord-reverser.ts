import "@/lib/map/projections";
import { Coordinate } from "ol/coordinate";
import { fromLonLat } from "ol/proj";

export function convertCoordReverser(lat: number, lon: number): Coordinate {
  return fromLonLat([lon, lat], "EPSG:3395");
  // return fromLonLat([lon, lat]);
}
