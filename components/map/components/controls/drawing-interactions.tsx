"use client";

import DrawingHole from "@/components/map/components/interactions/drawing/cutting";
import Drawing from "@/components/map/components/interactions/drawing/drawing";
import Modifying from "@/components/map/components/interactions/drawing/modifying";
import Viewing from "@/components/map/components/interactions/drawing/viewing";
import { useDrawingStore } from "@/components/map/state/drawing-store";

export default function DrawingInteractions() {
  const isDrawing = useDrawingStore((state) => state.isDrawing);
  const isCutting = useDrawingStore((state) => state.isCutting);
  const isModifying = useDrawingStore((state) => state.isModifying);
  const isViewing = useDrawingStore((state) => state.isViewing);

  if (isDrawing) return <Drawing />;
  if (isCutting) return <DrawingHole />;
  if (isModifying) return <Modifying />;
  if (isViewing) return <Viewing />;
}
