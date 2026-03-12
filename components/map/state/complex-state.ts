import { create } from "zustand";

type Step = "none" | "complex-add" | "object-add";

type ComplexType = {
  step: Step;
  complexId: string | null;
  setStep: (step: Step) => void;
  setComplexId: (id: string) => void;
};

const initialState = {
  step: "none",
};

export const useComplexStore = create<ComplexType>((set) => ({
  ...(initialState as ComplexType),
  setStep(step: Step) {
    set(() => ({ step: step }));
  },
  setComplexId(id: string) {
    set(() => ({ complexId: id }));
  },
}));
