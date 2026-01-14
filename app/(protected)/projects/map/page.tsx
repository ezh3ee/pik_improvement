import GetCoordsByClick from "@/components/map/components/get-coords-by-click";
import { YandexTileLayer } from "@/components/map/layers/yandex-tile-layer";
import { MapPane } from "@/components/map/map-pane";
import { MapProvider } from "@/components/map/providers/map-provider";
import Image from "next/image";
import "./style.scss";

export default function MapPage() {
  return (
    <MapProvider>
      <div
        id="fullscreen"
        style={{ width: "100%", height: "100%" }}
        className="fullscreen map-wrapper"
      >
        <MapPane />
        <YandexTileLayer />
        <GetCoordsByClick />
        <Image
          className="yandex-logo"
          src="/yndex_logo_ru.svg"
          alt="Логотип Яндекс.Карт"
          width={50}
          height={25}
        />
      </div>
    </MapProvider>
  );
}
