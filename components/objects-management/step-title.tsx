import { Step, useComplexStore } from "@/components/map/state/complex-store";

export default function StepTitle() {
  const step = useComplexStore((state) => state.step);

  //   const getTitle = () => {
  //     switch (step) {
  //       case Step.ComplexAdd:
  //         return "Добавление ЖК";
  //       case Step.ObjectAdd:
  //         return "Добавление объектов";
  //       case Step.None:
  //         return "Добавление ЖК";
  //     }
  //   };

  const title = {
    [Step.ComplexAdd]: "Добавление ЖК",
    [Step.ObjectAdd]: "Добавление объектов",
    [Step.None]: "",
  }[step];

  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
      {title}
    </h3>
  );
}
