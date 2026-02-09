import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export default function GeoImage() {
  const imagePath = useGeoreferenceStore((state) => state.imagePath);

  return (
    imagePath && (
      <TransformWrapper wheel={{ step: 1000 }} pinch={{ step: 1000 }}>
        <TransformComponent>
          <img
            src={imagePath}
            alt="Генплан"
            style={{
              width: "100%",
              height: "auto", // Maintains aspect ratio
            }}
          />
        </TransformComponent>
      </TransformWrapper>
    )
  );
}
