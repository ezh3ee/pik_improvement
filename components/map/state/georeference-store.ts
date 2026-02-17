import { create } from "zustand";
import { persist } from "zustand/middleware";

import Map from "ol/Map";

type GeoreferenceStore = {
  /* GEOREFERENCE */
  isVisible: boolean;
  isGeoRefImgVisible: boolean;
  imagePath: string | null;
  imageDimensions: { width: number; height: number };
  toggleVisible: () => void;
  toggleGeoRefImgVisible: () => void;
  setImagePath: (path: { url: string | null }) => void;
  setImageDimensions: (dimensions: { width: number; height: number }) => void;
  resetStore: () => Promise<void>;
  resetImageDimensions: () => void;
  /* MAP INSTANCE */
  map: Map | null;
  mapContainer: HTMLElement | null;
  isReady: boolean;
  setMap: (map: Map) => void;
  setContainer: (container: HTMLElement | null) => void;
};

const initialState = {
  isVisible: false,
  isGeoRefImgVisible: true,
  imagePath: null,
  imageDimensions: { width: 0, height: 0 },
  map: null,
  mapContainer: null,
  isReady: false,
};

export const useGeoreferenceStore = create<GeoreferenceStore>()(
  persist(
    (set) => ({
      ...initialState,
      toggleVisible: () => set((state) => ({ isVisible: !state.isVisible })),
      toggleGeoRefImgVisible: () =>
        set((state) => ({ isGeoRefImgVisible: !state.isGeoRefImgVisible })),
      setImagePath: (path) => set({ imagePath: path.url }),
      setImageDimensions: (dimensions) => set({ imageDimensions: dimensions }),
      resetStore: async () => {
        set({ ...initialState, isVisible: true });
        await useGeoreferenceStore.persist.clearStorage();
      },
      resetImageDimensions: () =>
        set({ imageDimensions: { width: 0, height: 0 } }),
      /** MAP */
      setContainer: () =>
        set((state) => ({ mapContainer: state.mapContainer })),
      setMap: (map: Map) =>
        set(() => ({
          map: map,
          isReady: true,
        })),
    }),
    {
      name: "georeference-storage",
      // storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        imagePath: state.imagePath,
        imageDimensions: state.imageDimensions,
      }),
    },
  ),
);
