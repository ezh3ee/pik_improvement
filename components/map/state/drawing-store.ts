import { GeoJSONFeature } from "ol/format/GeoJSON";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type DrawingStore = {
  isDrawing: boolean;
  isCutting: boolean;
  isModifying: boolean;
  differenceMode: boolean;
  storedFeatures: GeoJSONFeature[] | [];
  toggleDrawing: () => void;
  toggleCutting: () => void;
  toggleModifying: () => void;
  toggleDifferenceMode: () => void;
  addFeature: (feature: GeoJSONFeature) => void;
  updateFeature: (feature: GeoJSONFeature) => void;
  resetStore: () => Promise<void>;
};

const initialMode = {
  isDrawing: false,
  isCutting: false,
  isModifying: false,
  differenceMode: false,
};

const initialState = {
  isDrawing: false,
  isCutting: false,
  isModifying: false,
  differenceMode: false,
  storedFeatures: [],
};

export const useDrawingStore = create<DrawingStore>()(
  persist(
    (set) => ({
      ...initialState,
      toggleDrawing: () =>
        set((state) => ({ ...initialMode, isDrawing: !state.isDrawing })),
      toggleCutting: () =>
        set((state) => ({ ...initialMode, isCutting: !state.isCutting })),
      toggleModifying: () =>
        set((state) => ({ ...initialMode, isModifying: !state.isModifying })),
      toggleDifferenceMode: () =>
        set((state) => ({ differenceMode: !state.differenceMode })),
      addFeature: (feature) =>
        set((state) => ({
          storedFeatures: [...state.storedFeatures, feature],
        })),
      updateFeature: (feature) =>
        set((state) => ({
          storedFeatures: state.storedFeatures.map((storedFeature) =>
            storedFeature.id === feature.id ? feature : storedFeature,
          ),
        })),
      resetStore: async () => {
        set((state) => ({
          ...initialState,
          isDrawing: state.isDrawing,
          isModifying: state.isModifying,
        }));
        await useDrawingStore.persist.clearStorage();
      },
    }),
    {
      name: "drawing-storage",
      partialize: (state) => ({
        storedFeatures: state.storedFeatures,
      }),
    },
  ),
);
