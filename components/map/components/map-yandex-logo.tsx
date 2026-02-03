"use client";
import { useMapStore } from "@/components/map/state/map-store";
import Image from "next/image";
export default function MapYandexLogo() {
  const layer = useMapStore((state) => state.layer);
  console.log(layer);

  return layer === "yandex" ? (
    <Image
      className="yandex-logo"
      src="/yndex_logo_ru.svg"
      alt="Логотип Яндекс.Карт"
      width={50}
      height={25}
    />
  ) : null;
}
