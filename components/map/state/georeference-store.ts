import { create } from "zustand";

type GeoreferenceStoreType = {
  isVisible: boolean;
  toggleVisible: () => void;
};

export const useGeoreferenceStore = create<GeoreferenceStoreType>((set) => ({
  isVisible: false,
  toggleVisible: () =>
    set(
      (state) => (
        console.log("toggleVisible"),
        { isVisible: !state.isVisible }
      ),
    ),
}));
