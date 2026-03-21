"use client";
import InteractionsDropdown from "@/components/map/components/controls/interactions-dropdown";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DraftingCompass } from "lucide-react";

export default function DrawingControls() {
  return (
    <ButtonGroup>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="More Options">
            <DraftingCompass />
          </Button>
        </DropdownMenuTrigger>
        <InteractionsDropdown />
      </DropdownMenu>
    </ButtonGroup>
  );
}
