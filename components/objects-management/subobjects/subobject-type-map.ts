export enum SubobjectEnum {
  MKD = "MKD",
  ODH = "ODH",
  GARAGE = "GARAGE",
}

export const SUBOBJECT_TYPE_MAPPER: Record<string, string> = {
  MKD: "Многоквартирный дом",
  ODH: "Объект дорожного хозяйства",
  GARAGE: "Гараж",
};

export function mapSubobjectType(type: SubobjectEnum) {
  return SUBOBJECT_TYPE_MAPPER[type];
}
