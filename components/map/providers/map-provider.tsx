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
  setMap: (map: Map) => void;
  isReady: boolean;
};

const MapContext = createContext<MapContextType | null>(null);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const mapRef = useRef<Map | null>(null);
  const [isReady, setIsReady] = useState(false);

  const setMap = useCallback((map: Map) => {
    mapRef.current = map;
    setIsReady(true);
  }, []);

  return (
    <MapContext.Provider
      value={{
        get map() {
          return mapRef.current;
        },
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
