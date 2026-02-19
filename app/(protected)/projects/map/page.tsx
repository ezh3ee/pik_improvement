import MainControls from "@/components/map/components/controls/main-controls";
import MainIntercations from "@/components/map/components/controls/main-intercations";
import { default as MapGeoreference } from "@/components/map/components/georeference/georeference";
import MapList from "@/components/map/components/map-list/map-list";
import GetCoordsByClick from "@/components/map/components/other/get-coords-by-click";
import MapYandexLogo from "@/components/map/components/other/map-yandex-logo";
import { MapPane } from "@/components/map/components/pane/map-pane";
import { CadasterTileLayer } from "@/components/map/layers/tiles/cadaster";
import { OSMTileLayer } from "@/components/map/layers/tiles/osm";
import { SatteliteLayer } from "@/components/map/layers/tiles/satellite";
import { YandexTileLayer } from "@/components/map/layers/tiles/yandex";
import "./style.scss";

export default function MapPage() {
  return (
    <div
      id="fullscreen"
      style={{ width: "100%", height: "100%" }}
      className="fullscreen"
    >
      <div className="gis-container">
        <MapGeoreference />
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
          {/* other */}
          <GetCoordsByClick />
          <MapYandexLogo />
        </div>
      </div>
    </div>
  );
}
