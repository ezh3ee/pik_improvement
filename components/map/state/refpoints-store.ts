import { persist } from "zustand/middleware";

import { create } from "zustand";

export type RefPoint = {
  original: number[];
  converted: number[];
  id: string;
};

type RefPointsStore = {
  refPoints: RefPoint[];
  mainMapRefPoints: RefPoint[];
  resetRefPointTrigger: number;
  setRefPoints: (points: RefPoint) => void;
  setMainMapRefPoints: (points: RefPoint) => void;
  updateRefPoint: (
    id: string,
    newCoords: number[],
    converted: number[],
  ) => void;
  updateMainMapRefPoint: (
    id: string,
    newCoords: number[],
    converted: number[],
  ) => void;
  removeRefPoint: (id: string) => void;
  removeMainMapRefPoint: (id: string) => void;
  resetStore: () => Promise<void>;
};

const initialState = {
  refPoints: [],
  mainMapRefPoints: [],
  resetRefPointTrigger: 0,
};

export const useRefPointsStore = create<RefPointsStore>()(
  persist(
    (set) => ({
      /** REF POINTS */
      ...initialState,
      setRefPoints: (refPoints) =>
        set((state) => ({ refPoints: [...state.refPoints, refPoints] })),
      setMainMapRefPoints: (refPoints) =>
        set((state) => ({
          mainMapRefPoints: [...state.mainMapRefPoints, refPoints],
        })),
      updateRefPoint: (id, newCoords, newConvertedCoords) =>
        set((state) => ({
          refPoints: state.refPoints.map((refPoint) =>
            refPoint.id === id
              ? {
                  ...refPoint,
                  original: newCoords,
                  converted: newConvertedCoords,
                }
              : refPoint,
          ),
        })),
      updateMainMapRefPoint: (id, newCoords, newConvertedCoords) =>
        set((state) => ({
          mainMapRefPoints: state.mainMapRefPoints.map((refPoint) =>
            refPoint.id === id
              ? {
                  ...refPoint,
                  original: newCoords,
                  converted: newConvertedCoords,
                }
              : refPoint,
          ),
        })),
      removeRefPoint: (id) =>
        set((state) => ({
          refPoints: state.refPoints.filter((refPoint) => refPoint.id !== id),
        })),
      removeMainMapRefPoint: (id) =>
        set((state) => ({
          mainMapRefPoints: state.mainMapRefPoints.filter(
            (refPoint) => refPoint.id !== id,
          ),
        })),
      resetStore: async () => {
        set((state) => ({
          ...initialState,
          resetRefPointTrigger: ++state.resetRefPointTrigger,
        }));
        await useRefPointsStore.persist.clearStorage();
      },
    }),
    {
      name: "refpoints-storage",
      // storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        refPoints: state.refPoints,
        mainMapRefPoints: state.mainMapRefPoints,
      }),
    },
  ),
);
