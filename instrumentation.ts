import { z } from "zod";

interface IYandexCloudConfig {
  region: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
}

const yandexCloudEnvSchema = z
  .object({
    YC_ENDPOINT: z.string(),
    YC_REGION: z.string(),
    YC_KEY_ID: z.string(),
    YC_SECRET_KEY: z.string(),
    YC_BUCKET_NAME: z.string(),
  })
  .transform((env) => ({
    endpoint: env.YC_ENDPOINT,
    region: env.YC_REGION,
    accessKeyId: env.YC_KEY_ID,
    secretAccessKey: env.YC_SECRET_KEY,
    bucketName: env.YC_BUCKET_NAME,
  }));

export const yandexCloudConfig: IYandexCloudConfig = yandexCloudEnvSchema.parse(
  process.env,
);
