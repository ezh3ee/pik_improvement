"use client";

import MapLeftSide from "@/components/map/components/sides/map-left-side";
// import MapRightSide from "@/components/map/components/sides/map-right-side";
import dynamic from "next/dynamic";
import "./style.scss";

const MapRightSide = dynamic(
  () => import("@/components/map/components/sides/map-right-side"),
  {
    ssr: false, // важно: OpenLayers использует window/document
    loading: () => (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-lg">Загрузка карты...</span>
      </div>
    ),
  },
);

export default function MapPage() {
  return (
    <div
      id="fullscreen"
      style={{ width: "100%", height: "100%" }}
      className="fullscreen"
    >
      <div className="gis-container">
        <MapLeftSide />
        <MapRightSide />
      </div>
    </div>
  );
}
