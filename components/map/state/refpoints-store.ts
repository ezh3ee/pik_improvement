import { persist } from "zustand/middleware";

import { create } from "zustand";

export type RefPoint = {
  original: number[];
  converted: number[];
  id: string;
};

type RefPointsStore = {
  refPoints: RefPoint[];
  resetRefPointTrigger: number;
  setRefPoints: (points: RefPoint) => void;
  updateRefPoint: (
    id: string,
    newCoords: number[],
    converted: number[],
  ) => void;
  removeRefPoint: (id: string) => void;
  resetStore: () => Promise<void>;
};

const initialState = {
  refPoints: [],
  resetRefPointTrigger: 0,
};

export const useRefPointsStore = create<RefPointsStore>()(
  persist(
    (set) => ({
      /** REF POINTS */
      ...initialState,
      setRefPoints: (refPoints) =>
        set((state) => ({ refPoints: [...state.refPoints, refPoints] })),
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
      removeRefPoint: (id) =>
        set((state) => ({
          refPoints: state.refPoints.filter((refPoint) => refPoint.id !== id),
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
      }),
    },
  ),
);
