import { writeFile } from "fs/promises";
import path from "path";

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
      console.log("error in upload route handler: ", error);
      if (error instanceof Error) {
        return new Response(error.message);
      }
    }
  } else {
    try {
      console.log("uploading to VPS server");
      let res = await fetch("http://45.144.179.13:8000/upload", {
        method: "POST",
        body: formData,
        headers: {
          "X-API-Key": "key",
        },
      });

      console.log("res before json() : ", res);

      res = await res.json();

      console.log("res: ", res);

      if (!res.ok) throw new Error("Failed to upload file to VPS");

      return Response.json(res);
    } catch (error) {
      console.log("error in upload route handler: ", error);
      if (error instanceof Error) {
        return new Response(error.message);
      }
    }
  }
}
