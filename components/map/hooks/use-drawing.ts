import { ZIndexes } from "@/components/map/components/config/z-indexes";
import useDifference from "@/components/map/hooks/use-difference";
import { useDrawingStore } from "@/components/map/state/drawing-store";
import { Geometry as GeoJsonGeometry } from "geojson";
import { Feature, Map } from "ol";
import GeoJSON, { GeoJSONFeature } from "ol/format/GeoJSON";
import { Geometry } from "ol/geom";
import Draw, { DrawEvent } from "ol/interaction/Draw";
import Snap from "ol/interaction/Snap";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import { useEffect, useRef } from "react";
import useCombine from "./use-combine";

type UseDrawingProps = {
  map: Map | null;
  isReady: boolean;
};

export default function useDrawing({ map, isReady }: UseDrawingProps) {
  const drawVectorRef = useRef<VectorLayer>(null);
  const snapRef = useRef<Snap>(null);
  const drawRef = useRef<Draw>(null);
  const vectorSourceRef = useRef<VectorSource>(null);

  const difference = useDifference();

  const addFeatureToStore = useDrawingStore((state) => state.addFeature);
  const storedFeatures = useDrawingStore((state) => state.storedFeatures);

  const { сonvertToDb, сonvertFromDb } = useCombine();

  useEffect(() => {
    if (!map || !isReady) return;

    const vectorSource = new VectorSource();

    const format = new GeoJSON();

    const drawVector = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: "rgb(0, 89, 255)",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(116, 181, 255, 0.4)",
        }),
      }),
      zIndex: ZIndexes.Intercations,
    });

    const snap = new Snap({
      source: vectorSource,
    });

    const drawInteraction = new Draw({
      type: "Polygon",
      style: {
        "stroke-color": "rgba(9, 146, 238, 0.5)",
        "stroke-width": 1.5,
        "fill-color": "rgba(0, 27, 180, 0.25)",
        "circle-radius": 6,
        "circle-fill-color": "rgba(179, 11, 165, 0.5)",
      },
      snapTolerance: 5,
    });

    const geojsonMock = {
      type: "MultiPolygon",
      coordinates: [
        [
          [
            [4216130.768374347, 7490670.581311491],
            [4216168.091142064, 7490663.415340089],
            [4216160.029424237, 7490627.884065223],
            [4216113.450610126, 7490633.2585437745],
            [4216130.768374347, 7490670.581311491],
          ],
        ],
        [
          [
            [4216114.346356551, 7490684.316090011],
            [4216154.356363544, 7490695.960793539],
            [4216180.333009875, 7490712.084229193],
            [4216108.076131575, 7490723.728932721],
            [4216114.346356551, 7490684.316090011],
          ],
        ],
        [
          [
            [4216038.759471967, 7490685.510418575],
            [4216076.406190234, 7490683.718925725],
            [4216073.418355452, 7490646.694740149],
            [4216041.74730675, 7490643.111754449],
            [4216038.759471967, 7490685.510418575],
          ],
        ],
        [
          [
            [4216075.808623278, 7490594.741447487],
            [4216133.772618071, 7490595.935776054],
            [4216124.211546765, 7490549.356961942],
            [4216079.991591974, 7490554.13427621],
            [4216075.808623278, 7490594.741447487],
          ],
        ],
        [
          [
            [4216170.868278127, 7490555.030022638],
            [4216196.563657261, 7490558.91159048],
            [4216197.758791175, 7490532.337779866],
            [4216166.087742474, 7490537.115094134],
            [4216170.868278127, 7490555.030022638],
          ],
        ],
        [
          [
            [4216143.380198121, 7490519.200165565],
            [4216181.624483345, 7490514.124269156],
            [4216171.764628561, 7490490.536279959],
            [4216129.636158118, 7490498.896579927],
            [4216143.380198121, 7490519.200165565],
          ],
        ],
        [
          [
            [4216169.673144213, 7490589.068386733],
            [4216211.2040476985, 7490593.547118858],
            [4216202.838110305, 7490571.45204037],
            [4216168.179226821, 7490572.944951078],
            [4216169.673144213, 7490589.068386733],
          ],
        ],
        [
          [
            [4216237.198210317, 7490622.211004515],
            [4216264.387506843, 7490621.912422374],
            [4216260.802105103, 7490593.2485367665],
            [4216226.143221619, 7490604.296076011],
            [4216237.198210317, 7490622.211004515],
          ],
        ],
        [
          [
            [4216209.785373735, 7490637.249784319],
            [4216223.9968791045, 7490638.793472241],
            [4216219.362692571, 7490626.752706449],
            [4216208.858536428, 7490630.148819877],
            [4216209.785373735, 7490637.249784319],
          ],
        ],
        [
          [
            [4216241.411563196, 7490645.213974915],
            [4216256.79891233, 7490645.96043027],
            [4216252.167768416, 7490635.65934638],
            [4216240.365821023, 7490637.450839231],
            [4216241.411563196, 7490645.213974915],
          ],
        ],
      ],
    };

    if (storedFeatures && storedFeatures.length > 0) {
      сonvertFromDb(geojsonMock as unknown as GeoJsonGeometry);
      storedFeatures.forEach((feature) => {
        const f = format.readFeature(feature) as Feature<Geometry>;
        f.setId(feature.id);
        vectorSource.addFeature(f);
      });
    }

    const drawEndHandler = (event: DrawEvent) => {
      const justDrawnFeature = difference(
        event,
        drawVector,
      ) as Feature<Geometry>;
      if (!justDrawnFeature) return;
      justDrawnFeature.setId(crypto.randomUUID());
      vectorSource.addFeature(justDrawnFeature);

      const geojson = JSON.parse(
        format.writeFeature(justDrawnFeature),
      ) as GeoJSONFeature;

      addFeatureToStore(geojson);

      const toDb = сonvertToDb();
      console.log(toDb);
    };

    drawInteraction.on("drawend", drawEndHandler);

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        drawInteraction.removeLastPoint();
      }
    };

    document.addEventListener("keydown", handler);

    drawVectorRef.current = drawVector;
    snapRef.current = snap;
    drawRef.current = drawInteraction;
    vectorSourceRef.current = vectorSource;

    map.addInteraction(drawInteraction);
    map.addInteraction(snap);
    map.addLayer(drawVector);

    return () => {
      map.removeInteraction(drawInteraction);
      map.removeInteraction(snap);
      map.removeLayer(drawVector);
      drawVectorRef.current = null;
      snapRef.current = null;
      drawRef.current = null;
      vectorSourceRef.current = null;
      drawInteraction.un("drawend", drawEndHandler);
      document.removeEventListener("keydown", handler);
    };
  }, [isReady, map, difference, storedFeatures, addFeatureToStore]);

  return null;
}
