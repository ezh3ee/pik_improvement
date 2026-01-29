"use client";
import { useMap } from "@/components/map/hooks/use-map";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { tileGroup } from "../layers/tiles/tile-group";

const items: { label: string; value: string }[] = [
  { label: "Яндекс", value: "yandex" },
  { label: "Open Street Map", value: "osm" },
  { label: "Open Street Map (спутник)", value: "osm-satellite" },
];

export default function LayersSwitch() {
  const [currentLayer, setCurrentLayer] = useState("yandex");
  const { map, isReady } = useMap();

  useEffect(() => {
    if (!map) return;
    if (!tileGroup.getLayers().getLength()) return;
    tileGroup.getLayers().forEach((layer) => {
      if (layer.get("layerType") === currentLayer) {
        layer.setVisible(true);
      } else {
        layer.setVisible(false);
      }
    });
  }, [isReady, map, currentLayer]);

  return (
    <div className="layers-switch">
      <Select
        name="current-layer"
        defaultValue={currentLayer}
        onValueChange={(v) => setCurrentLayer(v)}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
