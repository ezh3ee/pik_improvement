import GeoButtons from "@/components/map/components/georeference/controls/geo-buttons";
import GeoImage from "@/components/map/components/georeference/controls/geo-image";
import GeoreferenceControlPoints from "@/components/map/components/georeference/controls/georeference-control-points";

export default function GeoreferenceEdit() {
  return (
    <>
      <GeoreferenceControlPoints />
      <GeoButtons />
      <GeoImage />
    </>
  );
}
