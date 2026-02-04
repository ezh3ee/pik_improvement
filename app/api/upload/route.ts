"use server";

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
    const filepath = path.join(process.cwd(), "public/uploads/");
    const filename = Date.now() + file.name;

    await writeFile(path.join(filepath + filename), buffer);

    console.log(`Saved file to /public/uploads/${filename}`);

    // return `${filepath + filename}`;
    return Response.json({
      url: `${filepath + filename}`,
    });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 400 });
  }
}
