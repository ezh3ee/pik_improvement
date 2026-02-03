import GetCoordsByClick from "@/components/map/components/get-coords-by-click";
import LayersSwitch from "@/components/map/components/layer-switch/layers-switch";
import MapList from "@/components/map/components/map-list/map-list";
import MapYandexLogo from "@/components/map/components/map-yandex-logo";
import { OSMTileLayer } from "@/components/map/layers/tiles/osm";
import { SatteliteLayer } from "@/components/map/layers/tiles/satellite";
import { YandexTileLayer } from "@/components/map/layers/tiles/yandex";
import { TestPoint } from "@/components/map/layers/vector/test-point";
import { MapPane } from "@/components/map/map-pane";
import "./style.scss";

export default function MapPage() {
  return (
    <div
      id="fullscreen"
      style={{ width: "100%", height: "100%" }}
      className="fullscreen map-wrapper"
    >
      <MapList />
      <MapPane />
      <YandexTileLayer />
      <OSMTileLayer />
      <SatteliteLayer />
      <GetCoordsByClick />
      <TestPoint />
      <LayersSwitch />
      <MapYandexLogo />
    </div>
  );
}
