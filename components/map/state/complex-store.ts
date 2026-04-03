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
  isComplexEditing: boolean;
  complexDraft: FormData | null;
  objectDraft: FormData | null;
  setStep: (step: Step) => void;
  setComplexId: (id: string) => void;
  setComplexEditing: (value: boolean) => void;
  toggleAddingGeometry: () => void;
  setGeometryAdded: (value: boolean) => void;
  setComplexDraft: (draft: FormData) => void;
  setObjectDraft: (draft: FormData) => void;
  resetStore: () => Promise<void>;
  gotoFirstStep: () => void;
  gotoPreviousStep: () => void;
  gotoNextStep: () => void;
};

const initialState = {
  step: Step.None,
  complexId: null,
  isAddingGeometry: false,
  isGeometryAdded: false,
  isComplexEditing: false,
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
      setComplexEditing(value: boolean) {
        set(() => ({ isComplexEditing: value }));
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
        set(() => ({
          ...initialState,
          isAddingGeometry: false,
          step: Step.ComplexAdd,
        }));
        await useComplexStore.persist.clearStorage();
      },
      gotoFirstStep: () => {
        set(() => ({ step: Step.ComplexAdd, complexId: null }));
      },
      gotoPreviousStep: () => {
        set((state) => {
          const entries = Object.entries(Step);
          const current = entries.findIndex(
            ([key]) => Step[key as keyof typeof Step] === state.step,
          );
          return { step: entries[current - 1][1] };
        });
      },
      gotoNextStep: () => {
        set((state) => {
          const entries = Object.entries(Step);
          const current = entries.findIndex(
            ([key]) => Step[key as keyof typeof Step] === state.step,
          );
          return { step: entries[current + 1][1] };
        });
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
