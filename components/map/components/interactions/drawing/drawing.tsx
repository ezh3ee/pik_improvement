"use client";

import useDrawing from "@/components/map/hooks/use-drawing";
import { useMap } from "@/components/map/hooks/use-map";

export default function Drawing() {
  const { map, isReady } = useMap();
  useDrawing({ map, isReady });
  return null;
}
