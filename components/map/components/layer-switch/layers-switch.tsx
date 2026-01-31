"use client";
import { useMap } from "@/components/map/hooks/use-map";
import { tileGroup } from "@/components/map/layers/tiles/group/tile-group";
import { useMapContext } from "@/components/map/providers/map-provider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import "./style.scss";

const items: { label: string; value: string }[] = [
  { label: "Яндекс", value: "yandex" },
  { label: "Топография", value: "osm" },
  { label: "Спутник", value: "satellite" },
];

export default function LayersSwitch() {
  /* ЗДЕСЬ БУДЕТ ПОЛУЧЕНИЕ ТЕКУЗЕГО СЛОЯ ИЗ ПАРАМЕТРОВ КАРТЫ */
  const [currentLayer, setCurrentLayer] = useState("yandex");
  const { map, isReady } = useMap();
  const { setTileLayer } = useMapContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainer(containerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!map) return;
    if (!tileGroup.getLayers().getLength()) return;
    tileGroup.getLayers().forEach((layer) => {
      if (layer.get("layerType") === currentLayer) {
        layer.setVisible(true);
        setTileLayer(currentLayer);
      } else {
        layer.setVisible(false);
      }
    });
  }, [isReady, map, currentLayer, setTileLayer]);

  return (
    <div className="layers-switch" ref={containerRef}>
      <Select
        name="current-layer"
        defaultValue={currentLayer}
        onValueChange={(v) => setCurrentLayer(v)}
      >
        <SelectTrigger className="w-full max-w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          className="z-[9999] select-content"
          container={container}
          position="popper"
        >
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
