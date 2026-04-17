import GeocoderListError from "@/components/map/components/controls/geocoder/error";
import GeocoderList from "@/components/map/components/controls/geocoder/list";
import GeocoderListLoading from "@/components/map/components/controls/geocoder/loading";
import { GeocoderResponseDto } from "@/components/map/components/controls/geocoder/types";
import { AnimatePresence, motion } from "motion/react";

export default function GeocoderListContainer({
  addresses,
  isError,
  isLoading,
}: {
  addresses: GeocoderResponseDto | undefined;
  isError: boolean;
  isLoading: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, width: "0%", maxWidth: "250px" }}
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
        {addresses && addresses.results.length > 0 && !isLoading && (
          <GeocoderList addresses={addresses} />
        )}
        {(isError || !addresses?.results.length) && !isLoading && (
          <GeocoderListError
            isError={isError}
            empty={!addresses?.results.length}
          />
        )}
        {isLoading && <GeocoderListLoading />}
      </motion.div>
    </AnimatePresence>
  );
}
