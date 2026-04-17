import { z } from "zod";

interface IYandexCloudConfig {
  region: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  geocoderUrl: string;
}

const yandexEnvSchema = z
  .object({
    YC_ENDPOINT: z.string(),
    YC_REGION: z.string(),
    YC_KEY_ID: z.string(),
    YC_SECRET_KEY: z.string(),
    YC_BUCKET_NAME: z.string(),
    YANDEX_GEOCODER_KEY: z.string(),
  })
  .transform((env) => ({
    endpoint: env.YC_ENDPOINT,
    region: env.YC_REGION,
    accessKeyId: env.YC_KEY_ID,
    secretAccessKey: env.YC_SECRET_KEY,
    bucketName: env.YC_BUCKET_NAME,
    geocoderUrl: env.YANDEX_GEOCODER_KEY,
  }));

export const yandexCloudConfig: IYandexCloudConfig = yandexEnvSchema.parse(
  process.env,
);
