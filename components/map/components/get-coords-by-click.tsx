"use client";
import { useMap } from "@/components/map/hooks/use-map";
import { toLonLat } from "ol/proj";

export default function GetCoordsByClick() {
  const { map } = useMap();

  if (!map) return;

  map.on("singleclick", (event) => {
    if (!event.coordinate) return;
    const coords = toLonLat(event.coordinate, "EPSG:3395");
    // navigator.clipboard.writeText(`${coords[1]}, ${coords[0]}`);
    alert(coords[1] + " " + coords[0]);
  });

  return null;
}
