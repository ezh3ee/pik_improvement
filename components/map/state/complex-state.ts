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
  setStep: (step: Step) => void;
  setComplexId: (id: string) => void;
  resetStore: () => Promise<void>;
  gotoFirstStep: () => void;
};

const initialState = {
  step: Step.None,
  complexId: null,
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
      resetStore: async () => {
        set(() => ({
          ...initialState,
        }));
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
      }),
    },
  ),
);
