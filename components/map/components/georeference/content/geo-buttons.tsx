import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { RotateCcw, Trash2 } from "lucide-react";

export default function GeoButtons() {
  const setImagePath = useGeoreferenceStore((state) => state.setImagePath);

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon-lg"
        onClick={() => setImagePath({ url: null })}
      >
        <Trash2 />
      </Button>
      <Button variant="outline" size="icon-lg">
        <RotateCcw />
      </Button>
    </ButtonGroup>
  );
}
