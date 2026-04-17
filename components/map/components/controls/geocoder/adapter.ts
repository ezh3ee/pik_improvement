import {
  GeocoderResponseDto,
  YandexGeocodeApiResponse,
} from "@/components/map/components/controls/geocoder/types";

export function adaptYandexGeocodeApiResponse(
  yandexGeocodeApiResponse: YandexGeocodeApiResponse,
): GeocoderResponseDto {
  const members =
    yandexGeocodeApiResponse.response.GeoObjectCollection.featureMember;

  const request =
    yandexGeocodeApiResponse.response.GeoObjectCollection.metaDataProperty
      .GeocoderResponseMetaData.request;

  const found = parseInt(
    yandexGeocodeApiResponse.response.GeoObjectCollection.metaDataProperty
      .GeocoderResponseMetaData.found,
  );

  if (!members)
    return {
      request,
      found,
      results: [],
    };

  const results = members.map((member) => {
    const latLonSplitted = member.GeoObject.Point.pos.split(" ");

    return {
      address: member.GeoObject.metaDataProperty.GeocoderMetaData.text,
      lat: parseFloat(latLonSplitted[1]),
      lon: parseFloat(latLonSplitted[0]),
    };
  });

  return {
    request,
    found,
    results,
  };
}
