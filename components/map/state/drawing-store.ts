import { create } from "zustand";

type DrawingStore = {
  isDrawing: boolean;
  isCutting: boolean;
  isModifying: boolean;
  toggleDrawing: () => void;
  toggleCutting: () => void;
  toggleModifying: () => void;
};

const initialState = {
  isDrawing: false,
  isCutting: false,
  isModifying: false,
};

export const useDrawingStore = create<DrawingStore>()(
  //   persist(
  (set) => ({
    ...initialState,
    toggleDrawing: () => set((state) => ({ isDrawing: !state.isDrawing })),
    toggleCutting: () => set((state) => ({ isCutting: !state.isCutting })),
    toggleModifying: () =>
      set((state) => ({ isModifying: !state.isModifying })),
    // }),
    // {
    //   name: "georeference-storage",
    //   // storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    //   partialize: (state) => ({
    //     imagePath: state.imagePath,
    //     imageDimensions: state.imageDimensions,
    //   }),
  }),
);
