/**
 * Этот класс - обертка на ol-ext/interaction/DrawHole, которая
 * исправляет ошибку в функции для получения геометрии выбранного объекта.
 * Написано изначсально на JS. Эта версия типизированна на TS при помощи AI.
 *
 * Проблема: оригинальный DrawHole добавляет дырку как LinearRing
 * что оставляет саму границу полигона.
 * вместо добавления LinearRing используется turf.difference
 * для корректного вычитания геометрии с масштабированием дырки на 5%.
 * При неудаче — fallback на стандартное поведение ol-ext.
 * Теперь при вырезании из полигона его вершины пересчитываются, и граница "дырки" убирается.
 *
 */

import * as turf from "@turf/turf";
import type { Feature, Map as OlMap } from "ol";
import type { Coordinate } from "ol/coordinate";
import type { Geometry } from "ol/geom";
import { MultiPolygon, Polygon } from "ol/geom";
import { Draw } from "ol/interaction";
import type { DrawEvent } from "ol/interaction/Draw";
import type VectorLayer from "ol/layer/Vector";
import { transform } from "ol/proj";
import type VectorSource from "ol/source/Vector";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import type { StyleFunction, StyleLike } from "ol/style/Style";
import Style from "ol/style/Style";

interface TurfPolygonGeometry {
  type: "Polygon";
  coordinates: number[][][];
}

interface TurfMultiPolygonGeometry {
  type: "MultiPolygon";
  coordinates: number[][][][];
}

interface TurfFeaturePolygon {
  type: "Feature";
  geometry: TurfPolygonGeometry;
  properties: Record<string, unknown> | null;
}

interface TurfFeatureMultiPolygon {
  type: "Feature";
  geometry: TurfMultiPolygonGeometry;
  properties: Record<string, unknown> | null;
}

type TurfPolygonalFeature = TurfFeaturePolygon | TurfFeatureMultiPolygon;

interface DrawHoleTurfOptions {
  style?: StyleLike;
  layers?: VectorLayer<VectorSource<Feature<Geometry>>>[] | null;
  projection?: string;
  highlightStyle?: Style;
}

type RecursiveCoordinate = number | RecursiveCoordinate[];

// кастомный ивент вырезаний дырки, чтобы получить айди измененной фичи
export interface HoleCutResult {
  targetFeature: Feature<Geometry>;
  targetLayer: VectorLayer<VectorSource<Feature<Geometry>>> | null;
}

class DrawHoleTurf extends Draw {
  private layers_: VectorLayer<VectorSource<Feature<Geometry>>>[] | null;
  private mapProjection: string;
  private turfProjection: string;
  private highlightStyle_: Style;
  private _targetFeature: Feature<Geometry> | null;
  private _targetLayer: VectorLayer<VectorSource<Feature<Geometry>>> | null;
  private _originalStyle: StyleLike | null;
  private _originalId: string | number | undefined;
  // private _onHoleCut: ((result: HoleCutResult) => void) | null = null;
  private _onHoleCut: ((result: Feature<Geometry>) => void) | null = null;

  constructor(options: DrawHoleTurfOptions = {}) {
    super({
      type: "Polygon",
      style: options.style,
      freehand: false,
    });

    this.layers_ = options.layers || null;

    this.mapProjection = options.projection || "EPSG:3857";
    this.turfProjection = "EPSG:4326";

    this.highlightStyle_ =
      options.highlightStyle ||
      new Style({
        stroke: new Stroke({ color: "rgb(184, 8, 8)", width: 3 }),
        fill: new Fill({ color: "rgba(184, 8, 8, 0.4)" }),
      });

    this._targetFeature = null;
    this._targetLayer = null;
    this._originalStyle = null;
    this._originalId = undefined;

    this.on(
      "drawstart",
      this._handleDrawStart.bind(this) as (e: DrawEvent) => void,
    );
    this.on(
      "drawend",
      this._handleDrawEnd.bind(this) as (e: DrawEvent) => void,
    );
  }

  onHoleCut(callback: (result: Feature<Geometry>) => void): void {
    this._onHoleCut = callback;
  }

  private _highlightTarget(): void {
    if (!this._targetFeature) return;
    this._originalStyle = this._getOriginalStyle();
    this._targetFeature.setStyle(this.highlightStyle_);
  }

  private _getOriginalStyle(): StyleLike | null {
    if (!this._targetFeature) return null;

    const featureStyle = this._targetFeature.getStyle();
    if (featureStyle) {
      return featureStyle as StyleLike;
    }

    if (this._targetLayer) {
      const layerStyleFunc = this._targetLayer.getStyleFunction();
      if (layerStyleFunc) {
        const map = this.getMap() as OlMap | null;
        const resolution = map?.getView()?.getResolution() || 1;
        return (layerStyleFunc as StyleFunction)(
          this._targetFeature,
          resolution,
        ) as StyleLike;
      }

      const layerStyle = this._targetLayer.getStyle();
      if (layerStyle) {
        if (typeof layerStyle === "function") {
          const map = this.getMap() as OlMap | null;
          const resolution = map?.getView()?.getResolution() || 1;
          return (layerStyle as StyleFunction)(
            this._targetFeature,
            resolution,
          ) as StyleLike;
        }
        return layerStyle as unknown as StyleLike;
      }
    }

    return null;
  }

  public _restoreTargetStyle(): void {
    if (!this._targetFeature) return;

    if (this._originalStyle) {
      this._targetFeature.setStyle(this._originalStyle);
    } else {
      this._targetFeature.setStyle(undefined);
    }

    this._originalStyle = null;
  }

  private _restoreOriginalId(): void {
    console.log("originalId restoting.. ", this._originalId);
    if (!this._originalId) return;
    this._targetFeature?.setId(this._originalId);

    console.log("originalId restored.. ", this._targetFeature);
    // this._originalId = undefined;
  }

  /**
   * into WGS84 (for Turf)
   */
  private _toWGS84(coords: RecursiveCoordinate[]): RecursiveCoordinate[] {
    if (typeof coords[0] === "number") {
      return transform(
        coords as number[],
        this.mapProjection,
        this.turfProjection,
      );
    }
    return (coords as RecursiveCoordinate[][]).map((c) =>
      this._toWGS84(c as RecursiveCoordinate[]),
    );
  }

  /**
   * from WGS84 back to map projection
   */
  private _fromWGS84(coords: RecursiveCoordinate[]): RecursiveCoordinate[] {
    if (typeof coords[0] === "number") {
      return transform(
        coords as number[],
        this.turfProjection,
        this.mapProjection,
      );
    }
    return (coords as RecursiveCoordinate[][]).map((c) =>
      this._fromWGS84(c as RecursiveCoordinate[]),
    );
  }

  /**
   * starting what cutting
   */
  private _handleDrawStart(e: DrawEvent): void {
    this._targetFeature = null;
    this._originalStyle = null;

    const map = this.getMap() as OlMap | null;
    if (!map) return;

    const coordinate = (
      e.feature.getGeometry() as Polygon
    ).getCoordinates()[0][0];
    const pixel = map.getPixelFromCoordinate(coordinate);

    map.forEachFeatureAtPixel(
      pixel,
      (feature, layer) => {
        if (this._targetFeature) return;

        if (this.layers_) {
          const layersArray = Array.isArray(this.layers_) ? this.layers_ : null;
          if (
            layersArray &&
            !layersArray.includes(
              layer as VectorLayer<VectorSource<Feature<Geometry>>>,
            )
          )
            return;
        }

        const geom = (feature as Feature<Geometry>).getGeometry();
        if (geom instanceof Polygon || geom instanceof MultiPolygon) {
          this._targetFeature = feature as Feature<Geometry>;
          this._targetLayer = layer as VectorLayer<
            VectorSource<Feature<Geometry>>
          > | null;

          this._originalId = this._targetFeature?.getId();
        }
      },
      { hitTolerance: 5 },
    );

    if (!this._targetFeature) {
      console.warn("Нет полигона для вырезания");
      this.abortDrawing();
    }

    this._highlightTarget();
    console.log("Target polygon highlighted: ", this._targetFeature);
  }

  private _handleDrawEnd(e: DrawEvent): void {
    this._restoreTargetStyle();
    this._restoreOriginalId();

    if (!this._targetFeature) return;

    const holeFeature = e.feature;
    const targetFeature = this._targetFeature;

    try {
      const holeCoordsSrc = (
        holeFeature.getGeometry() as Polygon
      ).getCoordinates();
      const targetGeom = targetFeature.getGeometry()!;
      const targetCoordsSrc = (
        targetGeom as Polygon | MultiPolygon
      ).getCoordinates();
      const targetType = targetGeom.getType();

      const holeCoords = this._toWGS84(
        holeCoordsSrc as unknown as RecursiveCoordinate[],
      );
      const targetCoords = this._toWGS84(
        targetCoordsSrc as unknown as RecursiveCoordinate[],
      );

      console.log("Hole coords (WGS84):", holeCoords);
      console.log("Target coords (WGS84):", targetCoords);

      const turfHole = turf.polygon(
        holeCoords as unknown as number[][][],
      ) as unknown as TurfFeaturePolygon;

      let turfTarget: TurfPolygonalFeature;
      if (targetType === "Polygon") {
        turfTarget = turf.polygon(
          targetCoords as unknown as number[][][],
        ) as unknown as TurfFeaturePolygon;
      } else if (targetType === "MultiPolygon") {
        turfTarget = turf.multiPolygon(
          targetCoords as unknown as number[][][][],
        ) as unknown as TurfFeatureMultiPolygon;
      } else {
        return;
      }

      const scaledHole = turf.transformScale(
        turfHole as Parameters<typeof turf.transformScale>[0],
        1.001,
      ) as unknown as TurfFeaturePolygon;

      const fc = turf.featureCollection([
        turfTarget as Parameters<typeof turf.featureCollection>[0][number],
        scaledHole as Parameters<typeof turf.featureCollection>[0][number],
      ]);

      const difference = turf.difference(
        fc as unknown as Parameters<typeof turf.difference>[0],
      ) as unknown as {
        geometry: {
          type: string;
          coordinates: RecursiveCoordinate[];
        } | null;
      } | null;

      if (difference && difference.geometry) {
        const newType = difference.geometry.type;
        const newCoords = this._fromWGS84(difference.geometry.coordinates);

        if (newType === "Polygon") {
          targetFeature.setGeometry(new Polygon(newCoords as Coordinate[][]));
        } else if (newType === "MultiPolygon") {
          targetFeature.setGeometry(
            new MultiPolygon(newCoords as Coordinate[][][]),
          );
        }

        console.log("✂️ success", targetFeature);

        // пробрасывем кастомный коллбэк
        this._onHoleCut?.(targetFeature);
        // this._onHoleCut?.({
        //   targetFeature,
        //   targetLayer: this._targetLayer,
        // });
      } else {
        console.log("⚠️ empty result");
      }
    } catch (err) {
      console.error("🔥 error cutting hole:", err);
    }

    this._targetFeature = null;
  }

  _handleDrawAbort(): void {
    this._restoreTargetStyle();
    this._restoreOriginalId();
    this._targetFeature = null;
  }
}

export default DrawHoleTurf;
