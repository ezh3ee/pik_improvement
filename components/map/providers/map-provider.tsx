"use client";

import Map from "ol/Map";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type MapContextType = {
  map: Map | null;
  mapContainer: HTMLElement | null;
  layer: string;
  isReady: boolean;
  setMap: (map: Map) => void;
  setTileLayer: (layer: string) => void;
  setContainer: (container: HTMLElement | null) => void;
};

const MapContext = createContext<MapContextType | null>(null);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [layer, setLayer] = useState("yandex");

  const setMap = useCallback((map: Map) => {
    mapRef.current = map;
    setIsReady(true);
  }, []);

  const setTileLayer = useCallback((layer: string) => {
    setLayer(layer);
  }, []);

  const setContainer = useCallback((container: HTMLElement | null) => {
    containerRef.current = container;
  }, []);

  return (
    <MapContext.Provider
      value={{
        get map() {
          return mapRef.current;
        },
        get layer() {
          return layer;
        },
        get mapContainer() {
          return containerRef.current;
        },
        setTileLayer,
        setContainer,
        setMap,
        isReady,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context)
    throw new Error("useMapContext must be used within a MapProvider");
  return context;
}
