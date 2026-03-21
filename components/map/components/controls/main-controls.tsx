"use client";

// import GeoreferenceBtn from "@/components/map/components/controls/georeference-btn";
import ComplexToggleBtn from "@/components/map/components/controls/complex-creation-switch";
import GeoRefControls from "@/components/map/components/controls/georef-controls";
import LayersSwitch from "@/components/map/components/controls/layer-switch/layers-switch";
import { Step, useComplexStore } from "@/components/map/state/complex-store";
import { ButtonGroup } from "@/components/ui/button-group";
import DrawingControls from "./drawing-controls";

export default function MainControls() {
  const complexStep = useComplexStore((state) => state.step);
  const isAddingGeometry = useComplexStore((state) => state.isAddingGeometry);

  const showInteractions = complexStep === Step.ObjectAdd || isAddingGeometry;

  return (
    <>
      <ButtonGroup className="main-controls">
        <ComplexToggleBtn />
        {complexStep !== "none" && <GeoRefControls />}
        {showInteractions && <DrawingControls />}
      </ButtonGroup>
      <LayersSwitch />
    </>
  );
}
