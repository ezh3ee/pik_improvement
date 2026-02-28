import { useDrawingStore } from "@/components/map/state/drawing-store";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Scissors,
  Spline,
  SquareDashedTopSolid,
  SquareDot,
} from "lucide-react";

export default function InteractionsDropdown() {
  const toggleDrawing = useDrawingStore((state) => state.toggleDrawing);
  const toggleCutting = useDrawingStore((state) => state.toggleCutting);
  const toggleModifying = useDrawingStore((state) => state.toggleModifying);
  const isDrawing = useDrawingStore((state) => state.isDrawing);
  const isCutting = useDrawingStore((state) => state.isCutting);
  const isModifying = useDrawingStore((state) => state.isModifying);
  const toggleDifferenceMode = useDrawingStore(
    (state) => state.toggleDifferenceMode,
  );
  const differenceMode = useDrawingStore((state) => state.differenceMode);

  const storedFeatures = useDrawingStore((state) => state.storedFeatures);
  const resetDrawingStore = useDrawingStore((state) => state.resetStore);

  return (
    <DropdownMenuContent align="end" className="w-40">
      <DropdownMenuGroup>
        <DropdownMenuLabel>Объекты</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={toggleDrawing}
          className={isDrawing ? "active" : ""}
        >
          <Spline />
          Добавление
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={storedFeatures.length === 0}
          onClick={toggleModifying}
          className={isModifying ? "active" : ""}
        >
          <SquareDot />
          Редактирование
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={storedFeatures.length === 0}
          onClick={toggleCutting}
          className={isCutting ? "active" : ""}
        >
          <Scissors />
          Вырезание
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          disabled={!isDrawing}
        >
          <div className="flex items-center space-x-2 text-sm">
            <SquareDashedTopSolid />
            <Label htmlFor="difference-mode" className="font-normal">
              Разность
            </Label>
            <Switch
              id="difference-mode"
              onCheckedChange={toggleDifferenceMode}
              checked={differenceMode}
            />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={storedFeatures.length === 0}
          onClick={resetDrawingStore}
        >
          <Scissors />
          СБРОС (временно)
        </DropdownMenuItem>
      </DropdownMenuGroup>
      {/* <DropdownMenuSeparator /> */}
      {/* <DropdownMenuGroup>
                <DropdownMenuItem>
                  <ClockIcon />
                  Snooze
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CalendarPlusIcon />
                  Add to Calendar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ListFilterIcon />
                  Add to List
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <TagIcon />
                    Label As...
                  </DropdownMenuSubTrigger>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon />
                  Trash
                </DropdownMenuItem>
              </DropdownMenuGroup> */}
    </DropdownMenuContent>
  );
}
