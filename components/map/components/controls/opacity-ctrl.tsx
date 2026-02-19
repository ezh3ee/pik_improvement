import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { Slider } from "@/components/ui/slider";

export default function OpacityCtrl() {
  const opacity = useGeoreferenceStore((state) => state.geoRefImgOpacity);
  const setOpacity = useGeoreferenceStore(
    (state) => state.setGeoRefImageOpacity,
  );
  return (
    <Slider
      defaultValue={[opacity]}
      max={1.0}
      min={0.1}
      step={0.1}
      onValueChange={(v) => setOpacity(v[0])}
      className="mx-auto w-full max-w-xs opacity-slider"
    />
  );
}
