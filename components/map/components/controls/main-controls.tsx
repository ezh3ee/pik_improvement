"use client";

import GeoreferenceBtn from "@/components/map/components/controls/georeference-btn";
import LayersSwitch from "@/components/map/components/controls/layer-switch/layers-switch";
import ToggleRefImageButton from "@/components/map/components/controls/toggle-refimg-button";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";

export default function MainControls() {
  const isGeoRefVisible = useGeoreferenceStore((state) => state.isVisible);

  return (
    <>
      {isGeoRefVisible && <ToggleRefImageButton />}
      <LayersSwitch />
      <GeoreferenceBtn />
    </>
  );
}
