import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const x = searchParams.get("x");
  const y = searchParams.get("y");
  const z = searchParams.get("z");

  if (!x || !y || !z) {
    return new Response("Missing tile params", { status: 400 });
  }

  const url = `https://tiles.api-maps.yandex.ru/v1/tiles/?x=${x}&y=${y}&z=${z}&lang=ru_RU&l=map&apikey=${process.env.NEXT_PUBLIC_YANDEX_TILES_KEY}`;

  const upstream = await fetch(url, {
    cache: "no-store",
  });

  if (!upstream.ok) {
    if (upstream.status === 429) {
      return new Response(null, { status: 204, headers: upstream.headers });
    }

    return new Response(null, {
      status: upstream.status,
      headers: upstream.headers,
    });
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: upstream.headers,
    // headers: {
    //   "Content-Type": upstream.headers.get("content-type") ?? "image/png",
    //   "Access-Control-Allow-Origin": "*",
    //   "Cache-Control": "no-store",
    // },
  });
}
