import GetCoordsByClick from "@/components/map/components/get-coords-by-click";
import LayersSwitch from "@/components/map/components/layers-switch";
import MapList from "@/components/map/components/map-list/map-list";
import { OSMTileLayer } from "@/components/map/layers/tiles/osm";
import { YandexTileLayer } from "@/components/map/layers/tiles/yandex";
import { TestPoint } from "@/components/map/layers/vector/test-point";
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
        <MapList />
        <MapPane />
        <LayersSwitch />
        <YandexTileLayer />
        <OSMTileLayer />
        <GetCoordsByClick />
        <TestPoint />
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
