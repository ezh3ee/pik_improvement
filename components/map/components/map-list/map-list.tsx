"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import "./style.scss";

export default function MapList() {
  const { isMobile } = useSidebar();
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);

  const isVisible = isOpen ?? !isMobile;

  const handleToggle = () => {
    setIsOpen(!isVisible);
  };

  return (
    <div className="map-list-container">
      <AnimatePresence mode="wait">
        {/* <motion.aside style={{ maxWidth: isVisible ? "350px" : "0px" }}> */}
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
            // style={{ overflow: "hidden" }}
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
