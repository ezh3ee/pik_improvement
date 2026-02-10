import { Fill, Stroke } from "ol/style.js";
import RegularShape from "ol/style/RegularShape";
import Style from "ol/style/Style";

export const redCrossStyle = new Style({
  image: new RegularShape({
    fill: new Fill({ color: "red" }),
    stroke: new Stroke({ color: "red", width: 2 }),
    points: 4,
    radius: 10,
    radius2: 0,
    angle: Math.PI / 4,
  }),
});

export const blackCrossStyle = new Style({
  image: new RegularShape({
    fill: new Fill({ color: "black" }),
    stroke: new Stroke({ color: "black", width: 1 }),
    points: 4,
    radius: 10,
    radius2: 0,
    angle: Math.PI / 4,
  }),
});
