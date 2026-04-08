import { Step, useComplexStore } from "@/components/map/state/complex-store";

export default function StepTitle() {
  const step = useComplexStore((state) => state.step);
  const complexId = useComplexStore((state) => state.complexId);

  const title = {
    [Step.ComplexAdd]: complexId ? "Редактирование ЖК" : "Добавление ЖК",
    [Step.ObjectAdd]: "Добавление объектов",
    [Step.None]: "",
  }[step];

  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
      {title}
    </h3>
  );
}
