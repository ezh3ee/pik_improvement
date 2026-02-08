import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { writeFile } from "fs/promises";
import path from "path";

const s3 = new S3Client({
  region: "ru-central1",
  endpoint: "https://storage.yandexcloud.net",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "YCAJE2kzp8SVAFYazxosEAd7m",
    secretAccessKey: "YCPvVRVnUhtKMg3uQOeTGt0cCawEzcQxS5lnsVEZ",
  },
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response("No file", { status: 400 });
  }

  // if (!process.env.NEXT_PUBLIC_VERCEL_ENV) {
  if (false) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      // const filepath = path.join(process.cwd(), "public/uploads/");
      const filepath = path.join("public/uploads/");
      const filename = Date.now() + file.name;

      console.log("filepath ", filepath);
      console.log("filename ", filename);

      await writeFile(path.join(process.cwd(), filepath + filename), buffer);

      console.log(`Saved file to /public/uploads/${filename}`);

      return Response.json({
        url: `/uploads/${filename}`,
      });
    } catch (error) {
      console.error("error in upload route handler: ", error);
      if (error instanceof Error) {
        return new Response(error.message);
      }
    }
  } else {
    try {
      console.log("uploading to YANDEX");

      const client = new Upload({
        client: s3,
        params: {
          Bucket: "pik-images",
          Key: `${Date.now()}${file.name}`,
          Body: Buffer.from(await file.arrayBuffer()),
        },
      });

      const response = await client.done();
      const url = response.Location;

      if (!url) throw new Error("Failed to upload file to YANDEX");

      console.log("YANDEX File URL:", url);

      return Response.json({ url: url });
    } catch (error) {
      console.log("error in upload route handler: ", error);
      if (error instanceof Error) {
        return new Response(error.message);
      }
    }
  }
}
