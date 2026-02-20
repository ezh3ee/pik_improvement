"use client";
import { useMap } from "@/components/map/hooks/use-map";
import { tileGroup } from "@/components/map/layers/tiles/group/tile-group";
import { useMapStore } from "@/components/map/state/map-store";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
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
  const [isCadasterActive, setIsCadasterActive] = useState(false);
  const { map, isReady } = useMap();
  const setTileLayer = useMapStore((state) => state.setTileLayer);

  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const toggleCadaster = () => {
    tileGroup.getLayers().forEach((layer) => {
      if (layer.get("layerType") === "cadaster") {
        layer.setVisible(!isCadasterActive);
        setIsCadasterActive((prev) => !prev);
      }
    });

    // containerRef?.current?.firstElementChild?.click();
  };

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
        if (layer.get("layerType") !== "cadaster") layer.setVisible(false);
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
          <SelectSeparator />
          <SelectGroup>
            <Field
              orientation="horizontal"
              className="flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-2 text-sm outline-hidden justify-between"
            >
              Кадастр
              <Checkbox
                id="terms-checkbox"
                name="terms-checkbox"
                checked={isCadasterActive}
                onCheckedChange={toggleCadaster}
              />
            </Field>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
