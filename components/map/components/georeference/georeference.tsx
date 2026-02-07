"use client";

import RefImageUpload from "@/components/map/components/georeference/ref-image-upload";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { AnimatePresence, motion } from "motion/react";
import "./style.scss";

export default function MapGeoreference() {
  const isVisible = useGeoreferenceStore((state) => state.isVisible);
  const imagePath = useGeoreferenceStore((state) => state.imagePath);

  console.log(imagePath);

  return (
    isVisible && (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, width: "0%" }}
          animate={{
            opacity: 1,
            width: "50%",
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
          className="georeference-container items-center justify-center flex"
        >
          {!imagePath ? (
            <RefImageUpload />
          ) : (
            // <Image
            //   src={imagePath}
            //   alt="Генплан"
            //   width={0} // Required to suppress Next.js error when using CSS for sizing
            //   height={0} // Required to suppress Next.js error
            //   sizes="100vw" // Tells Next.js to generate an image suitable for a full-viewport-width display
            //   style={{
            //     width: "100%",
            //     height: "auto", // Maintains aspect ratio
            //   }}
            // />

            <img
              src={imagePath}
              alt="Генплан"
              style={{
                width: "100%",
                height: "auto", // Maintains aspect ratio
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    )
  );
}
