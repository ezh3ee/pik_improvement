import {
  blackCrossStyle,
  redCrossStyle,
} from "@/components/map/common/cross-style";
import { altKeyOnly } from "ol/events/condition";
import Draw from "ol/interaction/Draw";
import Modify from "ol/interaction/Modify";
import VectorLayer from "ol/layer/Vector";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef } from "react";

export default function useDrawPointsInteraction({
  map,
  isReady,
}: {
  map: Map | null;
  isReady: boolean;
}) {
  const sourceRef = useRef<VectorSource | null>(null);
  const vLayerRef = useRef<VectorLayer | null>(null);
  const drawRef = useRef<Draw | null>(null);
  const modifyRef = useRef<Modify | null>(null);

  useEffect(() => {
    if (!map || !isReady) return;

    // const refPoints: RefPoint[] = useGeoreferenceStore.getState().refPoints;

    const source = new VectorSource();

    const vLayer = new VectorLayer({
      source: source,
      style: redCrossStyle,
    });

    const draw = new Draw({
      type: "Point",
      source: source,
      style: blackCrossStyle,
      condition: (e) => !(source.getFeatures().length === 2) && !altKeyOnly(e),
    });

    const modify = new Modify({
      source: source,
      style: blackCrossStyle,
    });

    vLayer.setMap(map);

    // if (refPoints.length > 0)
    //   refPoints.map((el) => {
    //     const feature = new Feature({
    //       geometry: new Point(el.original),
    //     });
    //     feature.setId(el.id);

    //     source.addFeature(feature);
    //   });

    vLayerRef.current = vLayer;
    sourceRef.current = source;
    drawRef.current = draw;
    modifyRef.current = modify;

    map.addInteraction(modify);
    map.addInteraction(draw);

    draw.set("source", vLayer.getSource());

    return () => {
      map.removeInteraction(draw);
      map.removeInteraction(modify);
      source.clear();
      sourceRef.current = null;
      drawRef.current = null;
      modifyRef.current = null;
      vLayerRef.current = null;
    };
  }, [map, isReady]);
  return { modifyRef, drawRef, sourceRef, vLayerRef };
}
