"use client";
import { TestPoint } from "@/components/map/layers/vector/test-point";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";

export default function MainInteractions() {
  const useIsGeoreferenceVisible = useGeoreferenceStore(
    (state) => state.isVisible,
  );
  return <>{!useIsGeoreferenceVisible && <TestPoint />}</>;
}
