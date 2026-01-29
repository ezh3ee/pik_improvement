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

const items: { label: string; value: string }[] = [
  { label: "Яндекс", value: "yandex" },
  { label: "Open Street Map", value: "osm" },
  { label: "Open Street Map (спутник)", value: "osm-satellite" },
];

export default function LayersSwitch() {
  const [currentLayer, setCurrentLayer] = useState("yandex");
  const { map } = useMap();

  // if (!map) {
  //   console.log("there is no map, returning");
  //   return;
  // }

  const layers = map?.getLayers();

  console.log("map is ready. currentLayer ", currentLayer);

  console.log("map.getLayers() ", map?.getLayers().getLength());

  useEffect(() => {
    console.log("currentLayer ", currentLayer);
    if (!layers) return;
    layers.forEach((layer) => {
      console.log("layer loop ", layer);
      if (layer.get("layerType") === currentLayer) {
        layer.setVisible(true);
        console.log("layer is visible ", layer);
      } else {
        layer.setVisible(false);
        console.log("layer is not visible ", layer);
      }
    });
  }, [layers, currentLayer]);

  return (
    // <div className="layers-switch">
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
    // </div>
  );
}
