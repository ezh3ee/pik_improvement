import { SubObjectType } from "@/lib/generated/prisma/enums";
import { Geometry as GeoJsonGeometry } from "geojson";
import { z } from "zod";

// MKDTerritory schema
const mkdTerritorySchema = z.object({
  totalArea: z.number({ error: "Общая площадь должна быть числом" }).optional(),
  manualCleaningArea: z
    .number({ error: "Площадь ручной уборки должна быть числом" })
    .optional(),
  greeningArea: z
    .number({ error: "Площадь озеленения должна быть числом" })
    .optional(),
  mechanizedCleaningArea: z
    .number({ error: "Площадь механизированной уборки должна быть числом" })
    .optional(),
  cleaningStaffCountSummer: z
    .number({ error: "Кол-во сотрудников (лето) должно быть числом" })
    .int()
    .optional(),
  equipmentCountSummer: z
    .number({ error: "Кол-во техники (лето) должно быть числом" })
    .int()
    .optional(),
  cleaningStaffCountWinter: z
    .number({ error: "Кол-во сотрудников (зима) должно быть числом" })
    .int()
    .optional(),
  equipmentCountWinter: z
    .number({ error: "Кол-во техники (зима) должно быть числом" })
    .int()
    .optional(),
});

// Parking schema
const parkingSchema = z.object({
  parkingSpacesCount: z
    .number({ error: "Кол-во машиномест должно быть числом" })
    .int()
    .optional(),
  floorsCount: z
    .number({ error: "Кол-во этажей должно быть числом" })
    .int()
    .optional(),
  elevatorHallStaircaseArea: z
    .number({
      error: "Площадь лифтового холла + лестничной клетки должна быть числом",
    })
    .optional(),
  parkingSpacesCleaningArea: z
    .number({ error: "Уборочная площадь машиномест должна быть числом" })
    .optional(),
  drivewaysRampArea: z
    .number({ error: "Уборочная площадь проездов + рамп должна быть числом" })
    .optional(),
  technicalRoomsArea: z
    .number({ error: "Площадь тех. помещений должна быть числом" })
    .optional(),
  cleaningStaffCountSummer: z
    .number({ error: "Кол-во сотрудников (лето) должно быть числом" })
    .int()
    .optional(),
  cleaningStaffCountWinter: z
    .number({ error: "Кол-во сотрудников (зима) должно быть числом" })
    .int()
    .optional(),
  cleaningFrequencySummer: z
    .string({ error: "Периодичность уборки (лето) должна быть строкой" })
    .optional(),
  cleaningFrequencyWinter: z
    .string({ error: "Периодичность уборки (зима) должна быть строкой" })
    .optional(),
});

// MKD schema
const mkdSchema = z.object({
  type: z.literal("MKD"),
  buildingFootprintArea: z
    .number({ error: "Площадь застройки должна быть числом" })
    .optional(),
  sectionsCount: z
    .number({ error: "Кол-во секций должно быть числом" })
    .int()
    .optional(),
  floorsCount: z
    .number({ error: "Кол-во этажей должно быть числом" })
    .int()
    .optional(),
  elevatorsCount: z
    .number({ error: "Кол-во лифтов должно быть числом" })
    .int()
    .optional(),
  garbageChamberCount: z
    .number({ error: "Кол-во мусорокамер должно быть числом" })
    .int()
    .optional(),
  commonAreaFloor1: z
    .number({ error: "МОП 1 этажа должна быть числом" })
    .optional(),
  commonAreaFloor2Plus: z
    .number({ error: "МОП выше 2 этажа должна быть числом" })
    .optional(),
  commonAreaStorage: z
    .number({ error: "МОП кладовых должна быть числом" })
    .optional(),
  technicalRoomsArea: z
    .number({ error: "Площадь тех. помещений должна быть числом" })
    .optional(),
  odsArea: z.number({ error: "Площадь ОДС должна быть числом" }).optional(),
  garbageChamberArea: z
    .number({ error: "Площадь мусорокамер должна быть числом" })
    .optional(),
  cleaningStaffCount: z
    .number({ error: "Кол-во сотрудников должно быть числом" })
    .int()
    .optional(),
  cleaningFrequency: z
    .string({ error: "Периодичность уборки должна быть строкой" })
    .optional(),
  parking: parkingSchema.optional(),
  territory: mkdTerritorySchema.optional(),
});

// GarageTerritory schema
const garageTerritorySchema = z.object({
  totalArea: z.number({ error: "Общая площадь должна быть числом" }).optional(),
  manualCleaningArea: z
    .number({ error: "Площадь ручной уборки должна быть числом" })
    .optional(),
  greeningArea: z
    .number({ error: "Площадь озеленения должна быть числом" })
    .optional(),
  mechanizedCleaningArea: z
    .number({ error: "Площадь механизированной уборки должна быть числом" })
    .optional(),
  cleaningStaffCountSummer: z
    .number({ error: "Кол-во сотрудников (лето) должно быть числом" })
    .int()
    .optional(),
  equipmentCountSummer: z
    .number({ error: "Кол-во техники (лето) должно быть числом" })
    .int()
    .optional(),
  cleaningStaffCountWinter: z
    .number({ error: "Кол-во сотрудников (зима) должно быть числом" })
    .int()
    .optional(),
  equipmentCountWinter: z
    .number({ error: "Кол-во техники (зима) должно быть числом" })
    .int()
    .optional(),
});

// Garage schema
const garageSchema = z.object({
  type: z.literal("GARAGE"),
  parkingSpacesCount: z
    .number({ error: "Кол-во машиномест должно быть числом" })
    .int()
    .optional(),
  floorsCount: z
    .number({ error: "Кол-во этажей должно быть числом" })
    .int()
    .optional(),
  elevatorHallStaircaseArea: z
    .number({
      error: "Площадь лифтового холла + лестничной клетки должна быть числом",
    })
    .optional(),
  parkingSpacesCleaningArea: z
    .number({ error: "Уборочная площадь машиномест должна быть числом" })
    .optional(),
  drivewaysRampArea: z
    .number({ error: "Уборочная площадь проездов + рамп должна быть числом" })
    .optional(),
  technicalRoomsArea: z
    .number({ error: "Площадь тех. помещений должна быть числом" })
    .optional(),
  elevatorsCount: z
    .number({ error: "Кол-во лифтов должно быть числом" })
    .int()
    .optional(),
  cleaningStaffCountSummer: z
    .number({ error: "Кол-во сотрудников (лето) должно быть числом" })
    .int()
    .optional(),
  cleaningStaffCountWinter: z
    .number({ error: "Кол-во сотрудников (зима) должно быть числом" })
    .int()
    .optional(),
  cleaningFrequencySummer: z
    .string({ error: "Периодичность уборки (лето) должна быть строкой" })
    .optional(),
  cleaningFrequencyWinter: z
    .string({ error: "Периодичность уборки (зима) должна быть строкой" })
    .optional(),
  territory: garageTerritorySchema.optional(),
});

// ODH schema
const odhSchema = z.object({
  type: z.literal("ODH"),
  totalArea: z.number({ error: "Общая площадь должна быть числом" }).optional(),
  manualCleaningArea: z
    .number({ error: "Площадь ручной уборки должна быть числом" })
    .optional(),
  greeningArea: z
    .number({ error: "Площадь озеленения должна быть числом" })
    .optional(),
  mechanizedCleaningArea: z
    .number({ error: "Площадь механизированной уборки должна быть числом" })
    .optional(),
  cleaningStaffCountSummer: z
    .number({ error: "Кол-во сотрудников (лето) должно быть числом" })
    .int()
    .optional(),
  equipmentCountSummer: z
    .number({ error: "Кол-во техники (лето) должно быть числом" })
    .int()
    .optional(),
  cleaningStaffCountWinter: z
    .number({ error: "Кол-во сотрудников (зима) должно быть числом" })
    .int()
    .optional(),
  equipmentCountWinter: z
    .number({ error: "Кол-во техники (зима) должно быть числом" })
    .int()
    .optional(),
});

export const subObjectDetailsSchema = z.discriminatedUnion("type", [
  mkdSchema,
  garageSchema,
  odhSchema,
]);

export const subobjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Название объекта должно быть не менее 3-х символов"),
  type: z
    .enum(SubObjectType, {
      error: "Ожидаемые значения: МКД, ОДХ или Гараж",
    })
    .nonoptional("Тип объекта не может быть пустым"),
  geometry: z.custom<GeoJsonGeometry>((val) => !!val, "Геометрия обязательна"),
  complexId: z.string(),
  buildAddress: z
    .string()
    .trim()
    .min(5, "Строительный адрес должен быть не менее 5-и символов"),
  postAddress: z
    .string()
    .trim()
    .min(5, "Почтовый адрес должен быть не менее 5-и символов"),
  payer: z
    .string()
    .trim()
    .min(5, "Наименование плательщика должно быть не менее 3-х символов"),
});

export const fullSubObjectSchema = subobjectSchema.and(subObjectDetailsSchema);
