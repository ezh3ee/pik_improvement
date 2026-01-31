"use client";

import { useMapContext } from "@/components/map/providers/map-provider";

export function useMap() {
  const { map, isReady } = useMapContext();
  return { map, isReady };
}
