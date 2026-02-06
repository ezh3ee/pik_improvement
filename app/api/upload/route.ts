import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // const filepath = path.join(process.cwd(), "public/uploads/");
    const filepath = path.join("public/uploads/");
    const filename = Date.now() + file.name;

    console.log("filepath ", filepath);
    console.log("filename ", filename);

    await writeFile(path.join(filepath + filename), buffer);

    console.log(`Saved file to /public/uploads/${filename}`);

    return Response.json({
      url: `/uploads/${filename}`,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
