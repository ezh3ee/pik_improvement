"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import "./style.scss";

export default function MapList() {
  const { isMobile } = useSidebar();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    if (isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(false);
      return;
    }
    /* Решение с локалсторейджем https://stackoverflow.com/questions/72869030/initializing-component-with-parameter-from-local-storage-in-react-nextjs */
    const saved = localStorage.getItem("map-list-open");
    const initial = saved !== null ? saved === "true" : !isMobile;

    setIsOpen(initial);
    setHydrated(true);
  }, [isMobile]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("map-list-open", isOpen.toString());
  }, [isOpen, hydrated]);

  // useEffect(() => {
  //   if (isMobile) {
  //     // eslint-disable-next-line react-hooks/set-state-in-effect
  //     setIsOpen(false);
  //   }
  // }, [isMobile]);

  if (!hydrated) return null;

  const isVisible = isOpen && !isMobile;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="map-list-container">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, width: "0px" }}
            animate={{
              opacity: 1,
              width: "350px",
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
      <ArrowLeft className="arrow cursor-pointer" onClick={handleToggle} />
    </div>
  );
}
