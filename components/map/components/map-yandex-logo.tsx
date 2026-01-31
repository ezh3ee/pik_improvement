"use client";
import { useMapContext } from "@/components/map/providers/map-provider";
import Image from "next/image";
export default function MapYandexLogo() {
  const { layer } = useMapContext();

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
