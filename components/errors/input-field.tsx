// "use client";
import { AnimatePresence, motion } from "motion/react";
import { ControllerFieldState } from "react-hook-form";
import { FieldError } from "../ui/field";

const MotionFieldError = motion.create(FieldError);

export function InputFieldError({
  fieldState,
}: {
  fieldState: ControllerFieldState;
}) {
  return (
    <div className="min-h-[1px] overflow-hidden">
      <AnimatePresence mode="wait">
        {fieldState.invalid && (
          <MotionFieldError
            errors={[fieldState.error]}
            key="field-error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{
              opacity: 0,
              height: 0,
              display: "none",
              visibility: "hidden",
            }}
            transition={{
              type: "tween",
              duration: 0.2,
              stiffness: 100,
              damping: 20,
              ease: "backOut",
            }}
            className="overflow-hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
