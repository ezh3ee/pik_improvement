"use client";

import GeoreferenceEdit from "@/components/map/components/georeference/georeference-edit";
import RefImageUpload from "@/components/map/components/georeference/ref-image-upload";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { AnimatePresence, motion } from "motion/react";
import "./style.scss";

export default function MapGeoreference() {
  const isVisible = useGeoreferenceStore((state) => state.isVisible);
  const imagePath = useGeoreferenceStore((state) => state.imagePath);

  return (
    isVisible && (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, width: "0%" }}
          animate={{
            opacity: 1,
            // width: "50%",
            width: "100%",
            transition: {
              width: { duration: 0.15 },
              opacity: { duration: 0.15, delay: 0.12 },
            },
          }}
          exit={{
            opacity: 0,
            width: "0%",
            display: "none",
            visibility: "hidden",
          }}
          transition={{
            width: {
              type: "tween",
              duration: 0.15,
              delay: 0.12,
            },
            opacity: { duration: 0.15 },
          }}
          // className="left-side items-center justify-center flex flex-col gap-2"
          className="h-full items-center justify-center flex flex-col gap-2"
        >
          {!imagePath ? <RefImageUpload /> : <GeoreferenceEdit />}
        </motion.div>
      </AnimatePresence>
    )
  );
}
