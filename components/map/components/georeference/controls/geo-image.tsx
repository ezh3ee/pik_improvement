import ImageLayerRef from "@/components/map/components/georeference/map/image-layer-ref";
import { MapPane } from "@/components/map/components/georeference/map/map-pane";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";

export default function GeoImage() {
  const imagePath = useGeoreferenceStore((state) => state.imagePath);

  return (
    imagePath && (
      <>
        <MapPane />
        <ImageLayerRef />
      </>
    )
  );
}
