import useDrawHole from "@/components/map/hooks/use-draw-hole";
import { useMap } from "@/components/map/hooks/use-map";

export default function DrawingHole() {
  const { map, isReady } = useMap();
  useDrawHole({ map, isReady });
  return null;
}
