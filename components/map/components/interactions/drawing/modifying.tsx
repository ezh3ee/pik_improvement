import { useMap } from "@/components/map/hooks/use-map";
import useModifying from "@/components/map/hooks/use-modifying";

export default function Modifying() {
  const { map, isReady } = useMap();
  useModifying({ map, isReady });
  return null;
}
