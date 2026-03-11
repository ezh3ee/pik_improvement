import { create } from "zustand";

type Step = "none" | "complex-add" | "object-add";

type ComplexType = {
  step: Step;
  setStep: (step: Step) => void;
};

const initialState = {
  step: "none",
};

export const useComplexStore = create<ComplexType>((set) => ({
  ...(initialState as ComplexType),
  setStep(step: Step) {
    set(() => ({ step: step }));
  },
}));
