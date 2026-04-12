import { useMap } from "@/components/map/hooks/use-map";
import useViewing from "@/components/map/hooks/use-viewing";

export default function Viewing() {
  const { map, isReady } = useMap();
  useViewing({ map, isReady });
  return null;
}
