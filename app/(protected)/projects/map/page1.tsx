import Map from "@/components/map/map";
import Image from "next/image";
import "./style.scss";

export default function MapPage() {
  return (
    <div
      id="fullscreen"
      style={{ width: "100%", height: "100%" }}
      className="fullscreen map-wrapper"
    >
      <Map />
      <Image
        className="yandex-logo"
        src="/yndex_logo_ru.svg"
        alt="Логотип Яндекс.Карт"
        width={50}
        height={25}
      />
    </div>
  );
}
