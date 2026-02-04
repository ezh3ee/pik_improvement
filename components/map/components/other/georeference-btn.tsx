"use client";

import { Button } from "@/components/ui/button";
import { useGeoreferenceStore } from "../../state/georeference-store";

export default function GeoreferenceBtn() {
  const toggleVisible = useGeoreferenceStore((state) => state.toggleVisible);

  return <Button onClick={() => toggleVisible()}>Georeference</Button>;
}
