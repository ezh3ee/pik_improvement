import ControlPoints from "@/components/map/components/georeference/controls/draw-control";
import GeoButtons from "@/components/map/components/georeference/controls/geo-buttons";
import GeoImage from "@/components/map/components/georeference/controls/geo-image";

export default function GeoreferenceEdit() {
  return (
    <>
      <ControlPoints />
      <GeoButtons />
      <GeoImage />
    </>
  );
}
