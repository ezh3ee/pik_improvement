import { create } from "zustand";
import { persist } from "zustand/middleware";

import Map from "ol/Map";

type GeoreferenceStore = {
  isVisible: boolean;
  imagePath: string | null;
  toggleVisible: () => void;
  setImagePath: (path: { url: string | null }) => void;
  resetImagePath: () => void;
  /* MAP INSTANCE */
  map: Map | null;
  mapContainer: HTMLElement | null;
  isReady: boolean;
  setMap: (map: Map) => void;
  setContainer: (container: HTMLElement | null) => void;
};

export const useGeoreferenceStore = create<GeoreferenceStore>()(
  persist(
    (set) => ({
      isVisible: false,
      imagePath: null,
      toggleVisible: () => set((state) => ({ isVisible: !state.isVisible })),
      setImagePath: (path) => set({ imagePath: path.url }),
      resetImagePath: async () => {
        await useGeoreferenceStore.persist.clearStorage();
      },
      /** MAP */
      map: null,
      mapContainer: null,
      isReady: false,
      setContainer: () =>
        set((state) => ({ mapContainer: state.mapContainer })),
      setMap: (map: Map) =>
        set(() => ({
          map: map,
          isReady: true,
        })),
    }),
    {
      name: "georeference-storage", // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        imagePath: state.imagePath,
      }),
    },
  ),
);
