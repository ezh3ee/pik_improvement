"use client";

import Drawing from "@/components/map/components/interactions/drawing/drawing";
import { useDrawingStore } from "@/components/map/state/drawing-store";

export default function DrawingInteractions() {
  const isDrawing = useDrawingStore((state) => state.isDrawing);
  return isDrawing && <Drawing />;
}
