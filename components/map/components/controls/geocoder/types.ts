export type GeocoderResponseDto = {
  request: string;
  found: number;
  // success: boolean;
  results: {
    // precision: "exact" | "near";
    address: string;
    // kind: string;
    // postalCode?: string;
    // country: string;
    // region: string;
    // locality?: string;
    // district?: string;
    // street?: string;
    // house?: string;
    lat: number;
    lon: number;
  }[];
};

export type YandexGeocodeApiResponse = {
  response: {
    GeoObjectCollection: {
      metaDataProperty: {
        GeocoderResponseMetaData: {
          request: string;
          results: string;
          found: string;
        };
      };
      featureMember: {
        GeoObject: {
          Point: {
            pos: string;
          };
          metaDataProperty: {
            GeocoderMetaData: {
              precision: "exact" | "near";
              text: string;
              Address: {
                postal_code?: string;
                Components: {
                  kind: string;
                  name: string;
                }[];
              };
            };
          };
        };
      }[];
    };
  };
};
