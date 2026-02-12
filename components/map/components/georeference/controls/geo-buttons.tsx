import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { RotateCcw, Trash2 } from "lucide-react";

export default function GeoButtons() {
  const setImagePath = useGeoreferenceStore((state) => state.setImagePath);
  const resetRefPoints = useGeoreferenceStore((state) => state.resetRefPoints);

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon-lg"
        onClick={() => {
          return (setImagePath({ url: null }), resetRefPoints());
        }}
      >
        <Trash2 />
      </Button>
      <Button variant="outline" size="icon-lg" onClick={resetRefPoints}>
        <RotateCcw />
      </Button>
    </ButtonGroup>
  );
}
