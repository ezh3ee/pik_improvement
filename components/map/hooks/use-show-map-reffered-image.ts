import useAffine from "@/components/map/hooks/use-affine";
import { useMap } from "@/components/map/hooks/use-map";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
import { useRefPointsStore } from "@/components/map/state/refpoints-store";
import GeoImage from "ol-ext/source/GeoImage";
import ImageLayer from "ol/layer/Image";
import Layer from "ol/layer/Layer";
import ImageSource from "ol/source/Image";
import ImageCanvas from "ol/source/ImageCanvas";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import { ZIndexes } from "../components/config/z-indexes";

export default function useShowMapRefferedImage() {
  const affine = useAffine();
  const { map, isReady } = useMap();
  const imageDimensions = useGeoreferenceStore(
    (state) => state.imageDimensions,
  );
  const opacity = useGeoreferenceStore((state) => state.geoRefImgOpacity);
  const imagePath = useGeoreferenceStore((state) => state.imagePath);
  const imagePoints = useRefPointsStore(
    useShallow((state) => state.refPoints.map((p) => p.converted)),
  );

  const mapPoints = useRefPointsStore(
    useShallow((state) => state.mainMapRefPoints.map((p) => p.original)),
  );

  const layerRef = useRef<Layer<ImageSource> | null>(null);

  useEffect(() => {
    if (!map || !isReady || !imagePath) return;
    if (layerRef.current) return;

    const canvasSource = new ImageCanvas({
      canvasFunction: (extent, resolution, pixelRatio, size) => {
        const canvas = document.createElement("canvas");
        canvas.width = size[0];
        canvas.height = size[1];
        return canvas;
      },
    });
    const imageLayer = new ImageLayer({
      source: canvasSource,
      zIndex: ZIndexes.Map,
    });
    map.addLayer(imageLayer);

    layerRef.current = imageLayer;

    const { rotation, scale } = affine.calculate(imagePoints, mapPoints);

    const imgW = imageDimensions.width;
    const imgH = imageDimensions.height;
    const imageCenterPixel = [imgW / 2, imgH / 2];
    const mapCenter = affine.transform(imageCenterPixel);
    const imageScaleForGeoImage = [scale, scale];
    const geoImageSource = new GeoImage({
      url: imagePath,
      imageCenter: mapCenter,
      imageScale: imageScaleForGeoImage,
      imageRotate: -rotation,
    });

    imageLayer.setSource(geoImageSource);
    imageLayer.setOpacity(opacity);

    return () => {
      if (layerRef.current && map) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [
    affine,
    map,
    isReady,
    imagePath,
    imageDimensions,
    imagePoints,
    mapPoints,
    opacity,
  ]);
}
