import { ArrowLeft } from "lucide-react";
import "./style.scss";

export default function MapList() {
  return (
    <div className="map-list-container">
      <aside>
        <div className="search-container">
          <input type="text" placeholder="Поиск по адресу" />
          <button>Поиск</button>
          <button>Очистить</button>
        </div>
        <div className="map-list">
          <div className="map-list-item">
            <div className="map-list-item-title">
              <div className="map-list-item-title-text">
                <div className="map-list-item-title-text-name">Москва</div>
                <div className="map-list-item-title-text-address">
                  Москва, ул. Большая Колесная, д. 10
                </div>
              </div>
            </div>
          </div>
        </div>
        <ArrowLeft className="arrow cursor-pointer" />
      </aside>
    </div>
  );
}
