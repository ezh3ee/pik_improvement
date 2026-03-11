import MapLeftSide from "@/components/map/components/sides/map-left-side";
import MapRightSide from "@/components/map/components/sides/map-right-side";
import "./style.scss";

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
