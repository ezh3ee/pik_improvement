import { useDrawingStore } from "@/components/map/state/drawing-store";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Scissors, Spline, SquareDot } from "lucide-react";

export default function InteractionsDropdown() {
  const toggleDrawing = useDrawingStore((state) => state.toggleDrawing);
  const isDrawing = useDrawingStore((state) => state.isDrawing);

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
        <DropdownMenuItem>
          <SquareDot />
          Редактирование
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Scissors />
          Вырезание
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
