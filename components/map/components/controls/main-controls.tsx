"use client";

// import GeoreferenceBtn from "@/components/map/components/controls/georeference-btn";
import ComplexToggleBtn from "@/components/map/components/controls/complex-creation-switch";
import GeoRefControls from "@/components/map/components/controls/georef-controls";
import LayersSwitch from "@/components/map/components/controls/layer-switch/layers-switch";
import { useComplexStore } from "@/components/map/state/complex-state";
import { ButtonGroup } from "@/components/ui/button-group";

export default function MainControls() {
  const complexStep = useComplexStore((state) => state.step);

  return (
    <>
      <ButtonGroup className="main-controls">
        <ComplexToggleBtn />
        {complexStep !== "none" && <GeoRefControls />}
      </ButtonGroup>
      <LayersSwitch />
    </>
  );
}
