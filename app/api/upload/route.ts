import { yandexCloudConfig } from "@/instrumentation";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { writeFile } from "fs/promises";
import path from "path";

console.log("init upload route");

const s3 = new S3Client({
  region: yandexCloudConfig.region,
  endpoint: yandexCloudConfig.endpoint,
  forcePathStyle: true,
  credentials: {
    accessKeyId: yandexCloudConfig.accessKeyId,
    secretAccessKey: yandexCloudConfig.secretAccessKey,
  },
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response("No file", { status: 400 });
  }

  if (!process.env.NEXT_PUBLIC_VERCEL_ENV) {
    // if (false) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filepath = path.join("public/uploads/");
      const filename = Date.now() + file.name;

      await writeFile(path.join(process.cwd(), filepath + filename), buffer);

      return Response.json({
        url: `/uploads/${filename}`,
      });
    } catch (error) {
      if (error instanceof Error) {
        return new Response(error.message);
      }
    }
  } else {
    try {
      const client = new Upload({
        client: s3,
        params: {
          Bucket: yandexCloudConfig.bucketName,
          Key: `${Date.now()}${file.name}`,
          Body: Buffer.from(await file.arrayBuffer()),
        },
      });

      const response = await client.done();
      const url = response.Location;

      if (!url) throw new Error("Failed to upload file to YANDEX");

      return Response.json({ url: url });
    } catch (error) {
      console.log("error in upload route handler: ", error);
      if (error instanceof Error) {
        return new Response(error.message);
      }
    }
  }
}
