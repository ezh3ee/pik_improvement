import { SubObjectType } from "@/lib/generated/prisma/enums";
import { Geometry as GeoJsonGeometry } from "geojson";
import { z } from "zod";

// MKDTerritory schema
const mkdTerritorySchema = z.object({
  totalArea: z.coerce
    .number<number>({ error: "Общая площадь должна быть числом" })
    .int()
    .optional(),
  manualCleaningArea: z.coerce
    .number<number>({ error: "Площадь ручной уборки должна быть числом" })
    .int()
    .optional(),
  greeningArea: z.coerce
    .number<number>({ error: "Площадь озеленения должна быть числом" })
    .optional(),
  mechanizedCleaningArea: z.coerce
    .number<number>({
      error: "Площадь механизированной уборки должна быть числом",
    })
    .optional(),
  cleaningStaffCountSummer: z.coerce
    .number<number>({ error: "Кол-во сотрудников (лето) должно быть числом" })
    .int()
    .optional(),
  equipmentCountSummer: z.coerce
    .number<number>({ error: "Кол-во техники (лето) должно быть числом" })
    .int()
    .optional(),
  cleaningStaffCountWinter: z.coerce
    .number<number>({ error: "Кол-во сотрудников (зима) должно быть числом" })
    .int()
    .optional(),
  equipmentCountWinter: z.coerce
    .number<number>({ error: "Кол-во техники (зима) должно быть числом" })
    .int()
    .optional(),
});

// Parking schema
const parkingSchema = z.object({
  parkingSpacesCount: z.coerce
    .number<number>({ error: "Кол-во машиномест должно быть числом" })
    .int()
    .optional(),
  floorsCount: z.coerce
    .number<number>({ error: "Кол-во этажей должно быть числом" })
    .int()
    .optional(),
  elevatorHallStaircaseArea: z.coerce
    .number<number>({
      error: "Площадь лифтового холла + лестничной клетки должна быть числом",
    })
    .optional(),
  parkingSpacesCleaningArea: z.coerce
    .number<number>({
      error: "Уборочная площадь машиномест должна быть числом",
    })
    .optional(),
  drivewaysRampArea: z.coerce
    .number<number>({
      error: "Уборочная площадь проездов + рамп должна быть числом",
    })
    .optional(),
  technicalRoomsArea: z.coerce
    .number<number>({ error: "Площадь тех. помещений должна быть числом" })
    .optional(),
  cleaningStaffCountSummer: z.coerce
    .number<number>({ error: "Кол-во сотрудников (лето) должно быть числом" })
    .int()
    .optional(),
  cleaningStaffCountWinter: z.coerce
    .number<number>({ error: "Кол-во сотрудников (зима) должно быть числом" })
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
export const mkdSchema = z.object({
  type: z.literal("MKD"),
  buildingFootprintArea: z.coerce
    .number<number>({ error: "Площадь застройки должна быть числом" })
    .int()
    .refine((val) => val !== 0, {
      message: "Значение площади застройки должно быть больше нуля",
    })
    .optional(),
  sectionsCount: z
    .number({ error: "Кол-во секций должно быть числом" })
    .int()
    .optional(),
  floorsCount: z.coerce
    .number<number>({ error: "Кол-во этажей должно быть числом" })
    .int()
    .optional(),
  elevatorsCount: z.coerce
    .number<number>({ error: "Кол-во лифтов должно быть числом" })
    .int()
    .optional(),
  garbageChamberCount: z.coerce
    .number<number>({ error: "Кол-во мусорокамер должно быть числом" })
    .int()
    .optional(),
  commonAreaFloor1: z.coerce
    .number<number>({ error: "МОП 1 этажа должна быть числом" })
    .optional(),
  commonAreaFloor2Plus: z.coerce
    .number<number>({ error: "МОП выше 2 этажа должна быть числом" })
    .optional(),
  commonAreaStorage: z.coerce
    .number<number>({ error: "МОП кладовых должна быть числом" })
    .optional(),
  technicalRoomsArea: z.coerce
    .number<number>({ error: "Площадь тех. помещений должна быть числом" })
    .optional(),
  odsArea: z.coerce
    .number<number>({ error: "Площадь ОДС должна быть числом" })
    .optional(),
  garbageChamberArea: z.coerce
    .number<number>({ error: "Площадь мусорокамер должна быть числом" })
    .optional(),
  cleaningStaffCount: z.coerce
    .number<number>({ error: "Кол-во сотрудников должно быть числом" })
    .int()
    .optional(),
  cleaningFrequency: z
    .string({ error: "Периодичность уборки должна быть строкой" })
    .optional(),
  mkdParking: parkingSchema.optional(),
  mkdTerritory: mkdTerritorySchema.optional(),
});

// GarageTerritory schema
const garageTerritorySchema = z.object({
  totalArea: z.coerce
    .number<number>({ error: "Общая площадь должна быть числом" })
    .int()
    .optional(),
  manualCleaningArea: z.coerce
    .number<number>({ error: "Площадь ручной уборки должна быть числом" })
    .optional(),
  greeningArea: z.coerce
    .number<number>({ error: "Площадь озеленения должна быть числом" })
    .optional(),
  mechanizedCleaningArea: z.coerce
    .number<number>({
      error: "Площадь механизированной уборки должна быть числом",
    })
    .optional(),
  cleaningStaffCountSummer: z.coerce
    .number<number>({ error: "Кол-во сотрудников (лето) должно быть числом" })
    .int()
    .optional(),
  equipmentCountSummer: z.coerce
    .number<number>({ error: "Кол-во техники (лето) должно быть числом" })
    .int()
    .optional(),
  cleaningStaffCountWinter: z.coerce
    .number<number>({ error: "Кол-во сотрудников (зима) должно быть числом" })
    .int()
    .optional(),
  equipmentCountWinter: z.coerce
    .number<number>({ error: "Кол-во техники (зима) должно быть числом" })
    .int()
    .optional(),
});

// Garage schema
export const garageSchema = z.object({
  type: z.literal("GARAGE"),
  parkingSpacesCount: z.coerce
    .number<number>({ error: "Кол-во машиномест должно быть числом" })
    .int()
    .optional(),
  floorsCount: z.coerce
    .number<number>({ error: "Кол-во этажей должно быть числом" })
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
  garageTerritory: garageTerritorySchema.optional(),
});

// ODH schema
export const odhSchema = z.object({
  type: z.literal("ODH"),
  totalArea: z.coerce
    .number<number>({ error: "Общая площадь должна быть числом" })
    .optional(),
  manualCleaningArea: z.coerce
    .number<number>({ error: "Площадь ручной уборки должна быть числом" })
    .optional(),
  greeningArea: z.coerce
    .number<number>({ error: "Площадь озеленения должна быть числом" })
    .optional(),
  mechanizedCleaningArea: z.coerce
    .number<number>({
      error: "Площадь механизированной уборки должна быть числом",
    })
    .optional(),
  cleaningStaffCountSummer: z.coerce
    .number<number>({ error: "Кол-во сотрудников (лето) должно быть числом" })
    .int()
    .optional(),
  equipmentCountSummer: z.coerce
    .number<number>({ error: "Кол-во техники (лето) должно быть числом" })
    .int()
    .optional(),
  cleaningStaffCountWinter: z.coerce
    .number<number>({ error: "Кол-во сотрудников (зима) должно быть числом" })
    .int()
    .optional(),
  equipmentCountWinter: z.coerce
    .number<number>({ error: "Кол-во техники (зима) должно быть числом" })
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
