"use server";

import { adaptYandexGeocodeApiResponse } from "@/components/map/components/controls/geocoder/adapter";
import { GeocoderResponseDto } from "@/components/map/components/controls/geocoder/types";

const geoCoderApiKey = process.env.YANDEX_GEOCODER_KEY;

export default async function geocodeAddress(
  address: string,
): Promise<GeocoderResponseDto | undefined> {
  if (!address) {
    return {
      request: address,
      found: 0,
      results: [],
    };
  }

  try {
    const response = await fetch(
      `https://geocode-maps.yandex.ru/v1/?apikey=${geoCoderApiKey}&geocode=${address}&format=json`,
    );

    if (response.status !== 200) throw new Error(response.statusText);

    const result = await response.json();

    return adaptYandexGeocodeApiResponse(result);
  } catch (e) {
    console.error("Error fetching geocoder data ", e);
    throw new Error("Ошибка получения данных от Яндекс.Карт");
    // return { success: false, request: address, found: 0, results: [] };
  }
}
