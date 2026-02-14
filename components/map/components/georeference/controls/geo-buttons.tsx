import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { useRefPointsStore } from "@/components/map/state/refpoints-store";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { RotateCcw, Trash2 } from "lucide-react";

export default function GeoButtons() {
  const resetRefPointsStore = useRefPointsStore((state) => state.resetStore);
  const resetImageStore = useGeoreferenceStore((state) => state.resetStore);

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon-lg"
        onClick={() => {
          return (resetImageStore(), resetRefPointsStore());
        }}
      >
        <Trash2 />
      </Button>
      <Button variant="outline" size="icon-lg" onClick={resetRefPointsStore}>
        <RotateCcw />
      </Button>
    </ButtonGroup>
  );
}
