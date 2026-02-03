import Map from "ol/Map";
import { create } from "zustand";

type MapStoreType = {
  map: Map | null;
  mapContainer: HTMLElement | null;
  layer: string;
  isReady: boolean;
  setMap: (map: Map) => void;
  setTileLayer: (layer: string) => void;
  setContainer: (container: HTMLElement | null) => void;
};

export const useMapStore = create<MapStoreType>((set) => ({
  map: null,
  mapContainer: null,
  layer: "yandex",
  isReady: false,
  setMap: (map: Map) =>
    set(() => ({
      map: map,
      isReady: true,
    })),
  setTileLayer: (layer: string) => set(() => ({ layer: layer })),
  setContainer: () => set((state) => ({ mapContainer: state.mapContainer })),
}));
