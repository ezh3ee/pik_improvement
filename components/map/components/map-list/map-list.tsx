"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useComplexStore } from "../../state/complex-state";
import "./style.scss";

export default function MapList() {
  const { isMobile } = useSidebar();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  const complexStep = useComplexStore((state) => state.step);

  useEffect(() => {
    /* Решение с локалсторейджем https://stackoverflow.com/questions/72869030/initializing-component-with-parameter-from-local-storage-in-react-nextjs */
    const saved = localStorage.getItem("map-list-open");
    const initial = saved !== null ? saved === "true" : !isMobile;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(initial);
    setHydrated(true);
  }, [isMobile]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("map-list-open", isOpen.toString());
  }, [isOpen, hydrated]);

  if (!hydrated) return null;

  const isVisible = isOpen;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="map-list-container flex"
      style={{ display: complexStep !== "none" ? "none" : "flex" }}
    >
      {/* <div className="wrapper"> */}
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, width: "0px" }}
            animate={{
              opacity: 1,
              width: "300px",
              transition: {
                width: { duration: 0.15 },
                opacity: { duration: 0.15, delay: 0.12 },
              },
            }}
            exit={{
              opacity: 0,
              width: "0px",
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
          >
            <div className="search-container">
              <input type="text" placeholder="Поиск по адресу" />
              <button>Поиск</button>
              <button>Очистить</button>
            </div>
            <div className="map-list">
              <div className="map-list-item">
                <div className="map-list-item-title">
                  <div className="map-list-item-title-text">
                    <div className="map-list-item-title-text-name">Москва</div>
                    <div className="map-list-item-title-text-address">
                      Москва, ул. Большая Колесная, д. 10
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* </div> */}

      {/* <ButtonGroup className="hidden sm:flex arrow cursor-pointer"> */}
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="Go Back"
        onClick={handleToggle}
        // className="arrow"
        className={"arrow" + (!isVisible ? " closed" : "")}
      >
        {isVisible ? <ArrowLeftIcon /> : <ArrowRightIcon />}
      </Button>
      {/* </ButtonGroup> */}

      {/* <ArrowLeft
        className={"arrow cursor-pointer " + (!isVisible && " closed")}
        onClick={handleToggle}
      /> */}
    </div>
  );
}
