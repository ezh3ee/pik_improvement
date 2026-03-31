"use client";
import InteractionsDropdown from "@/components/map/components/controls/interactions-dropdown";
import { useComplexStore } from "@/components/map/state/complex-store";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DraftingCompass } from "lucide-react";
import { CSSProperties } from "react";

export default function DrawingControls() {
  const isAddingGeometry = useComplexStore((state) => state.isAddingGeometry);

  const isActive: CSSProperties | undefined = isAddingGeometry
    ? {
        border: "2px solid var(--color-green-500)",
      }
    : undefined;
  return (
    <ButtonGroup>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Геометрия" style={isActive}>
            <span className="flex items-center gap-2">
              <DraftingCompass /> <span>Геометрия</span>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <InteractionsDropdown />
      </DropdownMenu>
    </ButtonGroup>
  );
}
