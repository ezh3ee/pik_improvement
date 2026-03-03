"use client";

import { Button } from "@/components/ui/button";
import { useGeoreferenceStore } from "../../state/georeference-store";

export default function GeoreferenceBtn() {
  const toggleVisible = useGeoreferenceStore((state) => state.toggleVisible);
  const isVisible = useGeoreferenceStore((state) => state.isVisible);

  return (
    // <Button onClick={() => toggleVisible()} className="georeference-btn">
    <Button
      onClick={() => toggleVisible()}
      variant="outline"
      className={isVisible ? "active" : ""}
    >
      Наложение
    </Button>
  );
}
