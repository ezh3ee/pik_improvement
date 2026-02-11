import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import Map from "ol/Map";

export type RefPoint = {
  original: number[];
  // feature: Feature<Geometry>;
  converted: number[];
  id: string;
};

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
  /** REF POINTS */
  refPoints: RefPoint[];
  setRefPoints: (points: RefPoint) => void;
  updateRefPoint: (id: string, newCoords: number[]) => void;
  removeRefPoint: (id: string) => void;
};

export const useGeoreferenceStore = create<GeoreferenceStore>()(
  devtools(
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
        /** REF POINTS */
        refPoints: [],
        setRefPoints: (refPoints) =>
          set((state) => ({ refPoints: [...state.refPoints, refPoints] })),
        updateRefPoint: (id, newCoords) =>
          set((state) => ({
            refPoints: state.refPoints.map((refPoint) =>
              refPoint.id === id
                ? { ...refPoint, original: newCoords } // дополнить еще и изменгение конвертед
                : refPoint,
            ),
          })),
        removeRefPoint: (id) =>
          set((state) => ({
            refPoints: state.refPoints.filter((refPoint) => refPoint.id !== id),
          })),
      }),
      {
        name: "georeference-storage",
        // storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        partialize: (state) => ({
          imagePath: state.imagePath,
          refPoints: state.refPoints,
        }),
      },
    ),
  ),
);
