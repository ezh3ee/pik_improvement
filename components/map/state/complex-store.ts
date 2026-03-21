import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export enum Step {
  None = "none",
  ComplexAdd = "complex-add", // add new complex
  ObjectAdd = "object-add", // add new object
}

type ComplexType = {
  step: Step;
  complexId: string | null;
  isAddingGeometry: boolean;
  isGeometryAdded: boolean;
  complexDraft: FormData | null;
  objectDraft: FormData | null;
  setStep: (step: Step) => void;
  setComplexId: (id: string) => void;
  toggleAddingGeometry: () => void;
  setGeometryAdded: (value: boolean) => void;
  setComplexDraft: (draft: FormData) => void;
  setObjectDraft: (draft: FormData) => void;
  resetStore: () => Promise<void>;
  gotoFirstStep: () => void;
};

const initialState = {
  step: Step.None,
  complexId: null,
  isAddingGeometry: false,
  isGeometryAdded: false,
  complexDraft: null,
  objectDraft: null,
};

export const useComplexStore = create<ComplexType>()(
  persist(
    (set) => ({
      ...initialState,
      setStep(step: Step) {
        set(() => ({ step: step }));
      },
      setComplexId(id: string) {
        set(() => ({ complexId: id }));
      },
      toggleAddingGeometry() {
        set((state) => ({ isAddingGeometry: !state.isAddingGeometry }));
      },
      setGeometryAdded(value: boolean) {
        set(() => ({ isGeometryAdded: value }));
      },
      setComplexDraft(draft: FormData) {
        set(() => ({ complexDraft: draft }));
      },
      setObjectDraft(draft: FormData) {
        set(() => ({ objectDraft: draft }));
      },
      resetStore: async () => {
        // set(() => ({
        //   ...initialState,
        // }));
        await useComplexStore.persist.clearStorage();
      },
      gotoFirstStep: () => {
        set(() => ({ step: Step.ComplexAdd, complexId: null }));
      },
    }),
    {
      name: "complex-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        step: state.step,
        complexId: state.complexId,
        isAddingGeometry: state.isAddingGeometry,
        isGeometryAdded: state.isGeometryAdded,
      }),
    },
  ),
);
