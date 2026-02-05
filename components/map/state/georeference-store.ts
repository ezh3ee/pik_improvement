import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GeoreferenceStoreType = {
  isVisible: boolean;
  imagePath: string | null;
  toggleVisible: () => void;
  setImagePath: (path: { url: string }) => void;
};

export const useGeoreferenceStore = create<GeoreferenceStoreType>()(
  persist(
    (set) => ({
      isVisible: false,
      imagePath: null,
      toggleVisible: () => set((state) => ({ isVisible: !state.isVisible })),
      setImagePath: (path) => set({ imagePath: path.url }),
    }),
    {
      name: "georeference-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        imagePath: state.imagePath,
      }),
    },
  ),
);
