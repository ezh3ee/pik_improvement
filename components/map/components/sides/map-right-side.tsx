import DrawingInteractions from "@/components/map/components/controls/drawing-interactions";
import MainControls from "@/components/map/components/controls/main-controls";
import MainIntercations from "@/components/map/components/controls/main-intercations";
import MapList from "@/components/map/components/map-list/map-list";
import GetCoordsByClick from "@/components/map/components/other/get-coords-by-click";
import MapYandexLogo from "@/components/map/components/other/map-yandex-logo";
import { MapPane } from "@/components/map/components/pane/map-pane";
import { CadasterTileLayer } from "@/components/map/layers/tiles/cadaster";
import { OSMTileLayer } from "@/components/map/layers/tiles/osm";
import { SatteliteLayer } from "@/components/map/layers/tiles/satellite";
import { YandexTileLayer } from "@/components/map/layers/tiles/yandex";

export default function MapRightSide() {
  return (
    <div className="map-wrapper">
      <MapPane />
      <MapList />
      {/* tiles */}
      <YandexTileLayer />
      <OSMTileLayer />
      <SatteliteLayer />
      <CadasterTileLayer />
      {/* controls */}
      <MainControls />
      {/* interactions */}
      <MainIntercations />
      <DrawingInteractions />
      {/* other */}
      <GetCoordsByClick />
      <MapYandexLogo />
    </div>
  );
}
