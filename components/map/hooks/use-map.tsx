"use client";

import { useMapStore } from "@/components/map/state/map-store";

export function useMap() {
  // const { map, isReady } = useMapContext();
  const map = useMapStore((state) => state.map);
  const isReady = useMapStore((state) => state.isReady);
  return { map, isReady };
}
