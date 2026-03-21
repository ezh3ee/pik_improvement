import { Geometry as GeoJsonGeometry } from "geojson";
import { z } from "zod";

export enum SubobjectEnum {
  MKD = "MKD",
  ODH = "ODH",
  GARAGE = "GARAGE",
}

export const subobjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Название объекта должно быть не менее 3-х символов"),
  type: z
    .enum(SubobjectEnum, { error: "Ожидаемые значения: МКД, ОДХ или Гараж" })
    .nonoptional("Тип объекта не может быть пустым"),
  geometry: z.custom<GeoJsonGeometry>((val) => !!val, "Геометрия обязательна"),
  complexId: z.string(),
});
