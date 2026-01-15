"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
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
      <aside style={{ display: isVisible ? "block" : "none" }}>
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
      </aside>
      <ArrowLeft className="arrow cursor-pointer" onClick={handleToggle} />
    </div>
  );
}
